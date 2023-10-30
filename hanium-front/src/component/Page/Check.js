import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Weather from "./Weather";
import "./styles.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontFamily: "Apple Pretendard, sans-serif",
}));

function createData(name, location, date, usageCount, powerConsumption) {
  return {
    name,
    location,
    date,
    usageCount,
    powerConsumption,
  };
}

const rows = [
  createData("공기청정기", "거실"),
  createData("모니터", "주방"),
  createData("조명", "서재"),
];

const electricityCostPerKWh = 136.76; //W에 따른 전기요금

export default function Check() {
  const [tvMonitorTimestamp, setTvMonitorTimestamp] = useState("");
  const [airPurifierTimestamp, setAirPurifierTimestamp] = useState("");
  const [LightTimestamp, setLightTimestamp] = useState("");
  const [countData, setCountData] = useState([]);
  const [airElectricityCost, setAirElectricityCost] = useState(0);
  const [monitorElectricityCost, setMonitorElectricityCost] = useState(0);
  const [lightElectricityCost, setLightElectricityCost] = useState(0);

  useEffect(() => {
    fetchTVMonitorTimestamp();
    fetchAirPurifierTimestamp();
    fetchLightTimestamp();
    fetchCountData();
    ElectricityCostPerKWh();
  }, []);

  const fetchCountData = async () => {
    try {
      const response = await axios.get(
        "http://3.34.129.217:8086/appliance/count"
      );
      setCountData(response.data.result);
    } catch (error) {
      console.error("Error fetching count data:", error);
    }
  };

  const ElectricityCostPerKWh = async () => {
    try {
      const response = await axios.get(
        "http://3.34.129.217:8086/appliance/count"
      );
      const countData = response.data.result;

      // 현재 날짜를 얻기
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줍니다

      // 현재 달을 "YYYY-MM" 형식으로 설정
      const currentMonthStr = `${currentYear}-${
        currentMonth < 10 ? "0" : ""
      }${currentMonth}`;

      const airTotal = countData
        .filter((entry) => entry.date.startsWith(currentMonthStr))
        .reduce((total, entry) => total + entry.airCnt, 0);

      const monitorTotal = countData
        .filter((entry) => entry.date.startsWith(currentMonthStr))
        .reduce((total, entry) => total + entry.monitorCnt, 0);

      const lightTotal = countData
        .filter((entry) => entry.date.startsWith(currentMonthStr))
        .reduce((total, entry) => total + entry.lightCnt, 0);

      const airElectricityCost = (
        (airTotal * electricityCostPerKWh * 30) /
        1000
      ) // 30 W 사용
        .toFixed(2);

      const monitorElectricityCost = (
        (monitorTotal * electricityCostPerKWh * 30) /
        1000
      ) // 30 W 사용
        .toFixed(2);

      const lightElectricityCost = (
        (lightTotal * electricityCostPerKWh * 15) /
        1000
      ) // 15W 사용
        .toFixed(2);

      setAirElectricityCost(airElectricityCost);
      setMonitorElectricityCost(monitorElectricityCost);
      setLightElectricityCost(lightElectricityCost);
    } catch (error) {
      console.error("Error fetching count data:", error);
      return {
        airElectricityCost: 0,
        monitorElectricityCost: 0,
        lightElectricityCost: 0,
      }; // 에러 발생 시 기본값 반환
    }
  };

  const createGraphData = () => {
    const dataLength = countData.length;
    const startIdx = Math.max(dataLength - 6, 0);
    const filteredData = countData.slice(startIdx);

    const graphData = filteredData.map((item) => ({
      name: item.date,
      공기청정기: item.airCnt,
      조명: item.lightCnt,
      모니터: item.monitorCnt,
    }));

    return graphData;
  };

  const fetchTVMonitorTimestamp = async () => {
    try {
      const response = await axios.get(
        "https://api.smartthings.com/v1/devices/d4cf4e04-7edf-f983-36bf-0c7ae155cf24/components/main/capabilities/switch/status",
        {
          headers: {
            Authorization: "Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89",
          },
        }
      );
      setTvMonitorTimestamp(response.data.switch.timestamp);
    } catch (error) {
      console.error("Error fetching TV monitor timestamp:", error);
    }
  };

  const fetchAirPurifierTimestamp = async () => {
    try {
      const response = await axios.get(
        "https://api.smartthings.com/v1/devices/844c4982-96a7-fb10-5e40-65f60aee9e9d/components/main/capabilities/switch/status",
        {
          headers: {
            Authorization: "Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89",
          },
        }
      );
      setAirPurifierTimestamp(response.data.switch.timestamp);
    } catch (error) {
      console.error("Error fetching air purifier timestamp:", error);
    }
  };

  const fetchLightTimestamp = async () => {
    try {
      const response = await axios.get(
        "https://api.smartthings.com/v1/devices/b2cdff25-4a9b-4861-9895-dcca2b3194cd/components/main/capabilities/switch/status",
        {
          headers: {
            Authorization: "Bearer 1c347acf-6ddb-437a-b020-fcd3cdedad89",
          },
        }
      );
      setLightTimestamp(response.data.switch.timestamp);
    } catch (error) {
      console.error("Error fetching Light timestamp:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#F2F2F2" }}>
      <div>
        <h1 style={{ marginTop: "-2px" }}>가전 제품 제어 현황 확인</h1>
        <Box sx={{ width: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs>
              <Item>
                <h2>각 가전 제품별 제어 횟수 현황</h2>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <BarChart width={1200} height={550} data={createGraphData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="공기청정기" fill="#003399" />
                    <Bar dataKey="조명" fill="#4CAF50" />
                    <Bar dataKey="모니터" fill="#2196F3" />
                  </BarChart>
                </div>
              </Item>
            </Grid>

            <Grid item xs={8}>
              <Item style={{ height: "380px" }}>
                <h2>각 가전 제품별 예상 전기 요금</h2>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">
                          <h3>가전제품</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>위치</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>최종 사용일자/시각</h3>
                        </TableCell>
                        <TableCell align="center">
                          <h3>예상 요금</h3>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            align="center"
                            component="th"
                            scope="row"
                            style={{ fontSize: "15px" }}
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "15px" }}
                          >
                            {row.location}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "15px" }}
                          >
                            {row.name === "모니터"
                              ? tvMonitorTimestamp
                              : row.name === "공기청정기"
                              ? airPurifierTimestamp
                              : row.name === "조명"
                              ? LightTimestamp
                              : row.date}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ fontSize: "15px" }}
                          >
                            {row.name === "모니터"
                              ? monitorElectricityCost
                              : row.name === "공기청정기"
                              ? airElectricityCost
                              : row.name === "조명"
                              ? lightElectricityCost
                              : row.date}
                            원
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item style={{ height: "380px" }}>
                <Weather
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                  }}
                />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
