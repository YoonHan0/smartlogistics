import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid } from '@mui/material';
import ReceiveMaster from './ReceiveMaster';
import ReceiveDetail from './ReceiveDetail';
import ManagerModal from '../Modal/ManagerModal';
import ProductsModal from '../Modal/ProductsModal';
import BusinessModal from '../Modal/BusinessModal';
import { customFetch } from '../custom/customFetch';
import NullModal from '../Modal/NullModal';
import DeleteMasterModal from '../Modal/DeleteMasterModal';
import DeleteDetailModal from '../Modal/DeleteDetailModal';

const Receive = () => {
  // ReceiveMaster
  const [receiveMaster, setreceiveMaster] = useState([]);
  // ReceiveDetail
  const [receiveDetail, setreceiveDetail] = useState([]);
  // productAdd masterCode
  const [masterCode, setMasterCode] = useState();
  // Modal
  const [openManager, setOpenManager] = useState(false);
  const [openBusiness, setOpenBusiness] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openDeleteModalInMaster, setOpenDeleteModalInMaster] = useState(false); // 삭제할 것인지 확인하는 모달창
  const [openDeleteModalInDetail, setOpenDeleteModalInDetail] = useState(false); // 삭제할 것인지 확인하는 모달창
  const [openNullModal, setOpenNullModal] = useState(false); // 삭제할 것인지 확인하는 모달창

  // ReceiveMaster data(date,business,manager)
  const [inputMaster, setInputMaster] = useState({
    date: '',
    businessCode: '',
    businessName: '',
    userId: '',
    userName: '',
  });

  // 체크박스를 다루기 위한 state
  const [checkedRow, setCheckedRow] = useState([{ master: '', state: 'f', detail: [{ no: '', state: 'f' }] }]);

  const rowColor = useRef();

  const masterStateT = checkedRow.filter((row) => row.state === 't').map((row) => row.master);
  // checkedRow에 detail 프로퍼티가 없어서 에러가 계속 발생 -> filter로 detail 프로퍼티가 존재하는지 먼저 거르고 시작
  const filteredRow = checkedRow.filter((row) => row.detail !== undefined);
  const filteredDetails = filteredRow
    .filter((row) => row.master === masterCode) // master 코드가 같은 것 / flatMap: 배열 내 요소들을 변환하고, 각 변환된 배열 요소를 하나의 배열로 합치는 함수
    .flatMap((row) => row.detail.filter((detail) => detail.state === 't' && detail.no !== ''))
    .map((detail) => detail.no);

  const deleteObj = {
    no: filteredDetails, // checkedRow의 detail 프로퍼티에서 state값이 "t"인 데이터의 no값
    masterCode: masterCode, // 화면에 표시되는 detail List들의 공통된 master code값
    length: receiveDetail.length, // 화면에 표시되는 detail List들의 길이
  };

  useEffect(() => {
    receiveMasterSearch(null);
  }, []);

  const toggleModal = (open, modal) => {
    if (modal === 'manager') {
      open ? setOpenManager(false) : setOpenManager(true);
    } else if (modal === 'product') {
      open ? setOpenProduct(false) : setOpenProduct(true);
    } else if (modal === 'business') {
      open ? setOpenBusiness(false) : setOpenBusiness(true);
    } else if (modal === 'deleteMater') {
      open ? setOpenDeleteModalInMaster(false) : setOpenDeleteModalInMaster(true);
    } else if (modal === 'null') {
      open ? setOpenNullModal(false) : setOpenNullModal(true);
    } else if (modal === 'deleteDetail') {
      open ? setOpenDeleteModalInDetail(false) : setOpenDeleteModalInDetail(true);
    }
  };
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

  // ReceiveMaster검색
  const receiveMasterSearch = async (searchKw) => {
    var url = `/api/receive/list`;
    if (searchKw) {
      url = `/api/receive/list?rc=${searchKw.rcode}&bn=${searchKw.bname}&dt=${searchKw.rdate}`;
    }
    await customFetch(url, { method: 'get' }).then((json) => {
      setreceiveMaster(json.data);
      // 넘어온 데이터의 master code 값 담기
      setCheckedRow(
        json.data.map((item) => ({
          master: item.code,
          state: 'f',
          detail: [{ no: '', state: 'f' }],
        }))
      );
    });
  };
  // ReceiveDetail
  const receiveDetailSearch = async (code) => {
    //선택한 입고의 입고번호 저장
    setMasterCode(code);

    await customFetch(`/api/receive/detail?rc=${code}`, { method: 'get' }).then((json) => {
      setreceiveDetail(json.data);
      rowColor.current = code;
      const data = addDetailArrayHandler(json.data);
      const filteredCheckedRow = data.map((row) => {
        // detail [] 배열 중 no가 빈 값인 거 제외
        const filteredDetail = row.detail.filter((detail) => detail.no !== '');
        return { ...row, detail: filteredDetail };
      });
      setCheckedRow(filteredCheckedRow);
    });
  };

  // receiveMater nullchk
  const nullChkHandler = (inputMaster) => {
    console.log(inputMaster);
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
      setreceiveDetail([]);
      setMasterCode('');
      // productModal open
      toggleModal(openProduct, 'product');
    }
  };
  // ReceiveCntUpdate
  const updateReceiveCnt = async (receiveCnt, no, mcode) => {
    await customFetch('/api/receive/updatedetail', {
      method: 'post',
      body: JSON.stringify({ no: no, receiveCount: receiveCnt }),
    }).then((json) => {
      receiveDetailSearch(mcode);
    });
  };
  // receiveAdd
  const receiveAdd = async (selectList) => {
    var url = '';
    var data = '';
    // receiveMaster,receiveDetailAdd
    if (receiveDetail === null || receiveDetail === {} || receiveDetail === [] || masterCode === '') {
      url = '/api/receive/insert';
      data = {
        ...inputMaster,
        receiveDetails: selectList,
      };
    } else {
      // receiveDetailAdd
      url = '/api/receive/insertdetail';
      data = selectList.map((obj) => {
        //masterCode set
        return {
          ...obj,
          masterCode: masterCode,
        };
      });
    }

    await customFetch(url, { method: 'post', body: JSON.stringify(data) }).then((json) => {
      if (json.data.code) {
        /* receiveMaster,receiveDetail Add */
        // 등록 후 선택(rowColor Set)
        rowColor.current = json.data.code;
        //console.log(json.data.receiveDetails);
        setMasterCode(json.data.code);
        setreceiveDetail(json.data.receiveDetails);
        setreceiveMaster((DetailList) => [
          {
            code: json.data.code,
            businessName: json.data.businessName,
            userName: json.data.userName,
            date: json.data.date,
            state: '대기',
          },
          ...DetailList,
        ]);
        setCheckedRow((checkedRow) => [
          ...checkedRow,
          {
            master: json.data.code,
            state: 'f',
            detail: json.data.receiveDetails.map((item) => ({
              no: item.no,
              state: 'f',
            })),
          },
        ]);
      } else {
        /* receiveDetail Add */
        json.data.map((item) => {
          setreceiveDetail((DetailList) => [...DetailList, item]);
        });

        const updatedCheckedRow = checkedRow.map((row) => {
          if (row.master === masterCode) {
            const updatedDetail = row.detail.concat(json.data.map((detail) => ({ no: detail.no, state: 'f' })));
            console.log(updatedDetail);
            return { ...row, detail: updatedDetail };
          } else {
            return row;
          }
        });

        setCheckedRow(updatedCheckedRow);
      }
      setInputMaster({ date: '', businessCode: '', businessName: '', userId: '', userName: '' });
    });
  };

  // ============================ Delete Handler ============================
  const deleteMasterHandler = async (masterNo) => {
    await customFetch('/api/receive/deleteMaster', {
      method: 'post',
      body: JSON.stringify(masterNo),
    }).then((json) => {
      setOpenDeleteModalInMaster(false); // 삭제 완료 후 모달창 제거
      setreceiveDetail([{}]); // detail 리스트도 clear
      receiveMasterSearch(null); // master 리스트 update
    });
  };
  // ============================ Delete Handler ============================
  const deleteDetailHandler = async (detail) => {
    // detail: {no: [], masterCode: "", length: } / no: state가 "t"인 no값들, length: 화면에 보이는 detail의 length
    console.log('디테일 화긴', detail);
    try {
      const response = await fetch(
        `/api/receive/deleteDetail?no=${detail.no}&masterCode=${detail.masterCode}&length=${detail.length}`,
        {
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }

      setOpenDeleteModalInDetail(false); // 모달창 제거
      if (detail.no.length === detail.length) {
        setreceiveDetail([{}]);
        receiveMasterSearch(null);
      } else {
        setCheckedRow(updatedCheckedRow(detail));
        setreceiveDetail(receiveDetail.filter((d) => !detail.no.includes(d.no)));
      }
    } catch (err) {
      console.log(err);
    }
  };

  /** Master행 클릭 시 해당하는 detail List를 불러오면서(api) checkedRow state에 데이터를 담는 함수 */
  const addDetailArrayHandler = (data) =>
    checkedRow.map((row) => {
      const { master } = row; // row(하나의 객체)에 있는 master 프로퍼티 값을 사용한다
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

  const updatedCheckedRow = (deleteData) =>
    checkedRow.map((row) => {
      if (row.master === deleteData.masterCode) {
        const updatedDetail = row.detail.filter((detail) => !deleteData.no.includes(detail.no));
        return { ...row, detail: updatedDetail };
      }
      return row;
    });
  return (
    <Box>
      <ManagerModal open={openManager} onClose={() => setOpenManager(false)} handleButtonClick={handleButtonClick} />
      <BusinessModal open={openBusiness} onClose={() => setOpenBusiness(false)} handleButtonClick={handleButtonClick} />
      <ProductsModal
        open={openProduct}
        onClose={() => setOpenProduct(false)}
        handleButtonClick={handleButtonClick}
        details={receiveDetail}
        receiveAdd={receiveAdd}
      />
      <DeleteMasterModal
        open={openDeleteModalInMaster}
        onClose={() => setOpenDeleteModalInMaster(false)}
        checkedRow={checkedRow}
        deleteMasterHandler={deleteMasterHandler}
        data={masterStateT}
      />
      <DeleteDetailModal
        open={openDeleteModalInDetail}
        onClose={() => setOpenDeleteModalInDetail(false)}
        checkedRow={checkedRow}
        deleteDetailHandler={deleteDetailHandler}
        data={deleteObj}
      />
      <NullModal open={openNullModal} onClose={() => setOpenNullModal(false)} />
      <Grid container spacing={2} style={{ marginLeft: '0px' }}>
        <SearchBar callback={receiveMasterSearch} />
        <ReceiveMaster
          masters={receiveMaster}
          receiveDetail={receiveDetailSearch}
          inputMaster={inputMaster}
          setInputMaster={setInputMaster}
          nullChkHandler={nullChkHandler}
          rowColor={rowColor}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
          toggleModal={toggleModal}
          openManager={openManager}
          openBusiness={openBusiness}
          openDeleteModalInMaster={openDeleteModalInMaster}
          openNullModal={openNullModal}
          masterStateT={masterStateT}
        />
        <ReceiveDetail
          details={receiveDetail}
          updateReceiveCnt={updateReceiveCnt}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
          toggleModal={toggleModal}
          openProduct={openProduct}
          masterCode={masterCode}
          filteredDetails={filteredDetails}
          openDeleteModalInDetail={openDeleteModalInDetail}
          openNullModal={openNullModal}
        />
      </Grid>
    </Box>
  );
};

export default Receive;
