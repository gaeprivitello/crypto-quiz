import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Answer } from "./components/Answer";
import { Timer } from "./components/Timer";

export const TriviaQuestion = ({ question, setAnswer, nextQuestion }) => {
  const [currentAnswer, setCurrentAnswer] = useState(null);

  useEffect(() => {
    setCurrentAnswer(null);
  }, [question]);

  const onNextQuestion = () => {
    if (currentAnswer) {
      setAnswer(question, currentAnswer);
    }
    nextQuestion();
  };

  return (
    <>
      <Typography variant="h3">{question.text}</Typography>
      <Card sx={{ width: "80%", maxWidth: 345, marginTop: 2 }}>
        <CardMedia
          component="img"
          height={"100"}
          image={question.image}
          alt={`question-${question.id}`}
        />
        <CardContent>
          <div>
            {question.options.map((a) => {
              return (
                <Answer
                  key={`${question.id}-${a.id}`}
                  answer={a}
                  currentAnswer={currentAnswer}
                  setCurrentAnswer={setCurrentAnswer}
                />
              );
            })}
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={onNextQuestion} size="medium">
            Next
          </Button>
        </CardActions>
        <Timer
          questionId={question.id}
          lifetimeSeconds={question.lifetimeSeconds}
          timeOut={onNextQuestion}
        />
      </Card>
    </>
  );
};
