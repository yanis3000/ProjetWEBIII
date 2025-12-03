import '../css/global.css'
import { useEffect, useState, useRef } from "react";


export default function MyCard({gif, png, description="", hp="", atk="", cost="", color="sepia(100%) saturate(300%) brightness(80%) hue-rotate(300deg)"}) {

  const [photo, setPhoto] = useState(png)

  return (
    <div className='container'
      onMouseOver={() => setPhoto(gif)}
      onMouseOut={() => setPhoto(png)}
    >
      <div className='badge'>
        <p>{hp}</p>
      </div>
      <div className='card'>
        <div className="card-img-container">
          <img 
            src={photo}
            alt={"Pas d'image assignée"} 
            style={{filter:color}}
          ></img>
        </div>

        <p className="description">{description}</p>
        <div className='state'>
          <p className='attack'>{atk}</p>
          <p className='cost'>{cost}</p>
        </div>
      </div>

    </div>
  );
}
