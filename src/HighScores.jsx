import { useState, useEffect } from "react";
import { fetchRecords } from "./axios";
import HighScoresList from "./HighScoresList";
const HighScores = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchRecords();

      // sortRecords(res)
      setRecords(sortRecords(res));
    };
    fetch();
  }, []);

  const sortRecords = records => {
    return records.sort((a, b) => {
      return a.numberOfRolls - b.numberOfRolls;
    });
  };

  const highScoreRecords = records.map((record, index) => {
    return (
      <HighScoresList
        key={record.id}
        index={index + 1}
        numberOfRolls={record.numberOfRolls}
        totalTime={record.totalTime}
      />
    );
  });
  console.log(records);
  return (
    <div className="high-score-container">
      <h1>High Scores</h1>
      {highScoreRecords}
    </div>
  );
};

export default HighScores;
