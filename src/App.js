import './App.css';

function App() {

  return (
    <div>
        <div id="start-game-container">

        </div>

        <div id="start-input-container">
          <div class="text-center mt-3">
            <h1>Start Game</h1>
          </div>

          <div class="mt-3 mb-3">
            <input type="text" class="form-control" placeholder="Your Name" id="name-input" />
          </div>

          <div class="text-center">
            <button class="btn btn-success" id="start-game-btn">Start</button>
          </div>

          <div class="mt-3">
            <div class="text-center mb-2">
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

        <div id="end-game-container" style={{display: "none"}}>

        </div>

        <div id="end-input-container" style={{display: "none"}}>
          <div class="text-center mt-3">
            <h4>The Quiz Game Is Over!</h4>
          </div>

          <div class="mt-3 mb-3 text-center" id="total-scores-end">
            
          </div>

          <div class="text-center">
            <button class="btn btn-success" id="play-again-btn">Play Again</button>
          </div>

          <div class="mt-3">
            <div class="text-center mb-2">
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
            <div class="pt-1 pb-1 text-center text-light" id="quiz-header">
              <h3>Quiz Game</h3>
            </div>

            <div class="row quiz-row">
              <div class="col-sm-8 col-xl-9" id="quiz-col">

                <div id="answer-status" class="text-center" style={{display: "none"}}>
                  {/* <i class="fa fa-times text-danger answer-status-mark" aria-hidden="true"></i>
                  <i class="fa fa-check-circle text-success answer-status-mark" aria-hidden="true"></i>  */}
                  <span id="answer-icon-display"></span>
                  <span id="answer-status-display"></span>
                </div>

                <div class="text-light mb-1" id="quiz-timer">
                  <span id="timer-display">Reading Time Left: 10</span> second(s)

                  <div class="" id="tips">
                    Tips: The quicker you answer, the more scores you get.
                  </div>
                </div>

                <div class="box-design mt-2" id="question-container">
                  <div id="question-title" class="text-light">
                    1. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione qui tenetur consequuntur veritatis obcaecati, doloribus quidem? Inventore, minima placeat! Dignissimos necessitatibus sit cupiditate nesciunt ut, 
                    pariatur vero minus aliquam quaerat!
                  </div>

                  <div class="option">
                    <input type="checkbox" class="option-input" disabled="true" />
                    <span id="option-1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis?
                    </span>
                  </div>

                  <div class="option">
                    <input type="checkbox" class="option-input" disabled="true" />
                    <span id="option-2">              
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis?
                    </span>
                  </div>

                  <div class="option">
                    <input type="checkbox" class="option-input" disabled="true" />
                    <span id="option-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis?
                    </span>
                  </div>

                  <div class="option">
                    <input type="checkbox" class="option-input" disabled="true" />
                    <span id="option-4">              
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis?
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-sm-4 col-xl-3">
                <div class="box-design text-light" id="player-scores">
                  <div class="score-section">
                    Total Scores:
                    <span id="total-scores">0</span>
                  </div>

                  <div class="score-section">
                    Continuous Correct Answer:
                    <span id="continuous-correct">0</span>
                  </div>

                  <div class="score-section">
                    Total Correct Answer:
                    <span id="total-correct">0</span>
                  </div>
                </div>

                <div class="box-design text-light" id="player-ranking">
                  <div class="text-center" id="player-ranking-title">
                    Top 10 Players Ranking
                  </div>

                  <div class="row mt-1">
                    <div class="col text-center">
                      Name
                    </div>

                    <div class="col text-center">
                      Score
                    </div>

                  </div>

                  <div id="ranking-list">
                    {/* <div class="row mt-1">
                      <div class="col text-center">
                        John Doe
                      </div>

                      <div class="col text-center">
                        100
                      </div>
                    </div>  */}
                  </div>

                </div>

              </div>

            </div>
            
        </div>
    </div>
  );
}

export default App;
