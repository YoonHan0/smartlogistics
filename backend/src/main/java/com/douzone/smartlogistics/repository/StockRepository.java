package com.douzone.smartlogistics.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.douzone.smartlogistics.vo.StockGraphVo;
import com.douzone.smartlogistics.vo.StockVo;
@Repository
public class StockRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<StockVo> findAll() {
		return sqlSession.selectList("stock.findAll");
	}

	public List<StockGraphVo> getData(String state, String startDate) {
		Map map = Map.of("state",state,"date",startDate);
		System.out.println("map : "+map);
		return sqlSession.selectList("stock.getdata2", map);
	}
}