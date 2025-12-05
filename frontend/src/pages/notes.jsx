import { useEffect, useState } from "react";
import Button from "../components/button"; 

import '../css/notes.css'; 


export default function Notes() {
    const [addNotes, setAddNotes] = useState(null);
    const [addDescription, setaddDescription] = useState(null);
    const [showNotes, setShowNotes] = useState([]);

    
    useEffect(() => {
        console.log("page chargée");

        fetch("/api/notes.php", {

        })
        .then((response) => response.json())
        .then((data) => {
            if (data.notes) {
                setShowNotes(data.notes)
            }

            console.log("Notes reçues :", data);
            
        })

        return () => {
            console.log("on quitte la page");
        };
    }, []);


    const handleAdd = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("note", addNotes)
        formData.append("description", addDescription)

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

    <video
        autoPlay
        muted
        loop
        className="video"
      >
          <source src="../src/images/Lights-Corners-Rotating-Light-Effect-Loop.mp4" type="video/mp4" />
          
      </video>

            <div className="flex flex-3 flex-row relative">
                    <form className="form-notes flex flex-col" onSubmit={handleAdd}>
                        <div>
                            <h3 className="text-white text-4xl text-center">Notes</h3>
                            <div className="text">
                                <input
                                    required
                                    placeholder="Notes"
                                    name="note"
                                    onChange={(e) => setAddNotes(e.target.value)} 
                                />
                            </div>
                            <div className="text">
                                <textarea
                                    required
                                    placeholder="Description"
                                    name="description"
                                    style={{height:"20vh", width:"20vw"}}
                                    onChange={(e) => setaddDescription(e.target.value)} 
                                />
                            </div>
                            

                            <div className="validate">
                                <button type="submit">Envoyer</button>
                            </div>
                        </div>
                    </form>

                <div className="flex flex-1 flex-col-reverse items-end">
                    {showNotes.map((_note) => (
                        <div key={_note.id} className="bg-black text-white p-15 m-6 rounded-lg shadow-lg border-4 border-gray-700 w-2xl">
                            <div className="flex justify-between">
                                <p>{_note.notes}</p>
                                <p>{_note.time} </p>
                            </div>
                            <p>{_note.description}</p>
                        </div>
                    ))} 
                </div>

            </div>
        </div>
    );
}