import cardData from '../../assets/cardData.json'
import './Cards.css'

const Cards = () => {
  return (
    <div className="cards">
      {cardData.map((card, index) => (
        <div className="card" key={index}>
          <p>{card.title}</p>
          <img src={card.imagePath} alt="cards icons" />
        </div>
      ))}
    </div>
  )
}

export default Cards
