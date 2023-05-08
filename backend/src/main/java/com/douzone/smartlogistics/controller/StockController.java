package com.douzone.smartlogistics.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.StockService;
import com.douzone.smartlogistics.util.DateUtil;

@RestController
@RequestMapping("/api/inquiry")
public class StockController {
	
	@Autowired
	private StockService stockService;
	

	
	@GetMapping("list")
	public ResponseEntity<JsonResult> list() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(stockService.findAll()));
	}
	
	@PostMapping("search")
	public ResponseEntity<JsonResult> search(
			@RequestParam(value= "rdate", required = true, defaultValue="") String rdate,			
			@RequestParam(value= "code", required = true, defaultValue="") String code,
			@RequestParam(value= "user_name", required = true, defaultValue="") String user_name,
			@RequestParam(value= "business_name", required = true, defaultValue="") String business_name) {
		System.out.println("rdate : "+rdate);
		System.out.println("code : "+code);
		System.out.println("user_name : "+business_name);
		System.out.println("business_name : "+business_name);
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(stockService.findAll()));
	}

	@PostMapping("graph")
	public ResponseEntity<JsonResult> graph(
			@RequestParam(value="state", required = true, defaultValue="") String state) throws Exception {	
		
		System.out.println("state : "+ state+"/");

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(stockService.getGraphData(state)));
	}
	
//	@GetMapping("graph/day")
//	public ResponseEntity<JsonResult> dayGraph() {	
//		String date = dateUtil.getCurrentDay();
//
//		return ResponseEntity.status(HttpStatus.OK)
//				.body(JsonResult.success(true));
//	}
//	
//	@GetMapping("graph/month")
//	public ResponseEntity<JsonResult> monthGraph() {
//		String[] date = dateUtil.getCurrentDay().split("-");
//		
//		return ResponseEntity.status(HttpStatus.OK)
//				.body(JsonResult.success(true));
//	}
//	
//	@GetMapping("graph/year")
//	public ResponseEntity<JsonResult> yearGraph() {	
//		String[] date = dateUtil.getCurrentDay().split("-");
//		
//		return ResponseEntity.status(HttpStatus.OK)
//				.body(JsonResult.success(true));
//	}
}