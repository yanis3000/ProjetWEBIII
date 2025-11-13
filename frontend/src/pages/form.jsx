import { useEffect, useState } from "react";
import '../css/global.css'; 
import '../css/lobby.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 



export default function Form() {

    const navigate = useNavigate();

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

      const pveGame = e => {

        e.preventDefault(); 
        let formData = new FormData();
        formData.append("key",  localStorage.getItem("key"));
            
        fetch("/api/game.php", {
            method : "POST",
            body : formData
            })
            .then (response => response.json())
            .then(data => {
              if (data.success && data.type == "training") {
                console.log(data.type);
                navigate("/game")
              }
              else {
              console.log(data.error); 
              }
          })
        
    }

      const pvpGame = e => {

        e.preventDefault(); // empeche d'envoyer le formulaire NO REFRESH
        let formData = new FormData();
        formData.append("key",  localStorage.getItem("key")); // $_POST["name"]
            
        fetch("/api/game.php", {
            method : "POST",
            body : formData
            })
            .then (response => response.json())
            .then(data => {
              if (data.success && data.type == "pvp") {
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
      <MainButton onClick={e => pveGame(e)}> PvE </MainButton>
      <MainButton onClick={e => pvpGame(e)}> PvP </MainButton>


      <iframe width={700} height={240} src={`https://magix.apps-de-cours.com/server/chat/${localStorage.getItem("key")}`}> </iframe>

      <iframe src={`"https://magix.apps-de-cours.com/server/deck/${localStorage.getItem("key")}`}></iframe>
    </>
  );
}
