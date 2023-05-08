import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import { Box, Grid } from "@mui/material";
import ReleaseMaster from "./ReleaseMaster";
import ReleaseDetail from "./ReleaseDetail";
import update from "react-addons-update";

const Release = () => {
  // ReleaseMaster
  const [releaseMaster, setreleaseMaster] = useState([]);
  // releaseDetail
  const [releaseDetail, setreleaseDetail] = useState([{}]);
  // 체크박스를 다루기 위한 state
  const [checkedRow, setCheckedRow] = useState([{master: "", state:"f",detail: [{no:"",state:"f"}]}]);
  const [openDeleteModalInMaster, setOpenDeleteModalInMaster] = useState(false);  // 삭제할 것인지 확인하는 모달창
  const [openDeleteModalInDetail, setOpenDeleteModalInDetail] = useState(false);  // 삭제할 것인지 확인하는 모달창
  const rowColor = useRef();

  const toggleModal = (open, _setOpen) =>
    open ? _setOpen(false) : _setOpen(true);

  useEffect(() => {
    releaseMasterSearch(null);
    console.log(releaseDetail);
  }, []);

  /** checkedRow 수정을 확인하기 위한 useEffect - 별다른 기능 없음 */
  useEffect(() => {
    console.log("==== row ==== ");
    console.log(checkedRow);
  }, [checkedRow])

  // ============================ release Master검색 ============================ 
  const releaseMasterSearch = async (searchKw) => {
    //console.log(searchKw);
    var url = `/api/release/list`;
    if (searchKw) {
      url = `/api/release/list?ic=${searchKw.rcode}&bn=${searchKw.bname}&dt=${searchKw.rdate}`;
    }
    try {
      const response = await fetch(url, {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      setreleaseMaster(json.data);
      // 넘어온 데이터의 master code 값 담기
      setCheckedRow(json.data.map(item => ({master: item.code, state: 'f', detail: [{no: '', state: 'f'}]})));
    } catch (err) {
      console.log(err);
    }
  };

  // ============================ release Detail ============================
  const releaseDetailSearch = async (code) => {
    try {
      const response = await fetch(`/api/release/detail?ic=${code}`, {
        method: "get",
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      setreleaseDetail(json.data);
      rowColor.current = code;    // 선택된 행 background 색상 변경
      const data = addDetailArrayHandler(json.data);
      const filteredCheckedRow = data.map((row) => {    // detail [] 배열 중 no가 빈 값인 거 제외
        const filteredDetail = row.detail.filter((detail) => detail.no !== '');
        return { ...row, detail: filteredDetail };
      });
      
      setCheckedRow(filteredCheckedRow);

      
    } catch (err) {
      console.log(err);
    }
  };

  // ============================ Delete Handler ============================
  const deleteMasterHandler = async (masterNo) => {
    try {
      const response = await fetch(`/api/release/deleteMaster`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(masterNo)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      setOpenDeleteModalInMaster(false);  // 삭제 완료 후 모달창 제거
      setreleaseDetail([{}]) // detail 리스트도 clear
      releaseMasterSearch(null);  // master 리스트 update

    } catch (err) {
      console.log(err);
    }
  }

  // ============================ Delete Handler ============================
  const deleteDetailHandler = async (detail) => {   // detail: {no: [], masterCode: "", length: } / no: state가 "t"인 no값들, length: 화면에 보이는 detail의 length
    console.log("디테일 화긴", detail);
    try {
      const response = await fetch(`/api/release/deleteDetail?no=${detail.no}&masterCode=${detail.masterCode}&length=${detail.length}`, {
        method: "get",
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }

      setOpenDeleteModalInDetail(false);  // 모달창 제거
      if(detail.no.length === detail.length) {
        setreleaseDetail([{}]);
        releaseMasterSearch(null);
      } else {
        setCheckedRow(updatedCheckedRow(detail));
        setreleaseDetail(releaseDetail.filter(d => !detail.no.includes(d.no)));

      }
    } catch (err) {
      console.log(err);
    }
  }

  /** Master행 클릭 시 해당하는 detail List를 불러오면서(api) checkedRow state에 데이터를 담는 함수 */
  const addDetailArrayHandler = (data) => checkedRow.map((row) => {
    const { master } = row;   // row(하나의 객체)에 있는 master 프로퍼티 값을 사용한다
    const matchingData = data.filter((d) => d.masterCode === master);
    const existingDetail = row.detail || []; // 기존의 detail 값이 없으면 빈 배열로 초기화
    console.log("기존의 detail", existingDetail);
    const existingNoArray = existingDetail.map((d) => d.no); // 기존의 no 값 배열 추출
    const matchingNoArray = matchingData.map((d) => d.no); // 매칭된 no 값 배열 추출
    const newNoArray = matchingNoArray.filter((no) => !existingNoArray.includes(no)); // 기존에 없는 no 값만 추출
    const newDetail = existingDetail.concat(newNoArray.map((no) => ({ no, state: 'f' }))); // 새로운 no 값들과 기존의 detail 값 합치기
    
    return {
      ...row,
      detail: newDetail,
    };
  });

  // /** 삭제할 no(배열)을 파라미터로 받아서 checkedRow state에서 해당 no 값들을 제거 */
  // const updatedCheckedRow = (nno) => checkedRow.map((row) => ({
  //   ...row,
  //   detail: row.detail.filter((detail) => !nno.includes(detail.no))
  // }));

  const updatedCheckedRow = (deleteData) => checkedRow.map(row => {
    if (row.master === deleteData.masterCode) {
      const updatedDetail = row.detail.filter(detail => !deleteData.no.includes(detail.no));
      return {...row, detail: updatedDetail};
    }
    return row;
  });

  return (
    <Box>
      <Grid container spacing={2} style={{ marginLeft: "0px" }}>
        <SearchBar callback={releaseMasterSearch} />
        <ReleaseMaster
          masters={releaseMaster}
          releaseDetail={releaseDetailSearch}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
          rowColor={rowColor}
          toggleModal={toggleModal}
          deleteMasterHandler={deleteMasterHandler}
          openDeleteModalInMaster={openDeleteModalInMaster}
          setOpenDeleteModalInMaster={setOpenDeleteModalInMaster}
        />
        <ReleaseDetail 
          details={releaseDetail}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
          toggleModal={toggleModal}
          deleteDetailHandler={deleteDetailHandler}
          openDeleteModalInDetail={openDeleteModalInDetail}
          setOpenDeleteModalInDetail={setOpenDeleteModalInDetail}
        />
      </Grid>
    </Box>
  );
};

export default Release;
