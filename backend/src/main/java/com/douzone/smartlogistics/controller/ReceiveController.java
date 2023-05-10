package com.douzone.smartlogistics.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.ReceiveService;
import com.douzone.smartlogistics.util.DateUtil;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReceiveMasterVo;

@RestController
@RequestMapping("/api/receive")
public class ReceiveController {

	@Autowired
	private ReceiveService receiveService;

	// receive select masterList
	@GetMapping("/list")
	public ResponseEntity<JsonResult> readReceive(
			@RequestParam(value = "rc", required = true, defaultValue = "") String receiveCode,
			@RequestParam(value = "bn", required = true, defaultValue = "") String businessName,
			@RequestParam(value = "sdt", required = true, defaultValue = "") String startDate,
			@RequestParam(value = "edt", required = true, defaultValue = "") String endDate) {
		if (!startDate.equals("") && endDate.equals("")) {
			// startDate만 선택했을 시
			endDate = startDate;
		} 
		if (startDate.equals("")) {
			// 첫페이지(-7~오늘날짜~+7) => 2주치의 데이터 가져올 날짜
			startDate = DateUtil.minusDays(6);
			endDate = DateUtil.addDays(6);
		}
		System.out.println(startDate+"///"+endDate);
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(receiveService.findByKeyword(receiveCode, businessName, startDate, endDate)));
	}

	// receive select detailList
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readReceive(
			@RequestParam(value = "rc", required = true, defaultValue = "") String receiveCode) {
		System.out.println("detail" + receiveCode);
		for (ReceiveDetailVo vo : receiveService.findByMasterNo(receiveCode)) {
			System.out.println("detail: " + vo);
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(receiveService.findByMasterNo(receiveCode)));
	}

	// receive master,detail insert
	@PostMapping("/insert")
	@Transactional
	public ResponseEntity<JsonResult> insertReceive(@RequestBody ReceiveMasterVo receiveVo, @DBLog DBLogVo logVO) {
		// 입고 번호 생성(RV2305000001)
		String date = new DateUtil().getCode((receiveVo.getDate()));
		int no = receiveService.findSeqByDateAndState(date);
		String rcCode = "RV".concat(date).concat(String.format("%06d", (Object) (no)));

		receiveVo.setCode(rcCode);
		for (ReceiveDetailVo vo : receiveVo.getReceiveDetails()) {
			vo.setMasterCode(rcCode);
		}
		receiveService.insertDetail(receiveVo.getReceiveDetails(), logVO);
		receiveService.insertMaster(receiveVo, logVO);
		receiveService.insertSeq(no, "RV", date, logVO);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(receiveVo));
	}

	// receive detail insert
	@PostMapping("/insertdetail")
	public ResponseEntity<JsonResult> insertReceive(@RequestBody List<ReceiveDetailVo> receiveDetailVo,
			@DBLog DBLogVo logVO) {
		System.out.println(receiveDetailVo);
		receiveService.insertDetail(receiveDetailVo, logVO);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(receiveDetailVo));
	}

	// receive master update
	@PostMapping("/update")
	public ResponseEntity<JsonResult> updateReceive(@RequestBody ReceiveMasterVo receiveVo, @DBLog DBLogVo logVO) {
		receiveService.updateMasterByCode(receiveVo, logVO);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(receiveVo));
	}

	// receive detail count update
	@PostMapping("/updatedetail")
	public ResponseEntity<JsonResult> updateReceive(@RequestBody ReceiveDetailVo receiveVo, @DBLog DBLogVo logVO) {
//		System.out.println("***************"+receiveVo);
		receiveService.updateDetailByCode(receiveVo, logVO);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(receiveVo));
	}

	// receive master item delete
	@PostMapping("/deleteMaster")
	public ResponseEntity<JsonResult> readRelease(@RequestBody List<String> masterNo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(receiveService.deleteMasterItem(masterNo)));
	}

	// receive master item delete
	@GetMapping("/deleteDetail")
	public ResponseEntity<JsonResult> readRelease(
			@RequestParam(value = "no", required = true, defaultValue = "") List<Integer> no,
			@RequestParam(value = "masterCode", required = true, defaultValue = "") String masterCode,
			@RequestParam(value = "length", required = true, defaultValue = "") int length) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(receiveService.deleteDetailItem(no, masterCode, length)));
	}

}
