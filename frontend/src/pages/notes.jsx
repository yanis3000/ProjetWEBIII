import { useEffect, useState } from "react";
import Button from "../components/button";

export default function Notes() {
    const [notes, setNotes] = useState(null);

    useEffect(() => {
        console.log("page chargée");

        fetch("/api/notes.php", {
            method: 'POST'
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Notes reçues :", data);
        })
        .catch((error) => {
            console.error("Erreur:", error);
        });

        return () => {
            console.log("on quitte la page");
        };
    }, []);

    const handleAdd = () => {
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

    return(
        <div>
            {notes.map((note) => (
                <div key={note.id} className="px-2 text-green-600">
                    {note.id + note.notes}
                </div>
            ))}
            <Button onClick={handleAdd} className="font-bold" texte="Add" />
        </div>
    );
}