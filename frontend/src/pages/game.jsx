import { useEffect, useState, useRef } from "react";
import '../css/global.css'; 
// import '../css/lobby.css'; 
import '../css/game.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 
import Cards from '../components/cards'; 
import UiElement from "../components/uiElement";

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
  const [selfCardOpp,setSelfCardOpp] = useState(0) // pour mettre la carte que l'on va jouer

  const [gameChatHeight, setGameChatHeight] = useState(50)

  // changer cela pour un let

  const stateTimeout = useRef(null);

  const gif = [
    "../src/images/gif/cost1.gif", // pour les cartes qui commencent a 0
    "../src/images/gif/cost1.gif",
    "../src/images/gif/cost2.gif",
    "../src/images/gif/cost3.gif",
    "../src/images/gif/cost4.gif",
    "../src/images/gif/cost5.gif",
    "../src/images/gif/cost6.gif",
    "../src/images/gif/cost7.gif",
    "../src/images/gif/cost8.gif",
    "../src/images/gif/cost9.gif",
    "../src/images/gif/cost10.gif"
  ]


    // const deconnectionGame = e => {
    //     e.preventDefault(); 
    // }

    const chatRef = useRef(null);
    
    const applyStylesOver = ()=> {
      setGameChatHeight(240)
      let styles = {
        backgroundColor : "rgba(255,255, 255, .4)",
        fontSize : "23px",
        hideIcons : false,
        inputBackgroundColor : "black",
        inputFontColor : "white",
        height : "240px",
        padding: "5px",
        border: "none",
        transition: "all is ease",      
        memberListFontColor : "#000000",
        memberListBackgroundColor : "white",
        hideScrollBar: true, // pour cacher le scroll bar
      }

      
      setTimeout(() => {
        chatRef.current.contentWindow.postMessage(JSON.stringify(styles), "*");	
    }, 100);
    }

    const applyStylesOut = ()=> {
      setGameChatHeight(50)
      let styles = {
        backgroundColor : "rgba(255,255, 255, .4)",
        fontSize : "23px",
        hideIcons : false,
        inputBackgroundColor : "black",
        inputFontColor : "white",
        height : "240px",
        padding: "5px",
        memberListFontColor : "none",
        memberListBackgroundColor : "none",
        hideScrollBar: true, // pour cacher le scroll bar
      }

      
      setTimeout(() => {
        chatRef.current.contentWindow.postMessage(JSON.stringify(styles), "*");	
    }, 100);
    }


    
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
          setSelfCardOpp(0) // pour faire en sorte que le hero soit attaque par defaut

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

    const handleClickOpp = (targetuid = 0) => {
        setSelfCardOpp(targetuid) // if turn is true
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

      <video
        autoPlay
        muted
        loop
        className="video"
      >
          <source src="../src/images/Lights-Corners-Rotating-Light-Effect-Loop.mp4" type="video/mp4" />
          
      </video>

      <div className="game-layout">
        <div className="info">
          <div>
            <p>{oppUsername}</p>
            <p>{oppHeroClass}</p>
          </div>
          <div className="elem-info-opp">
            <UiElement texte={oppHP} image='../src/images/heart-beats.svg'></UiElement>
            <UiElement texte={oppMP} image='../src/images/round-potion.svg'></UiElement>
            <UiElement texte={oppHandSize} image='../src/images/card-ace-diamonds.png'></UiElement>
            <UiElement texte={oppRemainingCardsCount} image='../src/images/cardboard-box.svg'></UiElement>
          </div>
        </div>

        <div className="deckOpp">
          {oppCards.map((cardOpp) => (
            <div key={cardOpp.uid} onClick={() => handleClickOpp(cardOpp.uid)}>
            <Cards image={gif[cardOpp.cost]} description={cardOpp.mechanics.join("\n")} hp={cardOpp.hp} atk={cardOpp.atk} cost={cardOpp.cost}></Cards>
            </div>
          ))}
        </div>  
          {/* <h1 style={{color:"red"}}>Opposant</h1> */}
          <div className="time">
              <UiElement texte={remainingTurnTime} image='../src/images/stopwatch.svg'></UiElement>  
          </div> 

          <div className="deckBoard">
            {boardCards.map((cardBoard) => (
              <div key={cardBoard.uid} onClick={() => {handleClick(cardBoard.uid); fetchOnGoingGame("ATTACK", selfCard, selfCardOpp);}}>
              <Cards image={gif[cardBoard.cost]} description={cardBoard.mechanics.join("\n")} hp={cardBoard.hp} atk={cardBoard.atk} cost={cardBoard.cost}></Cards>
              </div>
            ))}
          </div>  

          <div className="self-container">
            <div className="deckHand">
              {handCards.map((cardHand) => (
                <div key={cardHand.uid} onClick={() => {handleClick(cardHand.uid); fetchOnGoingGame("PLAY", selfCard, selfCardOpp);}}> {/*faire en sorte de faire*/}
                <Cards image={gif[cardHand.cost]} description={cardHand.mechanics.join("\n")} hp={cardHand.hp} atk={cardHand.atk} cost={cardHand.cost}></Cards>
                </div>
              ))}
            </div>  
            

            {/* arrow function pour que ca le fasse que pendant que ca clique */}
            {/* <div className="buttonControl"> */}
              {/* <MainButton onClick={() => fetchOnGoingGame("END_TURN", selfCard, selfCardOpp)}>END TURN</MainButton> 
              <MainButton onClick={() => fetchOnGoingGame("SURRENDER", selfCard, selfCardOpp)}>SURRENDER</MainButton>
              <MainButton onClick={() => fetchOnGoingGame("HERO_POWER",  selfCard, selfCardOpp)}>HERO POWER</MainButton>
              {/* <MainButton onClick={() => fetchOnGoingGame("PLAY", selfCard, selfCardOpp)}>PLAY</MainButton>
              <MainButton onClick={() => fetchOnGoingGame("ATTACK", selfCard, selfCardOpp)}>ATTACK</MainButton> */} 

            {/* </div> */}

        </div>
        
          <div className="info">
            <div>
              <MainButton onClick={() => fetchOnGoingGame("END_TURN", selfCard, selfCardOpp)}>END TURN</MainButton> 
              <MainButton onClick={() => fetchOnGoingGame("SURRENDER", selfCard, selfCardOpp)}>SURRENDER</MainButton>
              <MainButton onClick={() => fetchOnGoingGame("HERO_POWER",  selfCard, selfCardOpp)}>HERO POWER</MainButton>
            </div>

            <div className="elem-info-self">
              <UiElement texte={selfHP} image='../src/images/heart-beats.svg'></UiElement>
              <UiElement texte={selfMP} image='../src/images/round-potion.svg'></UiElement>
              <UiElement texte={selfRemainingCardsCount} image='../src/images/cardboard-box.svg'></UiElement>
            </div>

          </div>

          <div className="game-chat">
            <iframe scrolling="no" width={800} style={{border:"1px solid azure", borderRadius:"5px"}} height={gameChatHeight} ref={chatRef} onMouseOver={applyStylesOver} onLoad={applyStylesOut} onMouseOut={applyStylesOut} src={`https://magix.apps-de-cours.com/server/chat/${localStorage.getItem("key")}`}> </iframe>
          </div>


    </div>

    </>
  );
}
