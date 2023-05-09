package com.douzone.smartlogistics.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.douzone.smartlogistics.repository.ReceiveRepository;
import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReceiveMasterVo;

@Service
@Transactional
public class ReceiveService {

	@Autowired
	private ReceiveRepository receiveRepository;

	public List<ReceiveMasterVo> findByKeyword(String receiveCode, String businessName, String receiveDate,
			String startDate, String endDate) {
		return receiveRepository.findByKeyword(receiveCode, businessName, receiveDate, startDate, endDate);
	}

	public List<ReceiveDetailVo> findByMasterNo(String receiveCode) {
		return receiveRepository.findByMasterNo(receiveCode);
	}

	public void insertMaster(ReceiveMasterVo receiveVo, DBLogVo logVO) {
		receiveRepository.insertMaster(receiveVo, logVO);

	}

	@Transactional
	public void insertDetail(List<ReceiveDetailVo> receiveDetailVo, DBLogVo logVO) {
		for (ReceiveDetailVo vo : receiveDetailVo) {
			vo.setLog(logVO);
			receiveRepository.insertDetail(vo);
			receiveRepository.insertStock(vo);
		}
	}

	public void updateMasterByCode(ReceiveMasterVo receiveVo, DBLogVo logVO) {
		receiveRepository.updateMasterByCode(receiveVo, logVO);
	}

	@Transactional
	public void updateDetailByCode(ReceiveDetailVo receiveVo, DBLogVo logVO) {
		receiveRepository.updateDetailByCode(receiveVo, logVO);
		receiveRepository.updateStockByCode(receiveVo, logVO);

	}

	public int findSeqByDateAndState(String date) {
		return receiveRepository.findSeqByDateAndState(date);
	}

	public void insertSeq(int no, String state, String date, DBLogVo logVO) {
		receiveRepository.insertSeq(no, state, date, logVO);
	}

	@Transactional
	public boolean deleteMasterItem(List<String> masterNo) {
		boolean isDeleteMasterSuccess = receiveRepository.deleteMasterItem(masterNo);
		boolean isDeleteDetailSuccess = receiveRepository.deleteDetailByMasterNo(masterNo);
		return isDeleteMasterSuccess && isDeleteDetailSuccess;
	}

	@Transactional
	public boolean deleteDetailItem(List<Integer> detailNo, String masterCode, int length) {
		System.out.println("선택된 detail no값: " + detailNo.size());
		System.out.println(detailNo.size() == length);
		boolean isDeleteDetailSuccess = receiveRepository.deleteDetailItem(detailNo);

		return (detailNo.size() == length)
				? (isDeleteDetailSuccess && receiveRepository.deleteMasterByDetailNo(masterCode))
				: receiveRepository.deleteDetailItem(detailNo);
	}
}
