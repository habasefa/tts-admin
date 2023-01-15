import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
} from "@mui/material";
import {
  InputLabel,
  MenuItem,
  Select,
  Box,
  CardContent,
  Container,
  Typography,
  Grid,
  Card,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Avatar
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { ReportListResults } from "../components/report/report-list-results";
import { ReportListToolbar } from "../components/report/report-list-toolbars";
import { DashboardLayout } from "../components/dashboard-layout";
import AssignmentLateRoundedIcon from '@mui/icons-material/AssignmentLateRounded';
import { getReports, getReportsBasedOnWeek } from "../../backend-utils/report-utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userSlice";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { DeleteOutlined, MoreHorizSharp } from "@mui/icons-material";
import { getInitials } from "src/utils/get-initials";

const Reports = () => {
  const currentDate= new Date()
  const currentMonth = currentDate.getMonth()+1
  const user = useSelector(selectUser);
  const [reports, setReports] = useState(null);
  const [err, setErr] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [weeks, setWeeks] = useState([]);
  const [Week1, setFirstWeek] = useState([]);
  const [Week2, setSecondWeek] = useState([]);
  const [Week3, setThirdWeek] = useState([]);
  const [Week4, setFourthWeek] = useState([]);
  const [Week5, setFiveWeek] = useState([]);
  const [WeeklyReport, setWeeklyReport] = useState([]);
  const [totalWeeks, setTotalWeeks] = useState([]);
  const [selectMonth,setSelectedMonth] = useState(currentMonth)
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date();
  const [monthIndex,setMonthIndex]=useState(d.getMonth())
  const handleOpen = (truthValue, weekRepo = []) => {
    console.log(truthValue)
    console.log(weekRepo)
    setWeeklyReport(weekRepo);
  };
  const getDay = (date) => {
    // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
  };
  const createCalander = async (year, month, newData) => {
    let data = [];
    console.log(newData,"createCalander")
    let mon = month - 1;
    let d = new Date(year, mon);
    let temp = [];
    console.log(d.getMonth(), mon);
    while (d.getMonth() == mon) {
      temp.push(d.getDate());
      if (getDay(d) % 7 == 6) {
        // sunday, last day of week - newline

        data.push([temp[0], temp[temp.length - 1]]);
        temp = [];
      }

     
      d.setDate(d.getDate() + 1);
    }
    if (temp.length > 0) {
      data.push([temp[0], temp[temp.length - 1]]);
      temp = [];
    }
  
    setWeeks(data);

    return [data, newData];
  };

  const assignReporWithValidWeek = (newData, week) => {
    console.log(newData,week)
    let firstData = [];
    let secondData = [];
    let thirdData = [];
    let fourthData = [];
    let fiveData = [];
    let total = [];
    console.log(reports);
    console.log(total);
    console.log(week);
    newData.map((report) => {
      const date = report.reportDate;
      if (date >= week?.[0]?.[0] && date <= week?.[0]?.[1]) {
        firstData.push(report);
      } else if (date >= week?.[1]?.[0] && date <= week?.[1]?.[1]) {
        secondData.push(report);
      } else if (date >= week?.[2]?.[0] && date <= week?.[2]?.[1]) {
        thirdData.push(report);
      } else if (date >= week?.[3]?.[0] && date <= week?.[3]?.[1]) {
        fourthData.push(report);
      } else {
        fiveData.push(report);
      }
    });
    total.push(firstData);
    total.push(secondData);
    total.push(thirdData);
    total.push(fourthData);
    total.push(fiveData);
    console.log(total);

    setTotalWeeks(total);
    console.log(weeks);
  };
  const router = useRouter();
  if (!user) router.push("/login");
  useEffect(() => {
    let d = new Date();
    let month = d.getMonth()+1
    let year = 2023;

    
    getReportsBasedOnWeek(user.accessToken, year, month)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.reports);
          setReports(data.reports);
          return data.reports;
        } else {
          setErr(data.message);
          return [];
        }
      })
      .then((newData) => createCalander(year, month, newData))
      .then((newData) => assignReporWithValidWeek(newData[1], newData[0]))
      .then(()=>setMonthIndex(month-1))
      .catch((_) => {
        setErr("Something went wrong");
      });
  }, []);

  useEffect(() => {
    let d = new Date();
    let month=selectMonth
    let year = d.getFullYear()

    
    getReportsBasedOnWeek(user.accessToken, year, month)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.reports,"data success");
          setReports(data.reports);
          return data.reports;
        } else {
          setErr(data.message);
          return [];
        }
      })
      .then((newData) => createCalander(year, month, newData))
      .then((newData) => assignReporWithValidWeek(newData[1], newData[0]))
      .then(()=>setMonthIndex(month-1))
      .catch((_) => {
        setErr("Something went wrong");
      });
  }, [selectMonth]);


  
  return (
    <>
      <Head>
        <title>Reports | Temaribet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ReportListToolbar name="Reports" setSearchTerm={setSearchTerm} />
          <Box
  m={1}
 //margin
  display="flex"
  justifyContent="flex-end"
  alignItems="flex-end"

>
<Grid>
<Typography
fontWeight='bold'
>
              Choose Month
              </Typography>
<Select
               labelId="demo-select-small"
               id="demo-select-small"
               name="selectMonth"
               margin="normal"
               value={selectMonth}
               label="Hours Per Day"
               sx={{ marginLeft: "auto" }}
               onChange={(event) => setSelectedMonth(event.target.value)}
              
              >
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
              </Grid>
</Box>
          <Grid
        
      
          >

          </Grid>
          <Container sx={{ 
             boxShadow: 1,
                    
             bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
             color: (theme) =>
               theme.palette.mode === 'dark' ? 'black.300' : 'grey.800',
             p: 2,
            
             borderRadius: 2,
            justifyContent: "space-between", margin: 1 }}>
            <Grid container spacing={3}>
              {weeks.map((week, index) => {
                return (
                  <Grid item>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => handleOpen(totalWeeks, totalWeeks[index])}
                      startIcon={<AssignmentLateRoundedIcon />}
                      sx={{
                        
                      }}
                      
                    >
                      {`${monthName[monthIndex]} ${week[0]} - ${week[1]}`}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {WeeklyReport.length>0 &&
                
                
               WeeklyReport
                .slice(0, 10)
                .filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  } else if (val.tutorName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                  }
                })
                .map((report, index) => {
                  return (
                    <>
                      <TableRow
                        key={index}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                        <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Avatar
                          // src={customer.avatarUrl}
                          sx={{ mr: 2 }}
                        >
                          {getInitials( report.tutorName)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                        {report.tutorName}
                        </Typography>
                         </Box>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="info"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => router.push("/report/" + report.id)}
                          >
                            <MoreHorizSharp />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
                {
                  WeeklyReport.length===0 && (
                    <Typography
                    align="center"
                    p={2}
                    
                    >
                      NO REPORT FOR THIS WEEK
                    </Typography>
                  )
                }
               
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
};
Reports.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Reports;
