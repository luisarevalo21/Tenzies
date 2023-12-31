// eslint-disable-next-line react/prop-types
const Die = ({ value, holdDice, isHeld }) => {
  // const styles = {
  //   backgroundColor: isHeld ? "#59e391" : "",
  // };
  return (
    <div className={`die-face ${isHeld ? "held" : ""}`} onClick={holdDice}>
      <h2 className="die-number">{value}</h2>
    </div>
  );
};

export default Die;
