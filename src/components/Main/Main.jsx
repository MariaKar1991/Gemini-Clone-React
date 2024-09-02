import Cards from '../Cards/Cards'
import Navbar from '../Navbar/Navbar'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { useContext } from 'react'

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context)

  return (
    <div className="main">
      <Navbar />
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                {/* TODO: Add username functionality */}
                <span>Hello, {localStorage.getItem('username') || 'User'}</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <Cards />
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        {/* MAIN BOTTOM */}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(event) => setInput(event.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here"
            />
            <div className="search-box-images-container">
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Artiani may generate inaccurate information, including about
            individuals, so it is crucial to carefully verify its responses.
            Your privacy and Artiani Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main
