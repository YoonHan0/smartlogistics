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
import jwt_decode from "jwt-decode";

const UserMain = ({ info }) => {
  const [receive, setReceive] = useState({});
  const [release, setRelease] = useState({});
  const getReceiveData = async (data) => {
    await customFetch(`/api/receive/mystatistics?u=${data.sub}`, {
      method: "get",
    }).then((json) => {
      setReceive(json.data);
      console.log(json.data);
    });
  };

  const getReleaseData = async (data) => {
    await customFetch(`/api/release/mystatistics?u=${data.sub}`, {
      method: "get",
    }).then((json) => {
      setRelease(json.data);
      console.log(json.data);
    });
  };
  useEffect(() => {
    const data = info.user || jwt_decode(localStorage.getItem("token"));
    console.log("data출력");
    console.log(data);
    getReceiveData(data);
    getReleaseData(data);
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
          marginLeft: "0px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
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
                fontSize: "23px",
                fontWeight: 800,
                marginRight: "15px",
              }}
            >
              <Box>{`안녕하세요  ${info.name}님 🙋‍♂️`}</Box>
            </Typography>
            <span
              style={{
                marginTop: 1,
                backgroundColor: "#EBF2FF",
                padding: "3px",
              }}
            >
              {/* <FontAwesomeIcon icon={faVolumeHigh} /> */}
              <span
                style={{
                  color: "gray",
                  fontSize: "9px",
                  marginLeft: "8px",
                }}
              >
                즐거운 하루되세요! 대시보드를 클릭하여 원하는 작업을 할 수
                있습니다.
              </span>
            </span>
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
            xs={2.9}
            md={2.9}
            sx={{
              height: "250px",
              border: "1px solid #fff",
              backgroundColor: "#FAF6EE",
              borderRadius: "8px",
              boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
              marginRight: 2.6,
            }}
          >
            <Box sx={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "23px",
                    fontWeight: 800,
                    marginRight: "15px",
                  }}
                >
                  <Box>입고</Box>
                </Typography>{" "}
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
                  가장 오래된,가장 최근의 입고
                </Box>
              </Typography>
              <Box
                sx={{
                  bgcolor: "#fff",
                  height: "150px",
                  marginTop: "3%",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    marginLeft: "5%",
                    height: "30%",
                    display: "flex",
                    borderBottom: "1px solid #D9D9D9",
                    paddingBottom: "10px",
                    width: "90%",
                    paddingTop: "5%",
                  }}
                >
                  가장 최근 입고
                  <Typography
                    sx={{
                      marginLeft: "auto",
                      fontSize: "20px",
                      marginTop: "6%",
                      marginRight: "10%",
                    }}
                  >
                    {receive.latestCode}
                    {/* <span
                      style={{
                        fontSize: '5px',
                        marginLeft: '8px',
                      }}
                    >
                      ({receive.latestDate})
                    </span> */}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginLeft: "5%",
                    height: "30%",
                    display: "flex",
                    width: "90%",
                    paddingTop: "3%",
                  }}
                >
                  가장 오래된 입고
                  <Typography
                    sx={{
                      marginLeft: "auto",
                      fontSize: "20px",
                      marginTop: "6%",
                      marginRight: "10%",
                    }}
                  >
                    {receive.oldestCode}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={2.9}
            md={2.9}
            sx={{
              height: "250px",
              border: "1px solid #fff",
              backgroundColor: "#F1F1F7",
              marginRight: 2.6,
              borderRadius: "8px",
              boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "23px",
                    fontWeight: 800,
                    marginRight: "15px",
                  }}
                >
                  <Box>출고</Box>
                </Typography>{" "}
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
                  가장 오래된,가장 최근의 출고
                </Box>
              </Typography>
              <Box
                sx={{
                  bgcolor: "#fff",
                  height: "150px",
                  marginTop: "3%",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    marginLeft: "5%",
                    height: "30%",
                    display: "flex",
                    borderBottom: "1px solid #D9D9D9",
                    paddingBottom: "10px",
                    width: "90%",
                    paddingTop: "5%",
                  }}
                >
                  가장 최근 입고
                  <Typography
                    sx={{
                      marginLeft: "auto",
                      fontSize: "20px",
                      marginTop: "6%",
                      marginRight: "10%",
                    }}
                  >
                    {release.latestCode}
                    {/* <span
                      style={{
                        fontSize: '5px',
                        marginLeft: '8px',
                      }}
                    >
                      ({receive.latestDate})
                    </span> */}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginLeft: "5%",
                    height: "30%",
                    display: "flex",
                    width: "90%",
                    paddingTop: "3%",
                  }}
                >
                  가장 오래된 입고
                  <Typography
                    sx={{
                      marginLeft: "auto",
                      fontSize: "20px",
                      marginTop: "6%",
                      marginRight: "10%",
                    }}
                  >
                    {release.oldestCode}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={2.9}
            md={2.9}
            sx={{
              height: "250px",
              border: "1px solid #fff",
              borderRadius: "8px",
              boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#FAF3F3",
              marginRight: 2.6,
            }}
          >
            <Box sx={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "23px",
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
              <Box
                sx={{
                  bgcolor: "#fff",
                  height: "150px",
                  marginTop: "3%",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    marginLeft: "5%",
                    height: "30%",
                    display: "flex",
                    borderBottom: "1px solid #D9D9D9",
                    paddingBottom: "10px",
                    width: "90%",
                    paddingTop: "5%",
                  }}
                >
                  금일 입고 건수
                  <Typography
                    sx={{
                      marginLeft: "auto",
                      fontSize: "25px",
                      marginTop: "6%",
                      marginRight: "10%",
                    }}
                  >
                    {receive.todayCount || 0}건
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginLeft: "5%",
                    height: "30%",
                    display: "flex",
                    width: "90%",
                    paddingTop: "3%",
                  }}
                >
                  누적 입고 건수{" "}
                  <Typography
                    sx={{
                      marginLeft: "auto",
                      fontSize: "25px",
                      marginTop: "7%",
                      marginRight: "10%",
                    }}
                  >
                    {receive.totalCount || 0}건
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={2.8}
            md={2.8}
            sx={{
              height: "250px",
              border: "1px solid #fff",
              backgroundColor: "#ECF7FA",
              borderRadius: "8px",
              boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "23px",
                    fontWeight: 800,
                    marginRight: "15px",
                  }}
                >
                  <Box>출고 현황</Box>
                </Typography>
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
                  내가 담당하고 있는 출고 내역
                </Box>
              </Typography>
              <Box
                sx={{
                  bgcolor: "#fff",
                  height: "150px",
                  marginTop: "3%",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    marginLeft: "5%",
                    height: "30%",
                    display: "flex",
                    borderBottom: "1px solid #D9D9D9",
                    paddingBottom: "10px",
                    width: "90%",
                    paddingTop: "5%",
                  }}
                >
                  금일 출고 건수
                  <Typography
                    sx={{
                      marginLeft: "auto",
                      fontSize: "25px",
                      marginTop: "6%",
                      marginRight: "10%",
                    }}
                  >
                    {release.todayCount || 0}건
                  </Typography>
                </Box>

                <Box
                  sx={{
                    marginLeft: "5%",
                    height: "30%",
                    display: "flex",
                    width: "90%",
                    paddingTop: "3%",
                  }}
                >
                  누적 출고 건수{" "}
                  <Typography
                    sx={{
                      marginLeft: "auto",
                      fontSize: "25px",
                      marginTop: "7%",
                      marginRight: "10%",
                    }}
                  >
                    {release.totalCount || 0}건
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Grid
          item
          xs={12}
          sx={{
            p: 2,
            marginTop: "1%",
            border: "1px solid #fff",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
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
                  fontSize: "23px",
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
              <DateGraph inquiry={false} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserMain;
