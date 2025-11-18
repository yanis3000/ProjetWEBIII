import '../css/global.css'

export default function MyCard({texte = ""}) {
  return (
    <div className='card'>
      <img 
        src={"https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"} 
        alt={"Pas d'image assignée"} 
        style={{ width: '200px', height: '200px'}} />
      <p>{texte}</p>
    </div>
  );
}
