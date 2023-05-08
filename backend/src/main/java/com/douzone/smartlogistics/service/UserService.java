package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.smartlogistics.repository.UserRepository;
import com.douzone.smartlogistics.vo.BusinessVo;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ProductVo;
import com.douzone.smartlogistics.vo.UserVo;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	public List<UserVo> getUsers() {
		return userRepository.findAll();
	}
	public List<UserVo> findByKeyword(String Userkeywd, String UserSize) {
		return userRepository.findByKeyword(Userkeywd, UserSize);
	}
	
	
	public Boolean addUser(UserVo userVo) {
		return userRepository.addUser(userVo);
	}
	public Boolean getUser(UserVo userVo) {
		return userRepository.findUser(userVo);
	}
	public UserVo getUserLogin(UserVo vo) {
		return userRepository.getUserLogin(vo);
	}
	public UserVo getUserfindById(String id) {
		return userRepository.getUserfindById(id);
	}
	public List<UserVo> getUserListByKeyword(UserVo vo) {
		return userRepository.findAllByKeyword(vo);
	}
	public int updateByCode(String userCode, UserVo vo,DBLogVo logVo) {
		return  userRepository.updateByCode(userCode,vo,logVo);
	}
	public UserVo findByCode(String UserCode) {
		return userRepository.findByCode(UserCode);
	}
	public UserVo findByCodeforlocalStorage(String id) {
		return userRepository.findByCodeForLocalStorage(id);
	}

}
