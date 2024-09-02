import { assets } from '../../assets/assets'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className="nav">
      <p>Artiani</p>
      <img className="avatar" src={assets.user_icon} alt="user avatar icon" />
    </div>
  )
}

export default Navbar
