import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDie());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    console.log("dice changed");

    const firstDie = dice[0].value;
    const res = dice.every(die => {
      return die.isHeld && firstDie === die.value;
    });

    console.log("res is", res);

    if (res) {
      setTenzies(res);
      console.log("You won!");
    }
  }, [dice]);

  function allNewDie() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return { value: Math.floor(Math.random() * 6 + 1), isHeld: false, id: nanoid() };
  }

  const rollDice = () => {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDie());
      return;
    }
    setDice(prevDice =>
      prevDice.map(dice => {
        if (!dice.isHeld) {
          return generateNewDie();
        }
        return dice;
      })
    );
  };
  // console.log(dice);
  const holdDice = id => {
    console.log("held triggered");
    console.log("id", id);

    setDice(prevDice => {
      return prevDice.map(
        die => (die.id === id ? { ...die, isHeld: !die.isHeld } : die)
        // if (die.id === id) {
        //   return { ...die, isHeld: !die.isHeld };
        // } else {
        //   return die;
        // }
      );
    });

    // setWon(checkIfWon());
  };

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  // const { width, height } = us;
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
