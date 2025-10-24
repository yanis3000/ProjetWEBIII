import { useEffect, useState } from "react";
import '../css/index.css'; 


    const handleAddProgram = e => {
        e.preventDefault(); // empeche d'envoyer le formulaire NO REFRESH
        let formData = new FormData();
        formData.append("name",  addProgramForm.name); // $_POST["name"]
        formData.append("mdp",  addProgramForm.mdp); // $_POST["code"]
        
        fetch("/api/add-programList.php", {
            method : "POST",
            body : formData
        })
        .then (response => response.json())
        .then(data => {
            // reponse du serveur, affiche un message de succes / erreur
            console.log("test")
        })
    }


export default function Index() {
  return  <>

        {/* className="border-t-2 border-blue-500 mt-2 pt-2"  */}
            <form className="rounded-lg"action="" onSubmit={e => handleAddProgram(e)}>
                {/* <h1>MÉTRO</h1> */}
                <img class="image" src="../src/assets/STM.svg"></img>
                <div class="text"><input placeholder="Nom d'utilisateur" type="text" name="nom-programme"></input></div>
                <div class="text"><input placeholder="Mot de passe" value="" onChange={(e) => setAddProgramForm({...addProgramForm, code : e.target.value})}  type="text" name="mdp"></input></div>
                <div class="validate"><input type="submit" value="Valider"></input></div>
            </form>

            {/* className ="border border-gray-300" value="" onChange={(e) => setAddProgramForm({...addProgramForm, name : e.target.value})} */}
        </>

          
}