import { useEffect, useState } from "react";


    const handleAddProgram = e => {
        e.preventDefault(); // empeche d'envoyer le formulaire NO REFRESH
        let formData = new FormData();
        formData.append("name",  addProgramForm.name); // $_POST["name"]
        formData.append("code",  addProgramForm.code); // $_POST["code"]
        
        fetch("/api/add-programList.php", {
            method : "POST",
            body : formData
        })
        .then (response => response.json())
        .then(data => {
            // reponse du serveur, affiche un message de succes / erreur

        })
    }


export default function Index() {
  return  <>


          <form className="border-t-2 border-blue-500 mt-2 pt-2" action="" onSubmit={e => handleAddProgram(e)}>
            <div><input className ="border border-gray-300" value="" onChange={(e) => setAddProgramForm({...addProgramForm, name : e.target.value})} type="text" name="nom-programme"></input></div>
            <div><input className="border border-gray-300" value="" onChange={(e) => setAddProgramForm({...addProgramForm, code : e.target.value})}  type="text" name="code-programme"></input></div>
          </form>

          </>

          
}