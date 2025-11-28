import { useEffect, useState, useRef } from "react";
import Button from "../components/button";


export default function Notes() {

    const [notes, setNotes] = useState([]);
    // add notes () useSate()
    useEffect(() => {
        console.log("page chargée");
        let formData = new FormData();
        formData.append("notes",  notes);
        console.log("test1")

        fetch("/api/notes.php", {
            method : "POST",
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Produits reçus :", data);
            setNotes(data);
        })
        .catch((err) => {
        });

        return () => {
        console.log("on quitte la page");
        };
    }, []);

    useEffect(() => {
    }, [notes]);

    const handleAdd = () => {
        let name = prompt("Nom du produit");
        if (name) addAnswer([...notes, name]);
    };



    return(
        <div >
            <p>yeet</p>
            {notes.map((note) => (
            <div key={note} className="px-2 text-green-600">
                {note}
            </div>
            ))}

            <Button onClick={handleAdd} className="font-bold" texte="Add" />
        
        </div>
    )

}