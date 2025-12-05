import { useEffect, useState, useRef} from "react";
import Button from "../components/button";
import '../css/global.css'
import '../css/deck.css'


export default function Deck() {

        const chatRef = useRef(null)
        
        const applyStyles = ()=> {
          let styles = {
            memberListFontColor : "#FFFFFF",
            memberListBackgroundColor : "black",
            backgroundColor : "rgba(0,0,0, 0.5)",
            fontSize : "20px",
            fontColor: "white",
            hideIcons : false,
            fontGoogleName : "Ubuntu Mono",        
            inputBackgroundColor : "rgba(0,0,0, 0.5)",
            inputFontColor : "white",
            height : "240px",
            padding: "5px",
            border: "10px solid white",
            hideScrollBar: true,
          }
    
          
          setTimeout(() => {
            chatRef.current.contentWindow.postMessage(JSON.stringify(styles), "*");	
        }, 100);
        }


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


            <iframe id="deck" ref={chatRef} onLoad={applyStyles} style={{height:"100vh", width:"100vw", fontSize:"10px"
            }} src={`https://magix.apps-de-cours.com/server/deck/${localStorage.getItem("key")}`}></iframe>        
        </div>
    );
}