package com.douzone.business.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.business.dto.JsonResult;
import com.douzone.business.service.BusinessService;
import com.douzone.business.vo.BusinessVo;




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
	public ResponseEntity<JsonResult> searchBusinessList(@RequestBody BusinessVo businessVo) {
		
		System.out.println(businessVo);
		System.out.println(businessService.getBusinessListByKeyword(businessVo));
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult
				.success(businessService.getBusinessListByKeyword(businessVo)));
	}
	
	@PostMapping("/add")
	public ResponseEntity<JsonResult> add(@RequestBody BusinessVo businessVo) {
		
		businessVo.setIp("192.168.64.2");
		businessVo.setUserNo(1L);
		
		System.out.println(businessVo);
		businessService.addBusinessItem(businessVo);
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessVo));
	}

}
