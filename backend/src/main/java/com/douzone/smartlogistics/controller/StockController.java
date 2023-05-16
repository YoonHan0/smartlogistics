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
			@RequestParam(value= "sdate", required = true, defaultValue="") String sdate,
			@RequestParam(value= "edate", required = true, defaultValue="") String edate,			
			@RequestParam(value= "code", required = true, defaultValue="") String code,
			@RequestParam(value= "user_name", required = true, defaultValue="") String user_name,
			@RequestParam(value= "business_name", required = true, defaultValue="") String business_name) {
		
		Map map = Map.of("sdate",sdate,"edate",edate,"code",code,"user_name",user_name,"business_name",business_name);
		System.out.println("map : " + map);
		return ResponseEntity.status(HttpStatus.OK)
//				.body(JsonResult.success(true));
				.body(JsonResult.success(stockService.findByKeyword(map)));
	}

	@PostMapping("graph")
	public ResponseEntity<JsonResult> graph(
			@RequestParam(value="state", required = true, defaultValue="") String state,
			@RequestParam(value="startDate", required = true, defaultValue="") String startDate)throws Exception {
		System.out.println("state : "+ state);
		System.out.println("startDate : "+ startDate);
		
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(stockService.getGraphData(state,startDate)));
	}
}
