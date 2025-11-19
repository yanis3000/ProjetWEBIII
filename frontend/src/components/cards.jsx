import '../css/global.css'

export default function MyCard({texte = "", description="", hp="", atk="", cost=""}) {
  return (
    <div className='container'>
      <div className='badge'>
        <p>{hp}</p>
      </div>
      <div className='card'>
        <img 
          src={"https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"} // assigner une image apres 
          alt={"Pas d'image assignée"} 
          style={{ width: '200px', height: '200px'}} />
        <p className='name'>{texte}</p>
        <p className="description">{description}</p>

        <div className='state'>
          <p className='attack'>{atk}</p>
          <p className='cost'>{cost}</p>
        </div>

        <p></p>
      </div>
    </div>
  );
}
