import { useEffect, useState, useRef } from "react";
import '../css/global.css'; 
import '../css/lobby.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 


export default function Game() {

  const [heroClass, setHeroClass] = useState(null);
  const [remainingTurnTime, setRemainingTurnTime] = useState(null);
  const stateTimeout = useRef(null);
	
  const fetchState = () => {
      let formData = new FormData();
      formData.append("key",  localStorage.getItem("key"));

      fetch("/api/gameState.php", {
            method : "POST",
            body : formData
          })
       .then(response => response.json())
       .then(response => {
          setHeroClass(response.result.heroClass); 
          setRemainingTurnTime(response.result.remainingTurnTime); 
          console.log(response) // <-- État du jeu, ou message comme : LAST_GAME_WON
           stateTimeout.current = setTimeout(fetchState, 2000);
       });
  }

   useEffect(() => {
       stateTimeout.current = setTimeout(fetchState, 1000);
                 
       return () => {
         if (stateTimeout.current) clearTimeout(stateTimeout.current);
       }
   }, []);

    const navigate = useNavigate();

  return (
    <>
      <p>Vous êtes dans la partie !</p>
      <p>{heroClass}</p>
      <p>{remainingTurnTime}</p>

      <MainButton>END TURN</MainButton>
      <MainButton>SURRENDER</MainButton>
      <MainButton>HERO POWER</MainButton>
      <MainButton>PLAY</MainButton>
    </>
  );
}
