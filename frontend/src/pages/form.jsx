import { useEffect, useState, useRef } from "react";
import '../css/global.css'; 
import '../css/lobby.css'; 
import '../css/test.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 
import ButtonEnd from '../components/buttonEnd'; 
import Cards from '../components/cards'; 
import MapButton from '../components/mapButton'; 
import UiElement from '../components/uiElement'; 
import heart from '../images/heart-beats.svg';
import marker from "../images/position-marker.svg";




export default function Form() {

    const navigate = useNavigate();

    const chatRef = useRef(null);
    
    const applyStyles = ()=> {
      let styles = {
        memberListFontColor : "#FFFFFF",
        memberListBackgroundColor : "black",
        
        backgroundColor : "rgba(0,0,0, 0.5)",
        fontSize : "20px",
        fontColor: "white",
        hideIcons : false,
        fontGoogleName : "Ubuntu Mono",        
        inputBackgroundColor : "rgba(0,0,0, 0.5)",
        inputFontColor : "white",
        height : "240px",
        padding: "5px",
        border: "10px solid white",
        hideScrollBar: true,
      }

      
      setTimeout(() => {
        chatRef.current.contentWindow.postMessage(JSON.stringify(styles), "*");	
    }, 100);
    }

    const deconnectionGame = e => {

        e.preventDefault(); 
        let formData = new FormData();
        formData.append("key",  localStorage.getItem("key"));
            
        fetch("/api/logout.php", {
            method : "POST",
            body : formData
            })
            .then (response => response.json())
            .then(data => {
              if (data.response.success) {
                navigate("/");
                console.log("Déconnexion réussie !");
                localStorage.removeItem("key");
              }
              else {
              console.log("Erreur de déconnexion"); 
              }
          })
        
    }

      const pveGame = (e, type) => {

        e.preventDefault(); 
        let formData = new FormData();
        formData.append("key",  localStorage.getItem("key"));
        formData.append("type", type)
            
        fetch("/api/game.php", {
            method : "POST",
            body : formData
            })
            .then (response => response.json())
            .then(data => {
              if (data.response.success) {
                console.log(data.response.type);
                navigate("/game")
              }
              else {
              console.log(data.error); 
              }
          })
        
    }

      const pvpGame = (e, type) => {

        e.preventDefault(); // empeche d'envoyer le formulaire NO REFRESH
        let formData = new FormData();
        formData.append("key",  localStorage.getItem("key")); // $_POST["name"]
        formData.append("type", type)
            
        fetch("/api/game.php", {
            method : "POST",
            body : formData
            })
            .then (response => response.json())
            .then(data => {
              if (data.response.success) {
                console.log(data.response.type);
                navigate("/game")
              }
              else {
              console.log(data.error); 
              }
          })
        
    }

  return (
    <>


      <div className='background'>
          <MapButton className="logout" onClick={e => deconnectionGame(e)}/>
          <MapButton className="pratique" onClick={e => pveGame(e, "TRAINING")}/>
          <MapButton className="jouer" onClick={e => pvpGame(e, "PVP")}/>
          <MapButton className="deck" onClick={ () => navigate("/deck")}/>
          <MapButton className="chat" onClick={ () => navigate("/notes")}/>
      </div>

      {/* <MainButton onClick={e => deconnectionGame(e)}> Déconnexion </MainButton>
      <MainButton onClick={e => pveGame(e, "TRAINING")}> PvE </MainButton>
      <MainButton onClick={e => pvpGame(e, "PVP")}> PvP </MainButton>

      <Cards image="../src/images/gif/cost10.gif" texte="test" description="description"></Cards>

      <MapButton image="../src/images/position-marker.svg"/>

      <UiElement texte="test" image={heart} />

      <ButtonEnd children={"test"} color="indigo"></ButtonEnd> */}


      <div style={{position:"absolute", zIndex:2, bottom:"5vh", right:"2vw"}}>
        <iframe scrolling="no" width={700} height={240} ref={chatRef} onLoad={applyStyles} src={`https://magix.apps-de-cours.com/server/chat/${localStorage.getItem("key")}`}> </iframe>
      </div>
    </>
  );
}
