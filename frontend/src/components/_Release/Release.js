import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import { Box, Grid } from "@mui/material";
import ReleaseMaster from "./ReleaseMaster";
import ReleaseDetail from "./ReleaseDetail";
import ManagerModal from '../Modal/ManagerModal';
import ProductsModal from '../Modal/ProductsModal';
import BusinessModal from '../Modal/BusinessModal';
import DeleteMasterModal from "../Modal/DeleteMasterModal";
import DeleteDetailModal from "../Modal/DeleteDetailModal";
import NullModal from "../Modal/NullModal";

const Release = () => {
  /* 화면에 랜더링되는 state */
  const [releaseMaster, setreleaseMaster] = useState([]); // ReleaseMaster
  const [releaseDetail, setreleaseDetail] = useState([{}]); // releaseDetail

  /* Master Code */
  const [masterCode, setMasterCode] = useState();
  /* 체크박스를 다루기 위한 state */
  const [checkedRow, setCheckedRow] = useState([{master: "", state:"f",detail: [{no:"",state:"f"}]}]);

  /* Modal */
  const [openDeleteModalInMaster, setOpenDeleteModalInMaster] = useState(false);  // 삭제할 것인지 확인하는 모달창(Master)
  const [openDeleteModalInDetail, setOpenDeleteModalInDetail] = useState(false);  // 삭제할 것인지 확인하는 모달창(Detail)
  const [openNullModal, setOpenNullModal] = useState(false);  // 삭제할 것인지 확인하는 모달창(체크된 데이터가 없을 때 띄어주는 모달창)

  const [openManager, setOpenManager] = useState(false);
  const [openBusiness, setOpenBusiness] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);    // 나중에 철환이형 Modal 사용하면 됨

  // ReleaseMaster data(date,business,manager)
  const [inputMaster, setInputMaster] = useState({
    date: '',
    businessCode: '',
    businessName: '',
    userId: '',
    userName: '',
  });

  const rowColor = useRef();  // Master 행 클릭 시 background 색상 변경 Ref
  const masterStateT = checkedRow.filter(row => row.state === 't').map(row => row.master);

  // checkedRow에 detail 프로퍼티가 없어서 에러가 계속 발생 -> filter로 detail 프로퍼티가 존재하는지 먼저 거르고 시작
  const filteredRow = checkedRow.filter(row => row.detail !== undefined);
  const filteredDetails = filteredRow
    .filter(row => row.master === releaseDetail[0].masterCode,) // master 코드가 같은 것 / flatMap: 배열 내 요소들을 변환하고, 각 변환된 배열 요소를 하나의 배열로 합치는 함수
    .flatMap(row => row.detail.filter(detail => detail.state === 't' && detail.no !== ''))
    .map(detail => detail.no);

  const deleteObj = {
      no: filteredDetails,    // checkedRow의 detail 프로퍼티에서 state값이 "t"인 데이터의 no값
      masterCode: releaseDetail[0].masterCode,  // 화면에 표시되는 detail List들의 공통된 master code값
      length: releaseDetail.length  // 화면에 표시되는 detail List들의 길이
  }
  const toggleModal = (open, modal) => {
    if (modal === 'manager') {
      open ? setOpenManager(false) : setOpenManager(true);
    } else if (modal === 'product') {
      open ? setOpenProduct(false) : setOpenProduct(true);
    } else if (modal === 'business') {
      open ? setOpenBusiness(false) : setOpenBusiness(true);
    } else if(modal === 'deleteMaster') {
      open ? setOpenDeleteModalInMaster(false) : setOpenDeleteModalInMaster(true);
    } else if(modal === 'deleteDetail') {
      open ? setOpenDeleteModalInDetail(false) : setOpenDeleteModalInDetail(true);
    } else if(modal === 'null') {
      open ? setOpenNullModal(false) : setOpenNullModal(true);
    }
  }

  useEffect(() => {
    releaseMasterSearch(null);
    console.log(releaseDetail);
  }, []);

  /** checkedRow 수정을 확인하기 위한 useEffect - 별다른 기능 없음 */
  useEffect(() => {
    console.log("==== row ==== ");
    console.log(checkedRow);
  }, [checkedRow])

  const handleButtonClick = (key, data) => {
    if (key === 'product') {
      setOpenProduct(false);
    } else if (key === 'manager') {
      setInputMaster({
        ...inputMaster,
        userId: data.userId,
        userName: data.userName,
      });
      setOpenManager(false);
    } else if (key === 'business') {
      setInputMaster({
        ...inputMaster,
        businessCode: data.businessCode,
        businessName: data.businessName,
      });
      setOpenBusiness(false);
    }
  };

  // releaseMater nullchk
  const nullChkHandler = (inputMaster) => {
    // 아래의 값이 모두 있을경우
    if (
      inputMaster.date !== '' &&
      inputMaster.businessCode !== '' &&
      inputMaster.businessName !== '' &&
      inputMaster.userId !== '' &&
      inputMaster.userName !== ''
    ) {
      setInputMaster(inputMaster);
      // 새로운 product를 추가 하기 전에 reset
      setreleaseDetail([{}]);
      setMasterCode('');
      // productModal open
      // toggleModal(openProduct, 'product');
    }
  };

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
    //선택한 출고의 출고번호 저장
    setMasterCode(code);
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
      detail.no.length === detail.length ? (setreleaseDetail([{}]), releaseMasterSearch(null)) : (setCheckedRow(updatedCheckedRow(detail)), setreleaseDetail(releaseDetail.filter(d => !detail.no.includes(d.no))));
      
    } catch (err) {
      console.log(err);
    }
  }

  /** Master행 클릭 시 해당하는 detail List를 불러오면서(api) checkedRow state에 데이터를 담는 함수 */
  const addDetailArrayHandler = (data) => checkedRow.map((row) => {
    const { master } = row;   // row(하나의 객체)에 있는 master 프로퍼티 값을 사용한다
    const matchingData = data.filter((d) => d.masterCode === master);
    const existingDetail = row.detail || []; // 기존의 detail 값이 없으면 빈 배열로 초기화
    const existingNoArray = existingDetail.map((d) => d.no); // 기존의 no 값 배열 추출
    const matchingNoArray = matchingData.map((d) => d.no); // 매칭된 no 값 배열 추출
    const newNoArray = matchingNoArray.filter((no) => !existingNoArray.includes(no)); // 기존에 없는 no 값만 추출
    const newDetail = existingDetail.concat(newNoArray.map((no) => ({ no, state: 'f' }))); // 새로운 no 값들과 기존의 detail 값 합치기
    
    return {
      ...row,
      detail: newDetail,
    };
  });

  const updatedCheckedRow = (deleteData) => checkedRow.map(row => {
    if (row.master === deleteData.masterCode) {
      const updatedDetail = row.detail.filter(detail => !deleteData.no.includes(detail.no));
      return {...row, detail: updatedDetail};
    }
    return row;
  });

  return (
    <Box>
      <ManagerModal open={openManager} onClose={() => setOpenManager(false)} handleButtonClick={handleButtonClick} />
      <BusinessModal open={openBusiness} onClose={() => setOpenBusiness(false)} handleButtonClick={handleButtonClick} />
      <DeleteMasterModal open={openDeleteModalInMaster} onClose={() => setOpenDeleteModalInMaster(false)} deleteMasterHandler={deleteMasterHandler} data={masterStateT}/>
      <DeleteDetailModal open={openDeleteModalInDetail} onClose={() => setOpenDeleteModalInDetail(false)} deleteDetailHandler={deleteDetailHandler} data={deleteObj} />
      <NullModal open={openNullModal} onClose={() => setOpenNullModal(false)} />

      <Grid container spacing={2} style={{ marginLeft: "0px" }}>
        <SearchBar callback={releaseMasterSearch} />
        <ReleaseMaster
          masters={releaseMaster}
          releaseDetail={releaseDetailSearch}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
          rowColor={rowColor}
          toggleModal={toggleModal}
          openNullModal={openNullModal}
          openDeleteModalInMaster={openDeleteModalInMaster}
          openManager={openManager}
          openBusiness={openBusiness}
          nullChkHandler={nullChkHandler}
          inputMaster={inputMaster}
          setInputMaster={setInputMaster}
          masterStateT={masterStateT}
        />
        <ReleaseDetail 
          details={releaseDetail}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
          masterCode={masterCode}
          toggleModal={toggleModal}
          openNullModal={openNullModal}
          filteredDetails={filteredDetails}
          openDeleteModalInDetail={openDeleteModalInDetail}
        />
      </Grid>
    </Box>
  );
};

export default Release;
