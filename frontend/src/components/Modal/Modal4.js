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
const Modal4 = ({ open, onClose }) => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [checkedRow, setCheckedRow] = useState([{master: "", state:"f",detail: [{no:"",state:"f"}]}]);
  const rowColor = useRef();
  // useEffect(() => {
  //   console.log("==== row ==== ");
  //   console.log(checkedRow);
  // }, [checkedRow])
  // ReleaseMaster

  console.log("==== row ==== ");
  console.log(checkedRow);


  const [releaseMaster, setreleaseMaster] = useState([]);
  // releaseDetail
  const [releaseDetail, setreleaseDetail] = useState([{}]);
  // const [checkItems, setCheckItems] = useState([]);
  const[data,setData] = useState([]);

  
  useEffect(() => {
    console.log("======8888 =====");
    console.log(data);
  }, [data]);
  const handleSaveClick = (datas) => {  // datas = {}
    // 선택된 데이터 가져오기
    console.log("====xxxx")
    console.log(datas);
    setData([...data, datas]);
  };
  const handleSaveMultiClick = (details) => {  // datas = {}
    // 선택된 데이터 가져오기
    console.log('checkedRow', checkedRow);
    console.log('details', details);
    // let checkedList = checkedRow.filter(row => row.state === 't');
    let myCheckedRow = [];
    checkedRow.forEach(row => {
        row.detail.forEach(detail => {
            if (detail.state === 't') {
                // console.log(detail.no);
              details.forEach(item => {
                if (item.no === detail.no) {
                  // mcode: 'RV2305000015', pcode: 'i-001', pname: '상자', stockcnt: 8
                  // no: 9, masterCode: 'RV2305000015', productCode: 'i-001', productName: '상자', productSize: '10',
                  myCheckedRow.push({no: item.no, mcode:item.masterCode, pcode: item.productCode, pname: item.productName, stockcnt: item.stockCount, checked: false});
                  // console.log('item', item);
                }
              })
            }
        });
    })
    //console.log('myCheckedRow', myCheckedRow);
    setData([...data, ...myCheckedRow]);
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


  // ReceiveMaster
  const [modal4receiveMaster, setreceiveMaster] = useState([]);
  // ReceiveDetail
  const [modal4receiveDetail, setreceiveDetail] = useState([]);
  const[modal4outlist,setoutdetail] = useState([]);
  useEffect(() => {
    modal4receiveMasterSearch(null);
  }, []);
  // ReceiveMaster검색
  const modal4receiveMasterSearch = async (searchKw) => {
    //console.log(searchKw);
    var url = `/api/receive/list`;
    if (searchKw) {
      url = `/api/receive/list?rc=${searchKw.rcode}&bn=${searchKw.bname}&dt=${searchKw.rdate}`;
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
      //console.log(json.data);
      setreceiveMaster(json.data);

      setCheckedRow(json.data.map(item => ({master: item.code, state: 'f', detail: [{no: '', state: 'f'}]})));
    } catch (err) {
      console.log(err);
    }
  };
  // ReceiveDetail
  const modal4receiveDetailSearch = async (code) => {
    try {
      const response = await fetch(`/api/receive/detail?rc=${code}`, {
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
      //console.log(json.data);
      setreceiveDetail(json.data);
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
          <Grid container spacing={2}>
            <Modal4Search callback={modal4receiveMasterSearch} />
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
            />
            <Modal4Outlist
              outdtail={modal4outlist}
              selectedRowData={selectedRowData}
              data={data}
              chulgoItemOnChangeCheck={chulgoItemOnChangeCheck}
              setData={setData}
              checkedRow={checkedRow}
            />
          </Grid>
          </Box>
        </Modal>
      </div>
    </div>
  );
};


export default Modal4;
