import { useEffect, useState, useRef } from "react";
import '../css/global.css'; 
// import '../css/lobby.css'; 
import '../css/game.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 
import Cards from '../components/cards'; 
import ButtonEnd from '../components/buttonEnd'; 
import UiElement from "../components/uiElement";

export default function Game() {

  const [selfHeroClass, setHeroClass] = useState(null);
  const [remainingTurnTime, setRemainingTurnTime] = useState(null);

  const [handCards, setHandCards] = useState([]); // pour faire une liste nulle
  const [boardCards, setBoardCards] = useState([]); // pour faire une liste nulle


  // Tout ce qui est relatif à l'ennemi
  const [oppUsername,setOppUsername] = useState(null)
  const [oppHeroClass,setOppHeroClass] = useState(null)

  const activeGame = useRef(false)
  const messageGame = useRef(null)
  const yourTurnGame = useRef(null)

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

  const [gameChatHeight, setGameChatHeight] = useState(60)



  // changer cela pour un let

  const stateTimeout = useRef(null);

  const gif = [
    "../src/images/image-gif/cost1.gif", // pour les cartes qui commencent a 0
    "../src/images/image-gif/cost1.gif",
    "../src/images/image-gif/cost2.gif",
    "../src/images/image-gif/cost3.gif",
    "../src/images/image-gif/cost4.gif",
    "../src/images/image-gif/cost5.gif",
    "../src/images/image-gif/cost6.gif",
    "../src/images/image-gif/cost7.gif",
    "../src/images/image-gif/cost8.gif",
    "../src/images/image-gif/cost9.gif",
    "../src/images/image-gif/cost10.gif"
  ]

  const png = [
    "../src/images/image-png/cost1.png",
    "../src/images/image-png/cost1.png",
    "../src/images/image-png/cost2.png",
    "../src/images/image-png/cost3.png",
    "../src/images/image-png/cost4.png",
    "../src/images/image-png/cost5.png",
    "../src/images/image-png/cost6.png",
    "../src/images/image-png/cost7.png",
    "../src/images/image-png/cost8.png",
    "../src/images/image-png/cost9.png",
    "../src/images/image-png/cost10.png"
  ]




    // const deconnectionGame = e => {
    //     e.preventDefault(); 
    // }

    const chatRef = useRef(null);
    
    const applyStylesOver = ()=> {
      setGameChatHeight(240)
      let styles = {
        memberListFontColor : "#FFFFFF",
        memberListBackgroundColor : "black",
        backgroundColor : "rgba(255,255, 255, 0.5)",
        fontSize : "20px",
        hideIcons : false,
        inputBackgroundColor : "rgba(255,255, 255, 0.5)",
        inputFontColor : "white",
        height : "240px",
        padding: "5px",
        border: "none",
        transition: "all is ease",      
        hideScrollBar: true, // pour cacher le scroll bar
      }

      setTimeout(() => {
        chatRef.current.contentWindow.postMessage(JSON.stringify(styles), "*");	
    }, 100);
    }

    const applyStylesOut = ()=> {
      setGameChatHeight(60)
      let styles = {
        memberListFontColor : "#000000",
        memberListBackgroundColor : "black",
        backgroundColor : "rgba(255,255, 255, 0)",
        fontSize : "20px",
        hideIcons : false,
        inputBackgroundColor : "rgba(255,255, 255, 0.5)",
        inputFontColor : "white",
        height : "240px",
        padding: "5px",
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
       .then(data => {

        data.response.message != null ? activeGame.current = false : activeGame.current = true 
        data.response.yourTurn == true ? yourTurnGame.current = true : yourTurnGame.current = false 

        messageGame.current = data.response.message

          if (data.response) {
            setRemainingTurnTime(data.response.remainingTurnTime);
            setSelfUsername(data.response.username)
            setHeroClass(data.response.heroClass)
            setSelfHP(data.response.hp)
            setSelfMP(data.response.mp)
            setSelfHandSize(data.response.handSize)
            setSelfRemainingCardsCount(data.response.remainingCardsCount)
          }

          if (data.response && data.response.hand) {
              const list = data.response.hand.map(card => ({
                uid: card.uid,
                id: card.id,
                cost: card.cost,
                hp: card.hp,
                atk: card.atk,
                mechanics: card.mechanics
              }));

              setHandCards(list);
            }

            if (data.response && data.response.board) {
              const list = data.response.board.map(card => ({
                uid: card.uid,
                id: card.id,
                cost: card.cost,
                hp: card.hp,
                atk: card.atk,
                mechanics: card.mechanics
              }));

              setBoardCards(list);

            }

          if (data.response.opponent) {
            setOppUsername(data.response.opponent.username)
            setOppHeroClass(data.response.opponent.heroClass)
            setOppHP(data.response.opponent.hp)
            setOppMP(data.response.opponent.mp)
            setOppHandSize(data.response.opponent.handSize)
            setOppRemainingCardsCount(data.response.opponent.remainingCardsCount)
          }

          if (data.response.opponent && data.response.opponent.board) {
              const list = data.response.opponent.board.map(card => ({
                uid: card.uid,
                id: card.id,
                cost: card.cost,
                hp: card.hp,
                atk: card.atk,
                mechanics: card.mechanics
              }));

              setOppCards(list); // <-- MISE À JOUR PROPRE
          }



          setRemainingTurnTime(data.response.remainingTurnTime); 
          console.log(data.response)
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

  if (activeGame.current) { return (
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
            <div key={cardOpp.uid} onClick={() => {handleClickOpp(cardOpp.uid)}} style={{borderBottom: selfCardOpp == cardOpp.uid ? "2px solid darkred" : null, borderRadius:"16px", transitionDuration:"200ms"}}>
            <Cards gif={gif[cardOpp.cost]} png={png[cardOpp.cost]} description={cardOpp.mechanics.join("\n")} hp={cardOpp.hp} atk={cardOpp.atk} cost={cardOpp.cost}></Cards>
            </div>
          ))}
        </div>  

          

          {/* <h1 style={{color:"red"}}>Opposant</h1> */}
          <div className="time">
              <UiElement texte={remainingTurnTime} image='../src/images/stopwatch.svg'></UiElement>  
          </div> 

          <div className="deckBoard">
            {boardCards.map((cardBoard) => (
              <div key={cardBoard.uid} onClick={() => {handleClick(cardBoard.uid); fetchOnGoingGame("ATTACK", selfCard, selfCardOpp)}} style={{borderBottom: selfCard == cardBoard.uid ? "2px solid darkblue" : null, borderRadius:"16px", transitionDuration:"200ms"}}>
              <Cards gif={gif[cardBoard.cost]} png={png[cardBoard.cost]} description={cardBoard.mechanics.join("\n")} hp={cardBoard.hp} atk={cardBoard.atk} cost={cardBoard.cost} color="sepia(100%) saturate(300%) brightness(60%) hue-rotate(180deg)"></Cards>
              </div>
            ))}
          </div>  


          <div className="self-container" style={{backgroundColor: yourTurnGame.current ? "rgb(0, 255, 0, 0.2)" : "rgb(255, 0, 0, 0.2)"}}>
                <div className="deckHand">
                  {handCards.map((cardHand) => (
                    <div key={cardHand.uid} onClick={() => {handleClick(cardHand.uid); fetchOnGoingGame("PLAY", selfCard, selfCardOpp);}} style={{borderBottom: selfCard == cardHand.uid ? "2px solid darkblue" : null, borderRadius:"16px", transitionDuration:"200ms"}}> {/*faire en sorte de faire*/}
                    <Cards gif={gif[cardHand.cost]} png={png[cardHand.cost]} description={cardHand.mechanics.join("\n")} hp={cardHand.hp} atk={cardHand.atk} cost={cardHand.cost} color="sepia(100%) saturate(300%) brightness(60%) hue-rotate(180deg)"></Cards>
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
              <ButtonEnd onClick={() => fetchOnGoingGame("END_TURN", selfCard, selfCardOpp)} color="blue">END TURN</ButtonEnd> 
              <ButtonEnd onClick={() => fetchOnGoingGame("SURRENDER", selfCard, selfCardOpp)} color="indigo">SURRENDER</ButtonEnd>
              <ButtonEnd onClick={() => fetchOnGoingGame("HERO_POWER",  selfCard, selfCardOpp)} color="teal">HERO POWER</ButtonEnd>
            </div>

            <div className="elem-info-self">
              <UiElement texte={selfHP} image='../src/images/heart-beats.svg'></UiElement>
              <UiElement texte={selfMP} image='../src/images/round-potion.svg'></UiElement>
              <UiElement texte={selfRemainingCardsCount} image='../src/images/cardboard-box.svg'></UiElement>
            </div>

          </div>

          <div className="game-chat">
            <iframe scrolling="no" width={700} placeholder="Chat" style={{border:"1px solid azure", borderRadius:"5px"}} height={gameChatHeight} ref={chatRef} onMouseOver={applyStylesOver} onLoad={applyStylesOut} onMouseOut={applyStylesOut} src={`https://magix.apps-de-cours.com/server/chat/${localStorage.getItem("key")}`}> </iframe>
          </div>


    </div>

    </>
  ); }

  else { return( 
    <>


    <div className="flex flex-col h-screen my-auto items-center justify-center bgimg bg-cover text-7xl">
      <p>{messageGame.current}</p>

      {console.log(messageGame.current)}

      <img src={messageGame.current === "Vous avez gagné la partie !" ? "../src/images/grey-9026.gif" : null}
      ></img>

      <MainButton onClick={()=> navigate("/form")}>Retour au menu lobby</MainButton>
    </div>
    {/* {messageGame.current == "Vous avez perdu la partie"  (
        
    )

    } */}


  </>
  )}

}
