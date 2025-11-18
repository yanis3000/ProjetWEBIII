import '../css/global.css'

export default function MyCard({texte = "", description=""}) {
  return (
    <div className='container'>
      <div className='badge'>
        <p>67</p>
      </div>
      <div className='card'>
        <img 
          src={"https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg"} 
          alt={"Pas d'image assignée"} 
          style={{ width: '200px', height: '200px'}} />
        <p className='name'>{texte}</p>
        <p>{description}</p>

        <div className='state'>
          <p className='attack'>76</p>
          <p className='mana'>67</p>
        </div>

        <p></p>
      </div>
    </div>
  );
}
