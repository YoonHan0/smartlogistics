import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Donut from "../components/chart/Donut";
import { customFetch } from "../components/custom/customFetch";
import DateGraph from "../components/Inquiry/DateGraph";

const UserMain = () => {
  const [receive, setReceive] = useState({});

  const getReceiveData = async () => {
    await customFetch("/api/donut/receive", { method: "get" }).then((json) => {
      setReceive(json.data);
      console.log(json.data);
    });
  };

  useEffect(() => {
    getReceiveData();
    return () => {};
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: "column",
          marginBottom: 2,
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              height: "15%",
              alignItems: "center",
              marginRight: "1%",
              marginBottom: "1%",
            }}
          >
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: 800,
                marginRight: "15px",
              }}
            >
              <Box>김더존님 안녕하세요 🙋‍♂️</Box>
            </Typography>
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                backgroundColor: "#EBF2FF",
                padding: "3px",
              }}
            >
              <FontAwesomeIcon icon={faVolumeHigh} />
              <Typography
                sx={{
                  color: "gray",
                  fontSize: "12px",
                  marginLeft: "8px",
                }}
              >
                <Box>
                  즐거운 하루되세요! 대시보드를 클릭하여 원하는 작업을 할 수
                  있습니다.
                </Box>
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Box
          sx={{
            display: "flex",
            marginTop: "1%",
          }}
        >
          <Grid
            item
            xs={6}
            sx={{
              p: 2,
              height: "250px",
              border: "1px solid #fff",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: 800,
                  marginRight: "15px",
                }}
              >
                <Box>입고 현황</Box>
              </Typography>{" "}
              <a style={{ textDecoration: "none" }} href="/receive">
                <Box sx={{ color: "gray" }}>자세히</Box>
              </a>
            </Box>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 800,
                marginRight: "15px",
              }}
            >
              <Box
                sx={{
                  color: "#B6ABAB",
                }}
              >
                내가 담당하고 있는 입고 내역
              </Box>
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ alignSelf: "center" }}>
                <Box>전체 입고 수 : {receive.all}</Box>
                <br />
                <Box>오늘 내 입고 : {receive.my}</Box>
                <br />
                <Box>가장 최근 입고 : {receive.code}</Box>
              </Box>
              <Donut
                {...{
                  labels: ["my", "other"],
                  label: "오늘 입고",
                  data: [receive.my, receive.todayall - receive.my],
                }}
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              p: 2,
              marginLeft: 2,
              height: "250px",
              border: "1px solid #fff",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: 800,
                marginRight: "15px",
              }}
            >
              <Box>출고 현황</Box>
            </Typography>
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 800,
                marginRight: "15px",
              }}
            >
              <Box
                sx={{
                  color: "#B6ABAB",
                }}
              >
                내가 담당하고 있는 출고 내역
              </Box>
            </Typography>
          </Grid>
        </Box>
        <Grid
          item
          xs={12}
          sx={{
            p: 2,
            marginTop: "1%",
            border: "1px solid #fff",
            borderRadius: "10px",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              height: "450px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "28px",
                  fontWeight: 800,
                  marginRight: "15px",
                }}
              >
                <Box>일일 현황</Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 800,
                  marginRight: "15px",
                }}
              >
                <Box
                  sx={{
                    color: "#B6ABAB",
                  }}
                >
                  입고 출고현황을 그래프로 나타내줍니다.
                </Box>
              </Typography>
              <DateGraph inquiry={false}/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserMain;
