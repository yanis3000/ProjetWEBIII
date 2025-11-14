import { useEffect, useState, useRef } from "react";
import '../css/global.css'; 
import '../css/lobby.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 


export default function Game() {

  const stateTimeout = useRef(null);
	
  const fetchState = () => {
      fetch("/api/gameState.php")
       .then(response => response.json())
       .then(response => {
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

    const handleGameAction = e => {

    e.preventDefault(); // empeche d'envoyer le formulaire NO REFRESH
    let formData = new FormData();
    formData.append("key",  localStorage.getItem("key")); // $_POST["name"]
        
    fetch("/api/gameOngoing.php", {
        method : "POST",
        body : formData
        })
        .then (response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("key", data.key);
                console.log("Retour au lobby")
                navigate("/form");
            }
            

        })
      
  }

  return (
    <>
      <p>Vous êtes dans la partie !</p>

    </>
  );
}
