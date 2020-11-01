import React from "react";
import QuestionCard from "./components/QuestionCard";
import ErrorBoundary from "./components/ErrorBoundary";
import ScoreCard from "./components/ScoreCard";

const questions = require("./data/Apprentice_TandemFor400_Data.json");
const roundOneQuestions = questions.slice(0, 10);
const roundTwoQuestions = questions.slice(11, 21);

class App extends React.Component {
  constructor() {
    super();
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.state = {
      currentQuestion: 0,
      score: 0,
      showScore: false,
      round1Questions: roundOneQuestions,
      round2Questions: roundTwoQuestions,
      round1: true,
      hasError: false,
    };
  }

  handleSubmitAnswer = (e, isCorrect) => {
    if (isCorrect) {
      e.target.className = "correct";
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
    } else {
      e.target.className = "incorrect";
    }
    if (this.state.round1) {
      setTimeout(() => this.changeQuestion(e, this.state.round1Questions), 500);
    } 
  };

  changeQuestion = (e, questions) => {
    e.target.className = ' ';
    if (this.state.currentQuestion <= questions.length) {
      console.log("length of questions " + questions.length);
      this.setState(() => ({
        currentQuestion: this.state.currentQuestion + 1,
      }));
    } else {
      this.setState(() => ({
        currentQuestion: 0,
        showScore: true,
        round1: false
      }));
    }
  };
  nextRound = (e) => {
    this.changeQuestion(e, this.state.round2Questions);
    this.setState({
      currentQuestion: 0,
      showScore: false,

    })
  }

  render() {
    if (!this.state.showScore) {
      return (
        <ErrorBoundary>
          <QuestionCard
            round1={questions}
            round2={this.state.round2Questions}
            firstRound={this.state.round1}
            showScore={this.state.showScore}
            currentQ={this.state.currentQuestion}
            submit={this.handleSubmitAnswer}
          />
        </ErrorBoundary>
      );
    } else {
      return (
        <ErrorBoundary>
          <ScoreCard
            score={this.state.score}
            questions={questions}
            startRound={this.nextRound}
          />
        </ErrorBoundary>
      );
    }
  }
}

export default App;
