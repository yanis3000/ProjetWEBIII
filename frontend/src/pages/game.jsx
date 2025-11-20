import { useEffect, useState, useRef } from "react";
import '../css/global.css'; 
import '../css/lobby.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 


export default function Game() {

  const [heroClass, setHeroClass] = useState(null);
  const [remainingTurnTime, setRemainingTurnTime] = useState(null);



  // Tout ce qui est relatif à l'ennemi
  const [oppUsername,setOppUsername] = useState(null)
  const [oppHeroClass,setOppHeroClass] = useState(null)
  
  const [oppID,setOppID] = useState(null)
  const [oppCost,setOppCost] = useState(null)
  const [oppHP,setOppHP] = useState(null)
  const [oppAttack,setOppAttack] = useState(null)
  const [oppMechanics,setOppMechanics] = useState(null)

  const [oppCards, setOppCards] = useState([]);



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

          if (response.result) {
            setHeroClass(response.result.heroClass); 
          }

          if (response.result.opponent) {
            setOppUsername(response.result.opponent.username)
            setOppHeroClass(response.result.opponent.heroClass)
          }

          if (response.result.opponent && response.result.opponent.board) {
              const list = response.result.opponent.board.map(card => ({
                id: card.id,
                cost: card.cost,
                hp: card.hp,
                atk: card.atk,
                mechanics: card.mechanics
              }));

              setOppCards(list); // <-- MISE À JOUR PROPRE
          }

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
      <h1 style={{color:"red"}} >Vous êtes dans la partie !</h1>
      <p>{heroClass}</p>
      <p>{remainingTurnTime}</p>

      <h1 style={{color:"red"}}>Opposant</h1>

      <p>{oppUsername}</p>
      <p>{oppHeroClass}</p>

      {oppCards.map((card) => (
        <div key={card.id}>
          <p>ID : {card.id}</p>
          <p>ATK : {card.atk}</p>
          <p>HP : {card.hp}</p>
          <p>Cost : {card.cost}</p>
          <p>Mechanics : {card.mechanics.join("\n")}</p>
        </div>
      ))}
      





      <MainButton>END TURN</MainButton>
      <MainButton>SURRENDER</MainButton>
      <MainButton>HERO POWER</MainButton>
      <MainButton>PLAY</MainButton>
    </>
  );
}
