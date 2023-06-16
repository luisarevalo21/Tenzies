/* eslint-disable react/prop-types */
const HighScoresList = props => {
  return (
    <div className="high-scores-list">
      <p>{props.index} </p>
      <p>Number of Rolls: {props.numberOfRolls} </p>
      <p>Total Time: {props.totalTime}</p>
    </div>
  );
};

export default HighScoresList;
