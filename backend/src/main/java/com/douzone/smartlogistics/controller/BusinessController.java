package com.douzone.smartlogistics.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.BusinessService;
import com.douzone.smartlogistics.vo.BusinessVo;
import com.douzone.smartlogistics.vo.DBLogVo;



@PreAuthorize("hasAuthority('user')")
@RestController
@RequestMapping("/api/business")
public class BusinessController {
	
	@Autowired
	private BusinessService businessService;
	
	@GetMapping("")
	public ResponseEntity<JsonResult> list() {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.getBusinessList()));
	}
	
	@PostMapping("/search")
	public ResponseEntity<JsonResult> searchBusinessList(
			@RequestParam(value = "offset", required = true, defaultValue = "0") Long offset,
			@RequestParam(value = "limit", required = true, defaultValue = "0") Long limit,
			@RequestBody BusinessVo businessVo) {
		Map<String, Object> map = Map.of("vo",businessVo,"offset",offset,"limit",limit);
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult
				.success(businessService.getBusinessListByKeyword(map)));
	}
	
	@PostMapping("/add")
	public ResponseEntity<JsonResult> add(@RequestBody BusinessVo businessVo, @DBLog DBLogVo logVo) {
		System.out.println("\n======================= Business INSERT =======================");
		// System.out.println(logVo);
//		businessVo.setInsertId("han0");
//		businessVo.setInsertIp("192.168.64.2");
//		businessVo.setUpdateId("han0");
//		businessVo.setUpdateIp("192.168.64.2");
		
		businessService.addBusinessItem(businessVo, logVo);
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessVo));
	}
	
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readBusiness(
			@RequestParam(value = "bc", required = true, defaultValue = "") String businessCode) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.findByCode(businessCode)));
	}

	@PostMapping("/update")
	public ResponseEntity<JsonResult> updateBusiness(
			@RequestParam(value = "bc", required = true, defaultValue = "") String businessCode,@RequestBody BusinessVo vo, @DBLog DBLogVo logVo) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.updateByCode(businessCode,vo, logVo)));
	}
	
	@PostMapping("/delete")
	public ResponseEntity<JsonResult> deleteBusiness(@RequestBody List<String> deleteItem) {
		
		for (String item : deleteItem) {
		  System.out.println(item);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.deleteItem(deleteItem)));
	}


}
