import React from "react";
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function createData(name, location, date, estimatec_charge, protein) {
  return { name, location, date, estimatec_charge, protein };
}

const rows = [
  createData("공기청정기", "거실", "2023/07/25 12:05", "$784"),
  createData("모니터", "주방", "2023/07/25 12:05", "$784"),
  createData("조명", "서재", "2023/07/25 12:05", "$784"),
];

const data = [
  { name: "7/26", 공기청정기: 4, 조명: 1, 모니터: 2 },
  { name: "7/27", 공기청정기: 3, 조명: 6, 모니터: 5 },
  { name: "7/28", 공기청정기: 5, 조명: 3, 모니터: 6 },
  { name: "7/29", 공기청정기: 4, 조명: 7, 모니터: 3 },
  { name: "7/30", 공기청정기: 1, 조명: 4, 모니터: 2 },
  { name: "7/31", 공기청정기: 2, 조명: 5, 모니터: 1 },
];

export default function Check() {
  return (
    <div>
      <h1>가전 제품 제어 현황 확인</h1>
      <Box sx={{ width: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Item>
              <h2>각 가전 제품별 제어 횟수 현황</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <BarChart width={1200} height={550} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="공기청정기" fill="#FF5722" />
                  <Bar dataKey="조명" fill="#4CAF50" />
                  <Bar dataKey="모니터" fill="#2196F3" />
                </BarChart>
              </div>
            </Item>
          </Grid>

          <Grid item xs={8}>
            <Item>
              <h2>각 가전 제품별 예상 전기 요금</h2>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">가전제품</TableCell>
                      <TableCell align="center">위치</TableCell>
                      <TableCell align="center">
                        최종 사용일자/시각(g)
                      </TableCell>
                      <TableCell align="center">예상 요금(g)</TableCell>
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
                        <TableCell align="center" component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                        <TableCell align="center">
                          {row.estimatec_charge}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
