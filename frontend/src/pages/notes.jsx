import { useEffect, useState } from "react";
import Button from "../components/button";

export default function Notes() {
    const [addNotes, setAddNotes] = useState(null);
    const [showNotes, setShowNotes] = useState([]);

    
    useEffect(() => {
        console.log("page chargée");

        fetch("/api/notes.php", {
            method: 'POST'
        })
        .then((response) => response.json())
        .then((data) => {

        if (data.notes) {

        }

            console.log("Notes reçues :", data);
            
        })
        .catch((error) => {
            console.error("Erreur:", error);
        });

        return () => {
            console.log("on quitte la page");
        };
    }, []);

    const handleAdd1 = () => {
        let noteText = prompt("Entrez votre note:");
        if (noteText) {
            let formData = new FormData();
            formData.append("note", noteText);
            
            fetch("/api/notes.php", {
                method: 'POST',
                body: formData
            })
            .then((response) => response.json())
            .then((data) => {
                
                if (data && data.notes) {
                    setNotes(data.notes);
                }
                
                console.log("Note ajoutée:", data);
            })
            .catch((error) => {
                console.error("Erreur:", error);
            });
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("note", addNotes)

        fetch("/api/notes.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.notes) {
                setShowNotes(data.notes)
            }
        });
    };


    return(
        <div>
            <div>
                <form onSubmit={handleAdd}>
                    <div className="answer">
                        <strong>Vous avez la réponse? Aidez-le !</strong>

                        <div className="text">
                            <input
                                required
                                placeholder="Votre réponse"
                                name="note"
                                value={addNotes} onChange={(e) => setAddNotes(e.target.value)} type="text"
                            />
                        </div>

                        <div className="send-btn">
                            <button type="submit">Envoyer</button>
                        </div>
                    </div>
                </form>
            </div>

            {showNotes.map((note) => (
                <div key={note.id} className="px-2 text-green-600">
                    {note.id + note.notes}
                </div>
            ))} 

{/* 
            {showNotes.map((note) => (
                <div key={note.id} className="px-2 text-green-600">
                    {note.id + note.notes}
                </div>
            ))} */}
            {/* <Button onClick={handleAdd1} className="font-bold" texte="Add" /> */}
        </div>
    );
}