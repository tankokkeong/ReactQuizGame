import './App.css';
import { useState, useEffect } from 'react';
import { hashCode } from './pages/helper';
import { dbRef } from './firebaseConfig';
// Import the functions you need from the SDKs you need
import { getDatabase, ref, child, get, set, update
  , query, orderByChild, limitToLast, onValue } from "firebase/database";

const db = getDatabase();

function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userAction, setUserAction] = useState("None");
  const [checkboxEnabled, setCheckboxEnabled] = useState(false);
  const [authorizationMessage, setAuthorizationMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(true);
  const [scoreRanking, setScoreRanking] = useState([]);
  const [displayRankingBoard, setDisplayRankingBoard] = useState(true);
  const [option1, setOption1] = useState("Loading option...");
  const [option2, setOption2] = useState("Loading option...");
  const [option3, setOption3] = useState("Loading option...");
  const [option4, setOption4] = useState("Loading option...");
  const [questionText, setQuestionText] = useState("Loading question...");
  const [questionCount, setQuestionCount] = useState(0);
  const [answerCheck, setAnswerCheck] = useState(-1);
  const [readingTime, setReadingTime] = useState(0);
  const [answerTime, setAnswerTime] = useState(0);
  const [totalScores, setTotalScores] = useState(0);
  const [conCorrectAns, setConCorrectAns] = useState(0);
  const [totalCorrectAns, setTotalCorrectAns] = useState(0);
  const [userHighestScore, setUserHighestScore] = useState(0);
  var rankingCount = 0;


  const Authorization = async () => {

    if(username.length === 0 || password.length === 0){
      setAuthorizationMessage("You cannot leave empty fields!");
    }
    else{
      if(userAction === "Login"){
        //Check user exists
        await get(child(dbRef, `users/${username}`)).then((snapshot) => {
          if (snapshot.exists()) {
            if(username === snapshot.val().username && hashCode(password) === snapshot.val().password){
              setModalVisible(false);
              readQuestion();
            }
            else{
              setAuthorizationMessage("Invalid username or password!");
            }
          } 
          else {
            
          }  
        }).catch((error) => {
          console.error(error);
        });
      }
      else if(userAction === "New User"){
        //Check user exists
        await get(child(dbRef, `users/${username}`)).then((snapshot) => {

          if (snapshot.exists()) {
            setAuthorizationMessage("This username already exists!");
          } 
          else {
            set(ref(db, 'users/' + username), {
              continuousCorrect: 0,
              highestScore: 0,
              scores: 0,
              totalCorrect: 0,
              username: username,
              password: hashCode(password)
            })
            .then(() => {
              setAuthorizationMessage(<span className="text-success">User created successful! You may login now.</span>)
            })
            .catch((error) => {
              setAuthorizationMessage(error.code);
            });
          }
              
        }).catch((error) => {
          console.error(error);
        });
      }
    }
    
    console.log(username, password)
  };

  const readQuestion = async () => {
    if(displayRankingBoard){
      rankingBoard();
    }
  };

  const rankingBoard = () => {
    const rankingRef = query(ref(db, 'users/'), orderByChild("highestScore"), limitToLast(10));
    
    onValue(rankingRef, (snapshot) => {
      const tempRankingArr = [];

      snapshot.forEach((snapChild) => {
        const data = snapChild.val();
        tempRankingArr.push(data);
        // console.log(data)
      });
      tempRankingArr.reverse();
      setScoreRanking(tempRankingArr);
    });

    setDisplayRankingBoard(false);
  };


  useEffect(() => {

  });

  return (
    <div>
        {
          modalVisible && 
          <div>
            <div id="start-game-container"></div>

            <div id="start-input-container">
          
              <div className="mt-3">
                <div className="text-center mb-2">
                  <h3>Game Rules:</h3> 
                </div>

                <p>
                  1) There will be a total of 20 questions to answer, questions will be selected randomly from the database.
                </p>

                <p>
                  2) The scores that you get for every correct answer will be dependent on the time that you use, the quicker you answer, the more scores you will get from it.
                </p>

                <p>
                  3) The more you answer correctly continuously, the more points you can get for the next correct answer. Every extra continuous correct answer will add extra one mark for the next correct answer.
                </p>

                <p>
                  4) Any answer that is given later than 5 seconds, no scores will be given, but it will be counted as a continuous correct answer.
                </p>

              </div>

              {
                userAction === "None" &&
                <div className="text-center">
                  <button className="btn btn-primary mr-3" onClick={() => setUserAction("Login")}>Login</button>
                  <button className="btn btn-info" onClick={() => setUserAction("New User")}>New User</button>
                </div>
              }
              
              {
                userAction !== "None" &&
                <div className='mt-1 p-3'>

                  <div className="mb-3 pl-1">
                    {
                      userAction === "New User" ? <h4>User Details</h4> : <h4>Login</h4>
                    }             
                  </div>

                  <input type="text" className="form-control" placeholder="Username" onChange={e => setUsername(e.currentTarget.value)}/>
                  <input type="password" className="form-control mt-2" placeholder="Password"  onChange={e => setPassword(e.currentTarget.value)}/>
                  
                  <div className="mt-2 text-danger">
                    {authorizationMessage}
                  </div>

                  <div className="text-center mt-2">
                    <button className="btn btn-success" onClick={Authorization}>Confirm</button>
                    <button className="btn btn-secondary ml-2" onClick={() => setUserAction("None")}>Back</button>
                  </div>
                </div>
              }
              
            </div>
          </div>
        }

        <div id="end-game-container" style={{display: "none"}}></div>

        <div id="end-input-container" style={{display: "none"}}>
          <div className="text-center mt-3">
            <h4>The Quiz Game Is Over!</h4>
          </div>

          <div className="mt-3 mb-3 text-center" id="total-scores-end">
            
          </div>

          <div className="text-center">
            <button className="btn btn-success" id="play-again-btn">Play Again</button>
          </div>

          <div className="mt-3">
            <div className="text-center mb-2">
              <strong>Game Rules:</strong> 
            </div>

            <p>
              1) There will be a total of 20 questions to answer, questions will be selected randomly from the database.
            </p>

            <p>
              2) The scores that you get for every correct answer will be dependent on the time that you use, the quicker you answer, the more scores you will get from it.
            </p>

            <p>
              3) The more you answer correctly continuously, the more points you can get for the next correct answer. Every extra continuous correct answer will add extra one mark for the next correct answer.
            </p>

            <p>
              4) Any answer that is given later than 5 seconds, no scores will be given, but it will be counted as a continuous correct answer.
            </p>

          </div>
        </div>

        <div id="quiz-container">
            <div className="pt-1 pb-1 text-center text-light" id="quiz-header">
              <h3>Quiz Game</h3>
            </div>

            <div className="row quiz-row">
              <div className="col-sm-8 col-xl-9" id="quiz-col">

                <div id="answer-status" className="text-center" style={{display: "none"}}>
                  {/* <i className="fa fa-times text-danger answer-status-mark" aria-hidden="true"></i>
                  <i className="fa fa-check-circle text-success answer-status-mark" aria-hidden="true"></i>  */}
                  <span id="answer-icon-display"></span>
                  <span id="answer-status-display"></span>
                </div>

                <div className="text-light mb-1" id="quiz-timer">
                  {
                    readingTime !== 0 &&
                    <span>Reading Time Left: {readingTime} second(s)</span> 
                  }

                  {
                    answerTime !== 0 &&
                    <span>Answer Time Left: {answerTime} second(s)</span> 
                  }

                  <div className="" id="tips">
                    Tips: The quicker you answer, the more scores you get.
                  </div>
                </div>

                <div className="box-design mt-2" id="question-container">
                  <div id="question-title" className="text-light">
                    {questionCount + ". " + questionText}
                  </div>

                  <div className="option">
                    <input type="checkbox" className="option-input" disabled={checkboxEnabled} />
                    <span id="option-1">
                      {option1}
                    </span>
                  </div>

                  <div className="option">
                    <input type="checkbox" className="option-input" disabled={checkboxEnabled} />
                    <span id="option-2">              
                      {option2}
                    </span>
                  </div>

                  <div className="option">
                    <input type="checkbox" className="option-input" disabled={checkboxEnabled} />
                    <span id="option-3">
                      {option3}
                    </span>
                  </div>

                  <div className="option">
                    <input type="checkbox" className="option-input" disabled={checkboxEnabled} />
                    <span id="option-4">              
                      {option4}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-sm-4 col-xl-3">
                <div className="box-design text-light" id="player-scores">
                  <div className="score-section">
                    Total Scores:
                    <span className="pl-2">{totalScores}</span>
                  </div>

                  <div className="score-section">
                    Continuous Correct Answer:
                    <span className="pl-2">{conCorrectAns}</span>
                  </div>

                  <div className="score-section">
                    Total Correct Answer:
                    <span className="pl-2">{totalCorrectAns}</span>
                  </div>
                </div>

                <div className="box-design text-light" id="player-ranking">
                  <div className="text-center" id="player-ranking-title">
                    Top 10 Players Ranking
                  </div>

                  <div className="row mt-1">
                    <div className="col text-center">
                      Name
                    </div>

                    <div className="col text-center">
                      Score
                    </div>

                  </div>

                  <div id="ranking-list">
                    {/* <div className="row mt-1">
                      <div className="col text-center">
                        John Doe
                      </div>

                      <div className="col text-center">
                        100
                      </div>
                    </div>  */}
                    
                    {
                      scoreRanking.map((ranking) => {
                        rankingCount++;

                        return(
                          <div className="row mt-1">
                            <div className="col text-left ranking-username">
                              {rankingCount + ") " + ranking.username}
                            </div>

                            <div className="col text-center">
                              {ranking.highestScore}
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>

                </div>

              </div>

            </div>
            
        </div>
    </div>
  );
}

export default App;
