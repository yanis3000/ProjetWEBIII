import { useEffect, useState } from "react";
import '../css/index.css'; 
import { data } from "react-router";
import { useNavigate } from "react-router";


export default function Programs({}) {
    const [addProgramForm, setAddProgramForm] = useState({
        username : "",
        password : "",
    });
    const [connectionError, setConnectionError] = useState(null);
    const navigate = useNavigate();


    const handleAddProgram = e => {
        e.preventDefault(); // empeche d'envoyer le formulaire NO REFRESH
        let formData = new FormData();
        formData.append("username",  addProgramForm.username); // $_POST["name"]
        formData.append("password",  addProgramForm.password); // $_POST["code"]
        
        fetch("/api/login.php", {
            method : "POST",
            body : formData
        })
        .then (response => response.json())
        .then(data => {
            console.log(data);
            if (data.success === true) {
                localStorage.setItem("key", data.key);
                navigate("/form");
            } else {
                setConnectionError("Erreur : " + data.error);
               setAddProgramForm({
                    username: "",
                    password: ""
                });
            }
        })
    }

    return <>

        
        {connectionError && (<p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{connectionError}</p>)}

        <form className="rounded-lg"action="" onSubmit={e => handleAddProgram(e)}>
            <img className="image" src="../src/assets/STM.svg"></img>
            <div className="text"><input placeholder="Nom d'utilisateur" value={addProgramForm.username} onChange={(e) => setAddProgramForm({...addProgramForm, username : e.target.value})} type="text" name="username"></input></div>
            <div className="text"><input placeholder="Mot de passe" value={addProgramForm.password} onChange={(e) => setAddProgramForm({...addProgramForm, password : e.target.value})}  type="password" name="password"></input></div>
            <div className="validate"><input type="submit" value="Valider"></input></div>
        </form>

        
    </>

          
    
}