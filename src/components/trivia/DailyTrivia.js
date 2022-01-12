import React, { useState } from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { TriviaQuestion } from "./TriviaQuestion";
import { TriviaResults } from "./TriviaResults";
import { TriviaPreview } from "./TriviaPreview";
import { triviaData } from "../../utils/triviaData";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    justifyContent: "center",
  },
});

export const DailyTrivia = () => {
  const classes = useStyles();

  const [triviaInProgress, setTriviaInProgress] = useState(false);
  const [triviaFinished, setTriviaFinished] = useState(false);
  const [dailyTrivia] = useState(triviaData);
  const [triviaResults, setTriviaResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const startTrivia = () => {
    setTriviaInProgress(true);
    setCurrentQuestion(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < dailyTrivia.questions.length - 1) {
      setCurrentQuestion((x) => x + 1);
    } else {
      setTriviaFinished(true);
      setTriviaInProgress(false);
    }
  };

  const setAnswer = (question, answer) => {
    setTriviaResults([...triviaResults, { question, answer }]);
  };

  return (
    <Box className={classes.root}>
      {!triviaInProgress && !triviaFinished && (
        <TriviaPreview trivia={dailyTrivia} startTrivia={startTrivia} />
      )}
      {triviaInProgress && (
        <TriviaQuestion
          question={dailyTrivia.questions[currentQuestion]}
          setAnswer={setAnswer}
          nextQuestion={nextQuestion}
        />
      )}
      {triviaFinished && (
        <TriviaResults surveyId={dailyTrivia.id} results={triviaResults} />
      )}
    </Box>
  );
};
