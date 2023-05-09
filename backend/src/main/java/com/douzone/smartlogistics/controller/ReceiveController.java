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
			@RequestParam(value = "dt", required = true, defaultValue = "") String receiveDate) {
		// 첫페이지(-7~오늘날짜~+7) => 2주치의 데이터 가져올 날짜
//		System.out.println(DateUtil.minusDays(6)); //startDate -7
//		System.out.println(DateUtil.addDays(6)); //endDate +7
		System.out.println(receiveDate);

		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(receiveService.findByKeyword(receiveCode,
				businessName, receiveDate, DateUtil.minusDays(7), DateUtil.addDays(7))));
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
//		System.out.println(receiveVo);
		// 2022-08-09
//		System.out.println(receiveVo.getDate().substring(2,7).replaceAll("-", ""));
//		System.out.println(receiveVo.getReceiveDetails());
		String date = new DateUtil().getCode((receiveVo.getDate()));
		int no = receiveService.findSeqByDateAndState(date);
		String rcCode = "RV".concat(date).concat(String.format("%06d", (Object) (no)));

		receiveVo.setCode(rcCode);
		for (ReceiveDetailVo vo : receiveVo.getReceiveDetails()) {
			vo.setMasterCode(rcCode);
		}
//		System.out.println(receiveVo);
//		System.out.println("insert");
		receiveService.insertDetail(receiveVo.getReceiveDetails(), logVO);
		receiveService.insertMaster(receiveVo, logVO);
		// System.out.println("***********"+receiveService.insertDetail(receiveVo.getReceiveDetails(),
		// logVO));
		receiveService.insertSeq(no, "RV", date, logVO);
//		System.out.println(receiveVo);
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

		for (int item : no) {
			System.out.println(item);
		}
		System.out.println("masterCode: " + masterCode);
		System.out.println("length: " + length);

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(receiveService.deleteDetailItem(no, masterCode, length)));
	}

}
