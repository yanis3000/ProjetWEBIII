import { useEffect, useState } from "react";
import '../css/global.css'; 
import '../css/lobby.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 



export default function Game() {

    const fetchState = () => {
        fetch("/api/game-state.php")
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

    const handleAddProgram = e => {

    e.preventDefault(); // empeche d'envoyer le formulaire NO REFRESH
    let formData = new FormData();
    formData.append("key",  localStorage.getItem("key")); // $_POST["name"]
        
    fetch("/api/logout.php", {
        method : "POST",
        body : formData
        })
        .then (response => response.json())
        .then(data => {
          if (data.success) {
            console.log("Déconnexion réussie !");
            localStorage.removeItem("key");
            navigate("/")
          }
          else {
          console.log("Erreur de déconnexion"); 
          }
      })
      
  }



  return (
    <>
      <p>Vous êtes dans la partie !</p>

      <MainButton onClick={e => handleAddProgram(e)}>  </MainButton>

    </>
  );
}
