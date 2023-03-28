package com.douzone.business.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.business.dto.JsonResult;
import com.douzone.business.service.BusinessService;

@RestController
@RequestMapping("/api/business")
public class BusinessController {
	
	@Autowired
	private BusinessService businessService;
	
	@GetMapping("")
	public ResponseEntity<JsonResult> list() {
		System.out.println("api 도착");
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(businessService.getBusinessList()));
	}

}
