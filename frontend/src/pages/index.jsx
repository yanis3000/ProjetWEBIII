import { useEffect, useState } from "react";
import '../css/index.css'; 

export default function Programs({}) {
    const [addProgramForm, setAddProgramForm] = useState({
        name : "",
        code : "",
    });
    const [programList, setProgramList] = useState(null);
    const [programType, setProgramType] = useState("techniques");

    // Code exécuté à chaque changement de valeur pour la variable programType
    // useEffect(() => {
    //     if (programType == "techniques") {
    //         fetch("/api/programs.php")
    //         .then(response => response.json())
    //         .then(data => {
    //             setProgramList(data);
    //         })
    //     }
    // }, [programType])


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
    }

    return <>

        {/* className="border-t-2 border-blue-500 mt-2 pt-2"  */}
            <form className="rounded-lg"action="" onSubmit={e => handleAddProgram(e)}>
                {/* <h1>MÉTRO</h1> */}
                <img className="image" src="../src/assets/STM.svg"></img>
                <div className="text"><input placeholder="Nom d'utilisateur" value={addProgramForm.username} onChange={(e) => setAddProgramForm({...addProgramForm, username : e.target.value})} type="text" name="username"></input></div>
                <div className="text"><input placeholder="Mot de passe" value={addProgramForm.password} onChange={(e) => setAddProgramForm({...addProgramForm, password : e.target.value})}  type="password" name="password"></input></div>
                <div className="validate"><input type="submit" value="Valider"></input></div>
            </form>

            {/* className ="border border-gray-300" value="" onChange={(e) => setAddProgramForm({...addProgramForm, name : e.target.value})} */}
        </>

          
    
}