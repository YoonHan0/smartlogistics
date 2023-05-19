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
import com.douzone.smartlogistics.service.ProductService;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ProductVo;

//@Auth(role="employee")
@PreAuthorize("hasAuthority('user')")
@RestController
@RequestMapping("/api/product")
public class ProductController {
	@Autowired
	private ProductService productService;

	// product selectList
	@GetMapping("/list")
	public ResponseEntity<JsonResult> readProduct(
			@RequestParam(value = "pk", required = true, defaultValue = "") String productkeywd,
			@RequestParam(value = "ps", required = true, defaultValue = "") String productSize) {
		// System.out.println(productId+":"+productName+":"+productSize);

		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(productService.findByKeyword(productkeywd, productSize)));
	}

	// product selectDetail
	@GetMapping("/detail")
	public ResponseEntity<JsonResult> readProduct(
			@RequestParam(value = "pc", required = true, defaultValue = "") String productCode) {
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(productService.findByCode(productCode)));
	}

	// product update
	@PostMapping("/update")
	public ResponseEntity<JsonResult> updateProduct(
			@RequestParam(value = "pc", required = true, defaultValue = "") String productCode,
			@RequestBody ProductVo vo, @DBLog DBLogVo logVO) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(JsonResult.success(productService.updateByCode(productCode, vo, logVO)));
	}

	// product insert
	@PostMapping("/data")
	public ResponseEntity<JsonResult> insertProduct(@RequestBody ProductVo vo, @DBLog DBLogVo logVO) {
		System.out.println(vo);
		Map<String, Object> map = Map.of("vo", vo, "state", "false");
		// productcode 중복체크
		System.out.println("///"+productService.findByCode(vo.getCode()) );
		if (productService.findByCode(vo.getCode()) == null) {
			productService.insert(vo, logVO);
			map = Map.of("vo", vo, "state", "true");
		}
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(map));
	}

	// product delete
	@PostMapping("/delete")
	public ResponseEntity<JsonResult> deleteBusiness(@RequestBody List<String> deleteItem) {
		boolean result = productService.deleteByCode(deleteItem);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(result ? deleteItem : null));
	}

}
