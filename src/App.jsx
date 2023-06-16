import "./App.css";
import HighScores from "./HighScores";
// import Die from "./Die";
// import { nanoid } from "nanoid";
// import Timer from "./Timer";
// import Confetti from "react-confetti";
// import { fetchRecords, postNewRecord } from "./axios";

// import
// import Home from "./Home";
import Navbar from "./Navbar";
import Tenzies from "./Tenzies";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tenzies />}></Route>
        <Route path="/topscores" element={<HighScores />} />
      </Routes>
    </>
  );
}

export default App;
