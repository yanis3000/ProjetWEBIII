import { useEffect, useState } from "react";
import Button from "../components/button";
import '../css/global.css'
import '../css/deck.css'


export default function Deck() {


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


            <iframe id="mon-iframe" style={{height:"100vh", width:"100vw", fontSize:"10px"
 }} src={`https://magix.apps-de-cours.com/server/deck/${localStorage.getItem("key")}`}></iframe>        
        </div>
    );
}