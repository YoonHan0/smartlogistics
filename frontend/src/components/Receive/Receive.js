import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import { Box, Grid } from '@mui/material';
import ReceiveMaster from './ReceiveMaster';
import ReceiveDetail from './ReceiveDetail';
import ManagerModal from '../Modal/ManagerModal';
import ProductsModal from '../Modal/ProductsModal';
import BusinessModal from '../Modal/BusinessModal';

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

  useEffect(() => {
    receiveMasterSearch(null);
  }, []);

  useEffect(() => {
    console.log('row', checkedRow);
  }, [checkedRow]);

  const toggleModal = (open, modal) => {
    if (modal === 'manager') {
      open ? setOpenManager(false) : setOpenManager(true);
    } else if (modal === 'product') {
      open ? setOpenProduct(false) : setOpenProduct(true);
    } else if (modal === 'business') {
      open ? setOpenBusiness(false) : setOpenBusiness(true);
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
    try {
      const response = await fetch(url, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
      setreceiveMaster(json.data);
      // 넘어온 데이터의 master code 값 담기
      setCheckedRow(
        json.data.map((item) => ({
          master: item.code,
          state: 'f',
          detail: [{ no: '', state: 'f' }],
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };
  // ReceiveDetail
  const receiveDetailSearch = async (code) => {
    //선택한 입고의 입고번호 저장
    setMasterCode(code);
    try {
      const response = await fetch(`/api/receive/detail?rc=${code}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
      setreceiveDetail(json.data);
      rowColor.current = code;
      const data = addDetailArrayHandler(json.data);
      const filteredCheckedRow = data.map((row) => {
        // detail [] 배열 중 no가 빈 값인 거 제외
        const filteredDetail = row.detail.filter((detail) => detail.no !== '');
        return { ...row, detail: filteredDetail };
      });
      setCheckedRow(filteredCheckedRow);
    } catch (err) {
      console.log(err);
    }
  };

  // receiveMater nullchk
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
      setreceiveDetail([]);
      setMasterCode('');
      // productModal open
      toggleModal(openProduct, 'product');
    }
  };
  // ReceiveCntUpdate
  const updateReceiveCnt = async (receiveCnt, no, mcode) => {
    try {
      const response = await fetch('/api/receive/updatedetail', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({ no: no, receiveCount: receiveCnt }),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
      receiveDetailSearch(mcode);
    } catch (err) {
      console.log(err.message);
    }
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

    try {
      const response = await fetch(url, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== 'success') {
        throw new Error(`${json.result} ${json.message}`);
      }
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
      }
      setInputMaster({ date: '', businessCode: '', businessName: '', userId: '', userName: '' });
    } catch (err) {
      console.log(err.message);
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
      <Grid container spacing={2} style={{ marginLeft: '0px' }}>
        <SearchBar callback={receiveMasterSearch} />
        <ReceiveMaster
          masters={receiveMaster}
          receiveDetail={receiveDetailSearch}
          toggleModal={toggleModal}
          openManager={openManager}
          openBusiness={openBusiness}
          inputMaster={inputMaster}
          setInputMaster={setInputMaster}
          nullChkHandler={nullChkHandler}
          rowColor={rowColor}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
        />
        <ReceiveDetail
          details={receiveDetail}
          toggleModal={toggleModal}
          openProduct={openProduct}
          masterCode={masterCode}
          updateReceiveCnt={updateReceiveCnt}
          checkedRow={checkedRow}
          setCheckedRow={setCheckedRow}
        />
      </Grid>
    </Box>
  );
};

export default Receive;
