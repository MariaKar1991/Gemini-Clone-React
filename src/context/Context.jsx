import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import runChat from '../config/gemini'

export const Context = createContext()

const ContextProvider = (props) => {
  const [input, setInput] = useState('')
  const [recentPrompt, setRecentPrompt] = useState('')
  const [prevPrompts, setPrevPrompts] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resultData, setResultData] = useState('')

  // Typing effect function
  const delayParameter = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord)
    }, 75 * index)
  }

  const newChat = () => {
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData('')
    setLoading(true)
    setShowResult(true)
    let response
    if (prompt !== undefined) {
      response = await runChat(prompt)
      setRecentPrompt(prompt)
    } else {
      setPrevPrompts((prev) => [...prev, input])
      setRecentPrompt(input)
      response = await runChat(input)
    }

    // Bold when ** is found
    let initialResponseArray = response.split('**')
    let newBoldResponse = ''
    for (let i = 0; i < initialResponseArray.length; i++) {
      if (i % 2 === 0) {
        newBoldResponse += initialResponseArray[i]
      } else {
        newBoldResponse += '<b>' + initialResponseArray[i] + '</b>'
      }
    }
    // Replace * with <br> tag
    let newLineResponse = newBoldResponse.split('*').join('</br>')

    // Typing effect
    let newResponseArray = newLineResponse.split(' ')
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i]
      delayParameter(i, nextWord + ' ')
    }

    setLoading(false)
    setInput('')
  }

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  }

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  )
}

// Prop types
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ContextProvider
