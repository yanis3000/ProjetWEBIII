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

  const [selfCard,setSelfCard] = useState(null) // pour mettre la carte que l'on va jouer
  const [selfCardOpp,setSelfCardOpp] = useState(null) // pour mettre la carte que l'on va jouer

  const stateTimeout = useRef(null);


    // const deconnectionGame = e => {
    //     e.preventDefault(); 
    // }

    
    const fetchOnGoingGame = (param, uid, targetuid) => {
      let formData = new FormData();
      formData.append("key",  localStorage.getItem("key"));
      formData.append("type", param);
      formData.append("uid", uid);
      formData.append("targetuid", targetuid);

      fetch("/api/gameOngoing.php", {
            method : "POST",
            body : formData
          })
       .then(response => response.json())
       .then(response => {

          console.log("ENVOI À API : ", { param, uid, targetuid });

          if (response.success == false){
            console.log(response.errorMessage)
          }
        }
       )   
    }

    const handleClick = (uid) => {
        setSelfCard(uid)
        console.log("Carte en cours : " + uid)
    }

    const handleClickOpp = (targetuid) => {
        setSelfCardOpp(targetuid)
        console.log("Carte de l'ennemi en cours : " + targetuid)
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
                uid: card.uid,
                id: card.id,
                cost: card.cost,
                hp: card.hp,
                atk: card.atk,
                mechanics: card.mechanics
              }));

              setHandCards(list);
            }

            if (response.result && response.result.board) {
              const list = response.result.board.map(card => ({
                uid: card.uid,
                id: card.id,
                cost: card.cost,
                hp: card.hp,
                atk: card.atk,
                mechanics: card.mechanics
              }));

              setBoardCards(list);

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
                uid: card.uid,
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
        {oppCards.map((cardOpp) => (
          <div key={cardOpp.uid} onClick={() => handleClickOpp(cardOpp.uid)}>
          <Cards description={cardOpp.mechanics.join("\n")} hp={cardOpp.hp} atk={cardOpp.atk} cost={cardOpp.cost}></Cards>
          </div>
        ))}
      </div>  
        {/* <h1 style={{color:"red"}}>Opposant</h1> */}

        <div className="deckOpp">
          {boardCards.map((cardBoard) => (
            <div key={cardBoard.uid} onClick={() => handleClick(cardBoard.uid)}>
            <Cards description={cardBoard.mechanics.join("\n")} hp={cardBoard.hp} atk={cardBoard.atk} cost={cardBoard.cost}></Cards>
            </div>
          ))}
        </div>  


          <div className="deckOpp">
            {handCards.map((cardHand) => (
              <div key={cardHand.uid} onClick={() => handleClick(cardHand.uid)}> {/*faire en sorte de faire*/}
              <Cards description={cardHand.mechanics.join("\n")} hp={cardHand.hp} atk={cardHand.atk} cost={cardHand.cost}></Cards>
              </div>
            ))}
          </div>  
          
                  <div className="deckOpp">

          {/* arrow function pour que ca le fasse que pendant que ca clique */}
        <div className="buttonControl">
          <MainButton onClick={() => fetchOnGoingGame("END_TURN", selfCard, selfCardOpp)}>END TURN</MainButton> 
          <MainButton onClick={() => fetchOnGoingGame("SURRENDER", selfCard, selfCardOpp)}>SURRENDER</MainButton>
          <MainButton onClick={() => fetchOnGoingGame("HERO_POWER",  selfCard, selfCardOpp)}>HERO POWER</MainButton>
          <MainButton onClick={() => fetchOnGoingGame("PLAY", selfCard, selfCardOpp)}>PLAY</MainButton>
          <MainButton onClick={() => fetchOnGoingGame("ATTACK", selfCard, selfCardOpp)}>ATTACK</MainButton>

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

      </div>

    </>
  );
}
