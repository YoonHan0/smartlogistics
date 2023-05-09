package com.douzone.smartlogistics.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.smartlogistics.vo.DBLogVo;
import com.douzone.smartlogistics.vo.ReceiveDetailVo;
import com.douzone.smartlogistics.vo.ReceiveMasterVo;

@Repository
public class ReceiveRepository {

	@Autowired
	private SqlSession sqlSession;

	public List<ReceiveMasterVo> findByKeyword(String receiveCode, String businessName, String receiveDate,
			String startDate, String endDate) {
		Map<String, Object> map = Map.of("rcode", receiveCode, "bname", businessName, "rdate", receiveDate, "startdt",
				startDate, "enddt", endDate);
		return sqlSession.selectList("receive.findByKeyword", map);
	}

	public List<ReceiveDetailVo> findByMasterNo(String receiveCode) {
		return sqlSession.selectList("receive.findByMasterNo", receiveCode);
	}

	public void insertMaster(ReceiveMasterVo receiveVo, DBLogVo logVO) {
		Map<String, Object> map = Map.of("vo", receiveVo, "log", logVO);
		sqlSession.insert("receive.insertMaster", map);
	}

	public void insertDetail(ReceiveDetailVo vo) {
		sqlSession.insert("receive.insertDetail", vo);
	}

	public void insertSeq(int no, String state, String date, DBLogVo logVO) {
		Map<String, Object> map = Map.of("no", no, "state", state, "date", date, "log", logVO);
		sqlSession.selectOne("receive.insertSeq", map);
	}

	public void insertStock(ReceiveDetailVo vo) {
		sqlSession.insert("receive.insertStock", vo);

	}

	public void updateMasterByCode(ReceiveMasterVo receiveVo, DBLogVo logVO) {
		Map<String, Object> map = Map.of("vo", receiveVo, "log", logVO);
		sqlSession.insert("receive.updateMasterByCode", map);
	}

	public void updateDetailByCode(ReceiveDetailVo receiveVo, DBLogVo logVO) {
		Map<String, Object> map = Map.of("vo", receiveVo, "log", logVO);
		sqlSession.insert("receive.updateDetailByCode", map);

	}

	public void updateStockByCode(ReceiveDetailVo receiveVo, DBLogVo logVO) {
		Map<String, Object> map = Map.of("vo", receiveVo, "log", logVO);
		sqlSession.insert("receive.updateStockByCode", map);

	}

	public int findSeqByDateAndState(String date) {
		return sqlSession.selectOne("receive.findSeqByDateAndState", date);
	}

	/* Master Item 삭제 */
	public boolean deleteMasterItem(List<String> masterNo) {
		return 1 == sqlSession.delete("receive.deleteMasterItem", masterNo);
	}

	/* Master Item이 삭제되면서 detail Item 삭제 */
	public boolean deleteDetailByMasterNo(List<String> masterNo) {
		return 1 == sqlSession.delete("receive.deleteDetailByMasterNo", masterNo);
	}

	/* Detail Item 삭제 */
	public boolean deleteDetailItem(List<Integer> detailNo) {
		return 1 == sqlSession.delete("receive.deleteDetailItem", detailNo);
	}

	public boolean deleteMasterByDetailNo(String masterCode) {
		return 1 == sqlSession.delete("receive.deleteMasterByDetailNo", masterCode);
	}

}
