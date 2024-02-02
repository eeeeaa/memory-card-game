/* eslint-disable react/prop-types */
import "../styles/App.css";
import { getRandomImages } from "../data/dataFetcher";
import { useState, useEffect } from "react";

/** Memory card game
 * - fetch data from api
 * - map data into array of card model (card consist of:)
 * - populate a grid of card with that model
 * - when click card -> save card info in state
 * - when click another card -> check if same as in info
 * - if it is -> user gain score
 * - if it isn't -> set that card in state, reset score, and set best score
 */

function Navbar({ score, bestScore }) {
  return (
    <div className="nav-bar">
      <div className="nav-header">
        <div className="nav-title">Memory Sprite</div>
        <div className="nav-subtitle">
          Click only on unique sprites to score!
        </div>
      </div>
      <div className="nav-score">Current score: {score}</div>
      <div className="nav-best-score">Best score: {bestScore}</div>
    </div>
  );
}

function CardItem({
  item,
  score,
  setScore,
  setBestScore,
  savedIds,
  setSavedIds,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const animationCheck = imageLoaded ? "fade-in" : "";
  const handleClick = () => {
    if (savedIds.includes(item.id)) {
      setBestScore(score);
      setScore(0);
      setSavedIds([]);
    } else {
      setScore(score + 1);
      setSavedIds([...savedIds, item.id]);
    }
  };
  return (
    <div className="card-item">
      <img
        className={"card-img" + " " + animationCheck}
        src={item.imageUrl}
        alt={item.id}
        onClick={handleClick}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    setItems(getRandomImages(20));
  }, [score]);

  return (
    <>
      <div className="content">
        <Navbar score={score} bestScore={bestScore} />
        <div className="card-list">
          {items.map((item) => (
            <CardItem
              key={item.id}
              item={item}
              score={score}
              setScore={setScore}
              setBestScore={setBestScore}
              savedIds={savedIds}
              setSavedIds={setSavedIds}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
