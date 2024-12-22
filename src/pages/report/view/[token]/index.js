import { Box, Card, Grid, Typography, CardContent, Chip, InputLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { getViewReport } from "backend-utils/report-utils";
import { DashboardLayout } from "src/components/dashboard-layout";

const ReportDetail = () => {
  const router = useRouter();
  // console.log("token", token);
  const [reportList, setReportList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [err, setErr] = useState("");

  const { token } = router.query;
  useEffect(() => {
    console.log("index", token);
    getViewReport(token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log(data);
          setReportList([data.report]);
          console.log({ reportList, data: data.report });
        } else {
          setErr(data.message);
        }
      })
      .catch((err) => {
        setErr("Something went Wrong");
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // console.log(reportList);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", backgroundColor: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="info" />
      </Backdrop>

      {reportList.map((report, index) => {
        return (
          <>
            <Grid alignItems="center" m={2} p={2}>
              <Typography variant="subtitle1">Report {index + 1}</Typography>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Report Date
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                      <Typography>
                        {monthNames[report.reportMonth - 1]} {report.reportDate} ,{" "}
                        {report.reportYear}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography>Total Hours: {report.totalHours}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography>Total Days: {report.totalDays}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <div className="my-1">
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Report Summary
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell rowSpan={2}>Report</TableCell>
                            </TableRow>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {report?.reports?.inputFields?.map((item, index) => (
                            <Box key={index} component="main" boxShadow={1}>
                              <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell style={{ width: "100%" }}>
                                  <Typography variant="subtitle1">On the Content</Typography>
                                  {renderSubjectsTable(item.subjects)}
                                  <br></br>
                                  <Typography variant="subtitle1">On Result</Typography>
                                  {renderAssessmentsTable(item.assesments)}
                                </TableCell>
                                {/* <TableCell></TableCell> */}
                              </TableRow>
                            </Box>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    On the Tutorial Delivery
                  </Typography>
                  <Typography variant="h6"></Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography>1.How do the tutorials go?</Typography>
                      <Typography paddingLeft={2}>{report.feedback}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>2.Was there any challenge?</Typography>
                      <Typography paddingLeft={2}>{report.pastChallenge}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>3.What are you going to the challenge?</Typography>
                      <Typography paddingLeft={2}>{report.futureChallenge}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography>4.How can we help you with the challenge?</Typography>
                      <Typography paddingLeft={2}>{report.helpChallenge}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card sx={{ my: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    On Professionality (10%)
                  </Typography>

                  <Grid container alignItems="center" m={2} p={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Dressing:</Typography>
                      <Chip label={`${report.dressing}/10`} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Grooming:</Typography>
                      <Chip label={`${report.grooming}/10`} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Hygiene:</Typography>
                      <Chip label={`${report.hygiene}/10`} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Punctuality:</Typography>
                      <Chip label={`${report.punctuality}/10`} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Manner:</Typography>
                      <Chip label={`${report.manner}/10`} variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">Eloquence:</Typography>
                      <Chip label={`${report.elequence}/10`} variant="outlined" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </>
        );
      })}
    </div>
  );
};

const renderAssessmentsTable = (assessments) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Course</TableCell>
          <TableCell>Unit</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Result</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {assessments.map((assessment, index2) =>
          assessment.units.map((unit, index1) =>
            unit.types.map((type, index) => (
              <TableRow key={index}>
                <TableCell>{index1 == 0 && index == 0 && assessment.assesment}</TableCell>
                <TableCell>{index == 0 && unit.unit}</TableCell>
                <TableCell>{type.type}</TableCell>
                <TableCell>{type.result}</TableCell>
              </TableRow>
            ))
          )
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

const renderSubjectsTable = (subjects) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Subject</TableCell>
          <TableCell>Chapter</TableCell>
          <TableCell>Topic</TableCell>
          <TableCell>Understanding</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {subjects.map((subject, index2) =>
          subject.chapters.map((chapter, index1) =>
            chapter.topics.map((topic, index) => (
              <TableRow key={index}>
                <TableCell>{index1 == 0 && index == 0 && subject.subject}</TableCell>
                <TableCell>{index == 0 && chapter.chapter}</TableCell>
                <TableCell>{topic.topic}</TableCell>
                <TableCell>{topic.understanding}</TableCell>
              </TableRow>
            ))
          )
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

ReportDetail.getLayout = (page) => <>{page}</>;

export default ReportDetail;
