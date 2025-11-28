export default function Notes() {

    const handleAddProgram = e => {
        e.preventDefault(); // empeche d'envoyer le formulaire NO REFRESH
        let formData = new FormData();
        formData.append("notes",  addProgramForm.notes); // $_POST["name"]
        
        fetch("/api/notes.php", {
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
                });
            }
        })
    }



    return(
        <div >
            <p>yeet</p>
        
        
            <div style={{position: "absolute", top: 0, right: 0, width: "100vw", height: "100vh", zIndex: formActivate}}>
                <form className="rounded-lg"action="" onSubmit={e => handleAddProgram(e)}>
                    <div className="text"><input placeholder="Notes" value={addProgramForm.notes} onChange={(e) => setAddProgramForm({...addProgramForm, notes : e.target.value})} type="text" name="notes"></input></div>
                <div className="validate"><input type="submit" value="Valider"></input></div>
                </form>
            </div>
        
        
        
        
        </div>
    )

}