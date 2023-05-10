package com.douzone.smartlogistics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.smartlogistics.annotation.DBLog;
import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.service.FileUploadService;
import com.douzone.smartlogistics.service.UserService;

import com.douzone.smartlogistics.vo.BusinessVo;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ProductVo;

import com.douzone.smartlogistics.vo.UserVo;


//@PreAuthorize("hasAuthority('admin')")
@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	
	private UserService userService;
	@Autowired
	private FileUploadService FileUploadService;
	
	
	@GetMapping("list")
	public ResponseEntity<JsonResult> readUser(
			@RequestParam(value = "uk", required = true, defaultValue = "") String Userkeywd,
			@RequestParam(value = "us", required = true, defaultValue = "") String UserSize) {
		
		 System.out.println(Userkeywd+":"+UserSize);

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(userService.findByKeyword(Userkeywd, UserSize)));
	}
	
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readUser(
			@RequestParam(value = "uc", required = true, defaultValue = "") String id) {
		System.out.println("id");
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userService.findByCode(id)));
	}
	
	
	@PostMapping("/update")
	public ResponseEntity<JsonResult> updateUser(
			@RequestParam(value = "uc", required = true, defaultValue = "") String userCode,@RequestBody UserVo vo,@DBLog DBLogVo logVO) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userService.updateByCode(userCode,vo,logVO)));
	}
	
	//argument에서 읽어서 합친 후 파라미터를 @AuthUser UserVo 하나만 할 지
	@PostMapping("")
	public ResponseEntity<JsonResult> add(
			UserVo userVo,
			@RequestPart(value="file", required=false) MultipartFile file,
			@DBLog DBLogVo authUser) {
		System.out.println("파일 넘어오나! " + file);
		System.out.println("userVo "+ userVo);
		System.out.println("authUser : "+authUser);
		userVo.setInsert_id(authUser.getId());
		userVo.setInsert_ip(authUser.getIp());
		userVo.setInsert_dt(authUser.getDt());
		userVo.setProfile(FileUploadService.restoreImage(file));

		userService.addUser(userVo);
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userVo));
	}
	
}