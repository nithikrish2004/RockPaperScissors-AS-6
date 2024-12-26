import './App.css'
import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    gameView: true,
    playerChoice: null,
    opponentChoice: null,
    result: '',
  }

  playGame = playerChoice => {
    const opponentChoice =
      choicesList[Math.floor(Math.random() * choicesList.length)]
    let result = ''

    if (playerChoice.id === opponentChoice.id) {
      result = 'IT IS DRAW'
    } else if (
      (playerChoice.id === 'ROCK' && opponentChoice.id === 'SCISSORS') ||
      (playerChoice.id === 'SCISSORS' && opponentChoice.id === 'PAPER') ||
      (playerChoice.id === 'PAPER' && opponentChoice.id === 'ROCK')
    ) {
      result = 'YOU WON'
    } else {
      result = 'YOU LOSE'
    }

    this.setState(prevState => ({
      score:
        result === 'YOU WON'
          ? prevState.score + 1
          : result === 'YOU LOSE'
          ? prevState.score - 1
          : prevState.score,
      playerChoice,
      opponentChoice,
      result,
      gameView: false,
    }))
  }

  renderHeader = () => {
    const {score} = this.state
    return (
      <div className="subContainer1">
        <h1 className="heading">Rock Paper Scissors</h1>
        <div className="ColorContainer">
          <p className="para">Score</p>
          <p className="para">{score}</p>
        </div>
      </div>
    )
  }

  renderFooter = () => (
    <div className="subContainer3">
      <Popup
        trigger={
          <button type="button" className="button2">
            Rules
          </button>
        }
        modal
      >
        {close => (
          <div className="rules">
            <button
              type="button"
              onClick={close}
              className="button2"
              style={{marginBottom: '10px'}}
            >
              <RiCloseLine />
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
              alt="rules"
            />
          </div>
        )}
      </Popup>
    </div>
  )

  renderGameView = () => (
    <div className="mainContainer">
      {this.renderHeader()}
      <div className="subContainer2">
        {choicesList.map(choice => (
          <button
            key={choice.id}
            type="button"
            data-testid={`${choice.id.toLowerCase()}Button`}
            onClick={() => this.playGame(choice)}
            className="button1"
          >
            <img src={choice.imageUrl} alt={choice.id} />
          </button>
        ))}
      </div>
      {this.renderFooter()}
    </div>
  )

  renderResultView = () => {
    const {playerChoice, opponentChoice, result} = this.state

    return (
      <div className="mainContainer">
        {this.renderHeader()}
        <div className="subContainer4">
          <div>
            <p className="heading">YOU</p>
            <img src={playerChoice.imageUrl} alt="your choice" />
          </div>
          <div>
            <p className="heading">OPPONENT</p>
            <img src={opponentChoice.imageUrl} alt="opponent choice" />
          </div>
        </div>
        <p className="heading" style={{marginTop: '20px'}}>
          {result}
        </p>
        <button
          type="button"
          onClick={() =>
            this.setState({
              gameView: true,
              playerChoice: null,
              opponentChoice: null,
            })
          }
          className="button2"
          style={{marginTop: '20px'}}
        >
          PLAY AGAIN
        </button>
        {this.renderFooter()}
      </div>
    )
  }

  render() {
    const {gameView} = this.state
    return (
      <div>{gameView ? this.renderGameView() : this.renderResultView()}</div>
    )
  }
}

export default App
