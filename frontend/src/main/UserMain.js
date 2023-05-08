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
import React from "react";
import Donut from "../components/chart/Donut";

const UserMain = () => {
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
                <Box>오늘 내 입고 : {10}</Box>
                <br />
                <Box>가장 최근 입고 : {"2023-04-26"}</Box>
              </Box>
              <Donut
                {...{
                  labels: ["my", "all"],
                  label: "오늘 총 입고",
                  data: [10, 90],
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
              height: "400px",
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
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserMain;
