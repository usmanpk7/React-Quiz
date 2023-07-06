import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question  from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState={
  questions:[],
  status:'loading',
  currentIndex:0,
  answer:null,
  points:0,
  highScore:0,
  secondsRemaining:null,
};

const secs_per_ques=30;

function reducer(state, action){

  switch(action.type){
    case "dataReceived":
      return {...state, questions:action.payload, status:"ready"}
      case "dataFailed":
        return {...state, status:"error"}
        case "start":
         return {...state, status:"active", secondsRemaining: state.questions.length * secs_per_ques}
         case "newAnswer":
          const question = state.questions[state.currentIndex];
         return {
          ...state, 
          answer:action.payload, 
          points:action.payload === question.correctOption ? state.points + question.points : state.points,
        }
        case "nextQuestion":
          return{...state, currentIndex: state.currentIndex + 1, answer:null}
          case "finished":
            return{
              ...state,
              status:'finished',
              highScore:state.points > state.highScore ? state.points : state.highScore,
            }
            case "restart":
              return {
                ...initialState,
                questions:state.questions,
                status:'restart',
              }
              case "tick":
                return{
                   ...state,
                   secondsRemaining:state.secondsRemaining - 1,
                   status: state.secondsRemaining === 0 ? 'finished' : state.status,
                }
        default:
      throw new Error("Unkown Action");
  }
}
function App() {

  const [state, dispatch]=useReducer(reducer,initialState);
  const {questions, status, currentIndex, answer, points, highScore, secondsRemaining}=state;
 
  const noOfQuestions=questions.length;
  const maxPossiblePoints=questions.reduce((prev,q)=> prev+ q.points, 0)

  function handleShowQuestions(){
    dispatch({type:"start"})
  }

  useEffect(function(){
    fetch('http://localhost:9000/questions').then((res)=>res.json())
    .then((data)=>dispatch({type:"dataReceived", payload:data}))
    .catch((err)=>dispatch({type:'dataFailed'}));
  },[])
  return (
    <div className="app">
    <Header />

    <Main>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen noOfQuestions={noOfQuestions} onShowQuestions={handleShowQuestions} />}
      {status === "active" && 
      <>
      <Progress noOfQuestions={noOfQuestions} currentIndex={currentIndex} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
      <Question 
      question={questions[currentIndex]} 
      dispatch={dispatch} answer={answer} />
      <Footer>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
       <NextButton dispatch={dispatch} answer={answer} currentIndex={currentIndex} noOfQuestions={noOfQuestions} />
       </Footer>
       </>
       }

       {status === "finished" && <FinishedScreen maxPossiblePoints={maxPossiblePoints} points={points} highScore={highScore} dispatch={dispatch}/>}
      
      {status === "restart" && <StartScreen noOfQuestions={noOfQuestions} onShowQuestions={handleShowQuestions}  />}
     
    </Main>
    </div>
  );
}

export default App;
