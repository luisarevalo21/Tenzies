import { useState, useEffect, useRef } from "react";
import { postNewRecord } from "./axios";
import { nanoid } from "nanoid";

import Confetti from "react-confetti";
import Timer from "./Timer";
import Die from "./Die";

const Tenzies = () => {
  const [dice, setDice] = useState(allNewDie());
  const [tenzies, setTenzies] = useState(false);
  const [numberOfRolls, setNumberOfRolls] = useState(0);
  // const [records, setRecords] = useState([]);
  //   const [topScore, setTopScore] = useState("");

  const ref = useRef(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await fetchRecords();

  //     // console.log(data);
  //     setRecords(data);
  //   }
  //   fetchData();
  //   // setRecords(res);
  // }, []);
  // console.log(records);

  useEffect(() => {
    // console.log("dice changed");
    // console.log(ref.current.totalTime);

    // console.log(ref.current.totla;
    // const { hours, minutes, seconds, millseconds } = ref.current.totalTime;
    // console.log(millseconds);
    // const timestamp = new Date(hours + minutes + seconds + millseconds).toDateString();
    // console.log("time", timestamp);
    // fetchRecords();
    // postNewRecord({ numberOfRolls: numberOfRolls, time: 20 });
    // console.log("ref is", ref);
    const firstDie = dice[0].value;
    const res = dice.every(die => {
      return die.isHeld && firstDie === die.value;
    });

    // console.log("res is", res);

    if (res) {
      setTenzies(res);
      ref.current.stopTimer();
      const totalTime = ref.current.totalTime;
      // setIsRunning(false);
      console.log("You won!");
      postNewRecord({ numberOfRolls, totalTime });
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
      setNumberOfRolls(0);
      ref.current.resetTimer();
      // setIsRunning(true);
      // setResetTriggered(true);

      return;
    }
    setNumberOfRolls(prevCounter => {
      return prevCounter + 1;
    });
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
    ref.current.startTimer();
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
  };

  const diceElements = dice.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
  ));

  return (
    <div className="container">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </p>

        <Timer ref={ref} />
        <p className="counter-paragraph">
          Current number of rolls: <span className="counter">{numberOfRolls}</span>
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </div>
  );
};

export default Tenzies;
