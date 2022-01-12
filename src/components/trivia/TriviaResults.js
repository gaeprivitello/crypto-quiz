import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { AccountContext } from "../../context/AccountContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    justifyContent: "center",
  },
  tableContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  table: {
    minWidth: 400,
  },
  tableRow: {
    "&:last-child td, &:last-child th": { border: 0 },
  },
});

export const TriviaResults = ({ results, surveyId }) => {
  const classes = useStyles();
  const { submitTrivia } = useContext(AccountContext);

  const [rows, setRows] = useState([]);
  const [hideSubmit, setHideSubmit] = useState(false);

  useEffect(() => {
    if (results) {
      let rowData = [];
      results.forEach((element) => {
        rowData.push(createData(element));
      });
      setRows(rowData);
    }
  }, [results]);

  const createData = ({ question, answer }) => {
    return {
      id: `${question.id}-${answer.id}`,
      question: question.text,
      answer: answer.text,
    };
  };

  const onSubmitTrivia = () => {
    setHideSubmit(true);
    submitTrivia(surveyId, results);
  };

  return results && rows.length > 0 ? (
    <Box className={classes.root}>
      <Typography variant="h4" component="h4">
        {"Trivia Quiz Finished 🙂"}
      </Typography>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} size="small" aria-label="results">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} className={classes.tableRow}>
                <TableCell component="th" scope="row">
                  {row.question}
                </TableCell>
                <TableCell align="right">{row.answer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!hideSubmit && (
        <Button onClick={onSubmitTrivia} variant="contained" color="secondary">
          Submit Results
        </Button>
      )}
    </Box>
  ) : (
    <Typography variant="h4" component="h4">
      {"You haven't answered any question. 🙁"}
    </Typography>
  );
};
