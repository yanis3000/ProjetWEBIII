import { useEffect, useState, useRef } from "react";
import '../css/global.css'; 
import '../css/lobby.css'; 
import '../css/game.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 
import Cards from '../components/cards'; 

export default function Game() {

  const [selfHeroClass, setHeroClass] = useState(null);
  const [remainingTurnTime, setRemainingTurnTime] = useState(null);

  const [handCards, setHandCards] = useState([]); // pour faire une liste nulle
  const [boardCards, setBoardCards] = useState([]); // pour faire une liste nulle


  // Tout ce qui est relatif à l'ennemi
  const [oppUsername,setOppUsername] = useState(null)
  const [oppHeroClass,setOppHeroClass] = useState(null)

  const [oppCards, setOppCards] = useState([]); // pour faire une liste nulle
  const [oppHP,setOppHP] = useState(null)
  const [oppMP,setOppMP] = useState(null)
  const [oppHandSize,setOppHandSize] = useState(null)
  const [oppRemainingCardsCount,setOppRemainingCardsCount] = useState(null)

  const [selfUsername,setSelfUsername] = useState(null)
  const [selfHP,setSelfHP] = useState(null)
  const [selfMP,setSelfMP] = useState(null)
  const [selfHandSize,setSelfHandSize] = useState(null)
  const [selfRemainingCardsCount, setSelfRemainingCardsCount] = useState(null)

  const stateTimeout = useRef(null);


    const deconnectionGame = e => {
        e.preventDefault(); 
    }


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
            setRemainingTurnTime(response.result.remainingTurnTime);
            setSelfUsername(response.result.username)
            setHeroClass(response.result.heroClass)
            setSelfHP(response.result.hp)
            setSelfMP(response.result.mp)
            setSelfHandSize(response.result.handSize)
            setSelfRemainingCardsCount(response.result.remainingCardsCount)
          }

          if (response.result && response.result.hand) {
              const list = response.result.hand.map(card => ({
                id: card.id,
                cost: card.cost,
                hp: card.hp,
                atk: card.atk,
                mechanics: card.mechanics
              }));

              setBoardCards(list); // <-- MISE À JOUR PROPRE

            }

            if (response.result && response.result.board) {
              const list = response.result.board.map(card => ({
                id: card.id,
                cost: card.cost,
                hp: card.hp,
                atk: card.atk,
                mechanics: card.mechanics
              }));

              setHandCards(list); // <-- MISE À JOUR PROPRE

            }

          if (response.result.opponent) {
            setOppUsername(response.result.opponent.username)
            setOppHeroClass(response.result.opponent.heroClass)
            setOppHP(response.result.opponent.hp)
            setOppMP(response.result.opponent.mp)
            setOppHandSize(response.result.opponent.handSize)
            setOppRemainingCardsCount(response.result.opponent.remainingCardsCount)
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


      {/* <h1 style={{color:"red"}} >Vous êtes dans la partie !</h1>
      <p>{heroClass}</p>
      <p>{remainingTurnTime}</p> */}

      <div className="infoOpp">
        <p>{oppUsername}</p>
        <p>{oppHeroClass}</p>
        <p>HP : {oppHP}</p>
        <p>MP : {oppMP}</p>
        <p>HandSize : {oppHandSize}</p>
        <p>RemainingCard : {oppRemainingCardsCount}</p>
      </div>

      <div className="deckOpp">
        {oppCards.map((card) => (
          <div key={card.id}>
          <Cards description={card.mechanics.join("\n")} hp={card.hp} atk={card.atk} cost={card.cost}></Cards>
          </div>
        ))}
      </div>  
        {/* <h1 style={{color:"red"}}>Opposant</h1> */}

        <div className="deckOpp">
          {boardCards.map((card) => (
            <div key={card.id}>
            <Cards description={card.mechanics.join("\n")} hp={card.hp} atk={card.atk} cost={card.cost}></Cards>
            </div>
          ))}
        </div>  

      <div className="deckOpp">
        <div className="deckOpp">
          {handCards.map((card) => (
            <div key={card.id}>
            <Cards description={card.mechanics.join("\n")} hp={card.hp} atk={card.atk} cost={card.cost}></Cards>
            </div>
          ))}
        </div>  
          
        <div className="buttonControl">
          <MainButton>END TURN</MainButton>
          <MainButton>SURRENDER</MainButton>
          <MainButton>HERO POWER</MainButton>
          <MainButton>PLAY</MainButton>
        </div>
      </div>

      <p>{remainingTurnTime}</p>

      <div className="infoOpp">
        <p>{selfUsername}</p>
        <p>{selfHeroClass}</p>
        <p>HP : {selfHP}</p>
        <p>MP : {selfMP}</p>
        <p>HandSize : {selfHandSize}</p>
        <p>RemainingCard : {selfRemainingCardsCount}</p>
      </div>

    </>
  );
}
