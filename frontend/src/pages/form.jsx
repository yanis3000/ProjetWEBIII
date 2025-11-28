import { useEffect, useState } from "react";
import '../css/global.css'; 
import '../css/lobby.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 
import Cards from '../components/cards'; 
import MapButton from '../components/mapButton'; 
import UiElement from '../components/uiElement'; 
import heart from '../images/heart-beats.svg';
import marker from "../images/position-marker.svg";




export default function Form() {

    const navigate = useNavigate();

    const deconnectionGame = e => {

        e.preventDefault(); 
        let formData = new FormData();
        formData.append("key",  localStorage.getItem("key"));
        formData.append("type",  );
            
        fetch("/api/logout.php", {
            method : "POST",
            body : formData
            })
            .then (response => response.json())
            .then(data => {
              if (data.success) {
                console.log("Déconnexion réussie !");
                localStorage.removeItem("key");
                navigate("/");
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
              if (data.success) {
                console.log(data.type);
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
              if (data.success) {
                console.log(data.type);
                navigate("/game")
              }
              else {
              console.log(data.error); 
              }
          })
        
    }

  return (
    <>
      <p>Vous êtes enfin connecté !</p>

      <MainButton onClick={e => deconnectionGame(e)}> Déconnexion </MainButton>
      <MainButton onClick={e => pveGame(e, "TRAINING")}> PvE </MainButton>
      <MainButton onClick={e => pvpGame(e, "PVP")}> PvP </MainButton>

      <Cards texte="test" description="description"></Cards>

      <MapButton image="../src/images/position-marker.svg"/>

      <UiElement texte="test" image={heart} />



      <iframe width={700} height={240} src={`https://magix.apps-de-cours.com/server/chat/${localStorage.getItem("key")}`}> </iframe>

      <iframe width={700} height={240} src={`"https://magix.apps-de-cours.com/server/deck/${localStorage.getItem("key")}`}></iframe>
    </>
  );
}
