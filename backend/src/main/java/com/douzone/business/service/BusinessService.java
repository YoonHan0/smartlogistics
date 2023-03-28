package com.douzone.business.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.business.repository.BusinessRepository;
import com.douzone.business.vo.BusinessVo;

@Service
public class BusinessService {

	@Autowired
	private BusinessRepository businessRepository;
	
	public List<BusinessVo> getBusinessList() {
		return businessRepository.findAll();
	}
}
