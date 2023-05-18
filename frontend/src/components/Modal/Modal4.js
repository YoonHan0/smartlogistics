import React, { useState, useEffect,useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal4Search from "./Modal4Search";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  TextField,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox, // Checkbox 추가
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import Modal4ReceiveMaster from "./Modal4ReceiveMaster";
import Modal4MasterItem from "./Modal4MasterItem";
import Modal4ReceiveDetail from "./Modal4ReceiveDetail";
import Modal4Outlist from "./Modal4Outlist";
import Modal4DetailItem from "./Modal4DetailItem";
import { customFetch } from '../custom/customFetch';
const Modal4 = ({ open, onClose, handleButtonClick, details, releaseAdd }) => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [checkedRow, setCheckedRow] = useState([{master: "", state:"f",detail: [{no:"",state:"f"}]}]);
  const rowColor = useRef();
  const[data,setData] = useState([]);     // 추기된 출고 리스트 관리하는 state
  const [masterCode, setMasterCode] = useState();
  // ReceiveMaster
  const [modal4receiveMaster, setreceiveMaster] = useState([]);
  // ReceiveDetail
  const [modal4receiveDetail, setreceiveDetail] = useState([]);
  const[modal4outlist,setoutdetail] = useState([]);
  
  const [releaseMaster, setreleaseMaster] = useState([]);
  // releaseDetail
  const [releaseDetail, setreleaseDetail] = useState([{}]);
  // const [checkItems, setCheckItems] = useState([]);
  const[nocheck,setNocheck] = useState([]);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);

 /* date값을 가지고 있는 */
 const [seDate, setSeDate] = useState({ sDate: '', eDate: '' });

 // receive Master 수량 미입력
 const [disable, setDisable] = useState({});
  
  
  const graybutton = (no) => {
    console.log("호로로롱 전", modal4receiveDetail);
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        const newModal4receiveDetail = modal4receiveDetail.map((detail) =>
          detail.no === no ? { ...detail, disabled: true } : detail
        );
        console.log("호로로롱", newModal4receiveDetail);
        setreceiveDetail(newModal4receiveDetail);
        break;
      }
    }
    console.log(modal4receiveDetail);
  };

  useEffect(() => {
    console.log("====== 추기된 출고 리스트 관리하는 state =====");
    console.log(data);
    
  }, [data]);

  useEffect(() => {
    console.log("====== checkedRow state =====");
    console.log(checkedRow);
  }, [checkedRow]);

  /* detail 리스트에서 선택 버튼 클릭 시 */
    
  const handleSaveClick = (datas) => {
    // datas = {no: 1, businessCode: '...', ....} / data state에 있는 [{}, {}, {}]
    let isDuplicate = false; // 중복 여부를 나타내는 변수
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === datas.no) {
        console.log("동일한 no 값을 찾았습니다: " + datas.no);
        isDuplicate = true;
        break; // 중복을 찾았으므로 반복문을 종료합니다.
      }
    }
    
    if (!isDuplicate) {
      setData([...data, datas]);
    }
  };


  

  /* detail item에서 잔량 수정후 Enter */
  // const updateReceiveCnt = (count,no) => {
  //   const updatedData = modal4receiveDetail.map((item) => {
  //     if (item.no === no) {
  //       return {

  //         ...item,
  //         stockCount: count
  //       };
  //     }
  //     return item;
  //   });
  //   setreceiveDetail(updatedData);

    
  // };
  

  

  const handleSaveMultiClick = (details) => {
    let myCheckedRow = [];
    if (checkedRow.length > 0 && details.length > 0) {
      checkedRow.forEach((row) => {
        row.detail.forEach((detail) => {
          if (detail.state === 't' || row.state === 't') {
            details.forEach((item) => {
              if (item.no === detail.no && item.stockCount <= item.receiveCount) { // stockcnt가 receivecnt보다 작거나 같은 경우에만 추가
                myCheckedRow.push({
                  no: item.no,
                  mcode: item.masterCode,
                  pcode: item.productCode,
                  pname: item.productName,
                  psize: item.productSize,
                  punit: item.productUnit,
                  receivecnt: item.receiveCount,
                  stockcnt: item.stockCount,
                  checked: false,
                });
              }
            });
          }
        });
      });
    }
  
    const newData = data.filter((item) => {
      return !myCheckedRow.some((row) => row.no === item.no);
    });
  
    if (newData.length + myCheckedRow.length === data.length) {
      console.log('stockcnt is greater than receivecnt');
    } else {
      setData([...newData, ...myCheckedRow]);
      console.log(modal4receiveDetail);
    }
  };
  
 

  // 출고 체크 박스 선택
  const chulgoItemOnChangeCheck = (no) => { // [1, 2]
    //console.log('no', no);
    let changedData = data.map((item, index) => {
      if (item.no === no) {
        return {...item, checked: !item.checked};
      }
      return item;
    });
    // console.log('changedData', changedData);
    setData(changedData);
  }


  
  useEffect(() => {
    modal4receiveMasterSearch(null);
  }, []);




  // ReceiveMaster검색
  // const modal4receiveMasterSearch = async (searchKw) => {
  //   var url = `/api/receive/list1`;
  //   if (searchKw) {
  //     url = `/api/receive/list1?rc=${searchKw.rcode}&bn=${searchKw.bname}&sdt=${searchKw.startdt}&edt=${searchKw.enddt}`;
  //   }
  //   try {
  //     const response = await fetch(url, {
  //       method: "get",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error(`${response.status} ${response.statusText}`);
  //     }
  //     const json = await response.json();
  //     if (json.result !== "success") {
  //       throw new Error(`${json.result} ${json.message}`);
  //     }
  //     //console.log(json.data);
  //     setreceiveMaster(json.data);
      

  //     setCheckedRow(json.data.map(item => ({master: item.code, state: 'f', detail: [{no: '', state: 'f'}]})));
  //     console.log("체크체크",checkedRow)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const modal4receiveMasterSearch = async (searchKw) => {
    var url = `/api/receive/list1`;
    if (searchKw) {
      url = `/api/receive/list1?rc=${searchKw.rcode}&bn=${searchKw.bname}&sdt=${searchKw.startdt}&edt=${searchKw.enddt}`;
    }
    await customFetch(url, { method: 'get' }).then((json) => {
      const { dataList, sDate, eDate } = json.data; // dataList: 기존에 불러오던 data, sDate, eDate: 오늘 날짜를 기준으로 -7, +7일 date 값
      // console.log(dataList);
      setreceiveMaster(dataList);
      setSeDate({ sDate: sDate, eDate: eDate });
      setDisable(dataList.map(({ code, disable }) => ({ code, disable })));
      // 넘어온 데이터의 master code 값 담기
      setCheckedRow(
        dataList.map((item) => ({
          master: item.code,
          state: 'f',
          detail: [{ no: '', state: 'f' }],
        }))
      );
    });
  };

  
  // ReceiveDetail
  // const modal4receiveDetailSearch = async (code) => {
  //   try {
  //     const response = await fetch(`/api/receive/detail?rc=${code}`, {
  //       method: "get",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: localStorage.getItem("token"),
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error(`${response.status} ${response.statusText}`);
  //     }
  //     const json = await response.json();
  //     if (json.result !== "success") {
  //       throw new Error(`${json.result} ${json.message}`);
  //     }
  //     //console.log(json.data);
  //     setreceiveDetail(json.data);
  //     rowColor.current = code;    // 선택된 행 background 색상 변경
  //     const data = addDetailArrayHandler(json.data);
  //     const filteredCheckedRow = data.map((row) => {    // detail [] 배열 중 no가 빈 값인 거 제외
  //       const filteredDetail = row.detail.filter((detail) => detail.no !== '');
  //       return { ...row, detail: filteredDetail };
  //     });
  //     setCheckedRow(filteredCheckedRow);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const modal4receiveDetailSearch = async (code) => {
    //선택한 입고의 입고번호 저장
    setMasterCode(code);

    await customFetch(`/api/receive/detail1?rc=${code}`, { method: 'get' }).then((json) => {
      console.log(json.data);
      setreceiveDetail(json.data);

      const isAnyNull = json.data.some((item) => item.state === null); // status 배열에서 하나라도 null이 있는지 확인합니다.
      console.log(isAnyNull);
      setreceiveMaster((prevDataList) => {
        return prevDataList.map((item) => {
          if (item.code === code) {
            return { ...item, disable: isAnyNull ? 'true' : 'false' }; // disable 값을 isAnyNull에 따라 설정합니다.
          }
          return item;
        });
      });

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
      setDetailInput(true);
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
  return (
    <div>
      <div>
        <Modal open={open} onClose={onClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              width: "80%",
              padding: "80px",
              paddingTop: '20px',
              height: "80%",
              borderRadius: "8px",
            }}
          >
          <Grid >
            <Modal4Search callback={modal4receiveMasterSearch} seDate={seDate} />
            <Modal4ReceiveMaster
              masters={modal4receiveMaster}
              modal4receiveDetail={modal4receiveDetailSearch}
              checkedRow={checkedRow}
              setCheckedRow={setCheckedRow}
              rowColor={rowColor}
            />
            <Modal4ReceiveDetail details={modal4receiveDetail}
                                 checkedRow={checkedRow}
                                 setCheckedRow={setCheckedRow}
                                 clicks={handleSaveClick}
                                 multiClicks={handleSaveMultiClick}
                                 data={data}
                                 setData={setData}
                                 setreceiveDetail={setreceiveDetail}
                                 modal4receiveDetail={modal4receiveDetail}
                                updateReceiveCnt={updateReceiveCnt}
                                graybutton={graybutton}
                              
                             
            />
            <Modal4Outlist
              outdtail={modal4outlist}
              selectedRowData={selectedRowData}
              data={data}
              chulgoItemOnChangeCheck={chulgoItemOnChangeCheck}
              setData={setData}
              checkedRow={checkedRow}
              handleButtonClick={handleButtonClick}
              releaseAdd={releaseAdd}
              details={modal4receiveDetail}
              // setIsButtonDisabled={setIsButtonDisabled}
              // isButtonDisabled={isButtonDisabled}
            />
          </Grid>
          </Box>
        </Modal>
      </div>
    </div>
  );
};


export default Modal4;
