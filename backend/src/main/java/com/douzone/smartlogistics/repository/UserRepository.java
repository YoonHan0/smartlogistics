package com.douzone.smartlogistics.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.BusinessVo;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ProductVo;
import com.douzone.smartlogistics.vo.UserVo;

@Repository
public class UserRepository {
	@Autowired
	private SqlSession sqlSession;
	
	public List<UserVo> findByKeyword(String Userkeywd, String UserSize) {
		Map<String, Object> map = Map.of("ukeywd",Userkeywd,"usize",UserSize);
		return sqlSession.selectList("user.findByKeyword",map);
	}

	public List<UserVo> findAll() {
		return sqlSession.selectList("user.findAll");
	}
	public UserVo findByCode(String UserCode) {
		return sqlSession.selectOne("user.findByCode",UserCode);
	}
	
	public Boolean addUser(UserVo userVo) {
		return 1==sqlSession.insert("user.insert",userVo);
	}

	public Boolean findUser(UserVo userVo) {
		return sqlSession.selectOne("user.findUser",userVo)!=null?true:false;
	}

	public UserVo getUserLogin(UserVo vo) {
		return sqlSession.selectOne("user.getuserlogin",vo);
	}

	public UserVo getUserfindById(String id) {
		return sqlSession.selectOne("user.getUserfindById",id);
	}
	public int updateByCode(String userCode, UserVo vo,DBLogVo logVo) {
		Map<String, Object> map = Map.of("ucode",userCode,"vo",vo,"log",logVo);
		return sqlSession.update("user.updateByCode",map);
	}

	public List<UserVo> findAllByKeyword(UserVo vo) {
		return sqlSession.selectList("user.findAllByKeyword", vo);
	}

	public UserVo findByCodeForLocalStorage(String id) {
		return sqlSession.selectOne("user.findByCodeForLocalStorage", id);
	}
	
}