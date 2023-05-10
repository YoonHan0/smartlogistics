package com.douzone.smartlogistics.service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.smartlogistics.repository.StockRepository;
import com.douzone.smartlogistics.util.DateUtil;
import com.douzone.smartlogistics.vo.StockGraphVo;
import com.douzone.smartlogistics.vo.StockVo;

@Service
@Transactional
public class StockService {
	@Autowired
	private StockRepository stockRepository;

	DateUtil dateUtil = new DateUtil();

	public List<StockVo> findAll() {
		return stockRepository.findAll();
	}

	public List<StockGraphVo> getGraphData(String state, String startDate) {
		
		return stockRepository.getData(state,startDate);

	}
}