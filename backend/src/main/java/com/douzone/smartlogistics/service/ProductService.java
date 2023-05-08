package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.smartlogistics.repository.ProductRepository;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ProductVo;
import com.douzone.smartlogistics.vo.UserVo;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	public List<ProductVo> findByKeyword(String productkeywd, String productSize) {
		return productRepository.findByKeyword(productkeywd, productSize);
	}

	public boolean insert(ProductVo vo,DBLogVo logVo) {
		return productRepository.insert(vo,logVo);
	}

	public ProductVo findByCode(String productCode) {
		return productRepository.findByCode(productCode);
	}

	public int updateByCode(String productCode, ProductVo vo,DBLogVo logVo) {
		return  productRepository.updateByCode(productCode,vo,logVo);
	}

	public boolean deleteByCode(List<String> deleteItem) {
		return productRepository.deleteByCode(deleteItem);
	}

	
}
