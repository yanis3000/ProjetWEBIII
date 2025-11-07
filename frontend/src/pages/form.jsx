import { useEffect, useState } from "react";
import '../css/global.css'; 
import '../css/lobby.css'; 
import { data, useNavigate } from "react-router"; 
import MainButton from '../components/button'; 



export default function Form() {

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
      <p>Vous êtes enfin connecté !</p>

      <MainButton onClick={e => handleAddProgram(e)}> Déconnexion </MainButton>

    </>
  );
}
