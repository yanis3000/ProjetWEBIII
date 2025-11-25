import { useEffect, useState, useRef } from "react";
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

    const leftDoor = useRef(null);
    const rightDoor = useRef(null);
    
    const posLeft = useRef(0);
    const posRight = useRef(0);
    const [formActivate, setFormActivate] = useState(3);
    
    const speed = 1;
    
    useEffect(() => {
        document.body.style.overflowX = "hidden";
    
        let leftTick;
        let rightTick;
    
        const tickAnimateLeft = () => {
            posLeft.current -= speed;

            if (posLeft.current < -200) {
                setFormActivate(10)
            }

            leftDoor.current.style.left = posLeft.current + "px";
                leftTick = requestAnimationFrame(tickAnimateLeft);
            };
    
        const tickAnimateRight = () => {
            posRight.current -= speed;
            rightDoor.current.style.left = -posRight.current + "px";
            rightTick = requestAnimationFrame(tickAnimateRight);
        };

        tickAnimateLeft();
        tickAnimateRight();

        return () => {
            document.body.style.overflowX = "auto"; // pas avoir de deroulement
            cancelAnimationFrame(leftTick);
            cancelAnimationFrame(rightTick);
        };
        }, []);
            
    const imgStyle = {
        width: "100vw",
        height: "100vh",
        objectFit: "cover"
    };
    

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

        <div>        
            <img 
                src="./src/images/2907_final.png" 
                style={{ position: "absolute", zIndex: 6, top: 0, left: 0, ...imgStyle }}
            />

            <div 
                ref={leftDoor}
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 5,
                }}
            >
                <img src="./src/images/2907_left.png" style={imgStyle} />
            </div>

                <div style={{position: "absolute", top: 0, right: 0, width: "100vw", height: "100vh", zIndex: formActivate}}>
                    <form className="rounded-lg"action="" onSubmit={e => handleAddProgram(e)}>
                        <img className="image" src="../src/assets/STM.svg"></img>
                        <div className="text"><input placeholder="Nom d'utilisateur" value={addProgramForm.username} onChange={(e) => setAddProgramForm({...addProgramForm, username : e.target.value})} type="text" name="username"></input></div>
                        <div className="text"><input placeholder="Mot de passe" value={addProgramForm.password} onChange={(e) => setAddProgramForm({...addProgramForm, password : e.target.value})}  type="password" name="password"></input></div>
                        <div className="validate"><input type="submit" value="Valider"></input></div>
                    </form>
                </div>

            <div 
                ref={rightDoor}
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 5,
                }}
            >
                <img src="./src/images/2907_right.png" style={imgStyle} />
            </div>
        </div>

    </>

          
    
}