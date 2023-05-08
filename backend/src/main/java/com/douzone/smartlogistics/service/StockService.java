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

	public List<StockGraphVo> getGraphData(String state) throws Exception {
		String date = dateUtil.getCurrentDay();
		String[] subDate = date.split("-");
		String[] dateSplit = date.split("-");
		Map map = null;
		String startdate = "", enddate = "";
		try {
			if (state.equals("year")) {
				subDate = AddDate(date, -5, 0, 0).split("-");
			}
			startdate = subDate[0];
			enddate = dateSplit[0];

			if (state.equals("month")) {
				subDate = AddDate(date, 0, -11, 0).split("-");
				startdate = subDate[0] + "-" + subDate[1];
				enddate = dateSplit[0] + "-" + dateSplit[1];
			}

			if (state.equals("day")) {
				startdate = AddDate(date, 0, 0, -7);
				enddate = dateSplit[0] + "-" + dateSplit[1] + "-" + dateSplit[2];
			}
			System.out.println("startdate : " + startdate);
			System.out.println("enddate : " + enddate);

			map = Map.of("state", state, "startdate", startdate, "enddate", enddate);
		} catch (Exception ex) {
			throw new Exception("date error:" + ex);
		}
		return stockRepository.getData(map);

	}

	private static String AddDate(String strDate, int year, int month, int day) throws Exception {

		SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");

		Calendar cal = Calendar.getInstance();

		Date dt = dtFormat.parse(strDate);

		cal.setTime(dt);

		cal.add(Calendar.YEAR, year);
		cal.add(Calendar.MONTH, month);
		cal.add(Calendar.DATE, day);

		return dtFormat.format(cal.getTime());
	}
}