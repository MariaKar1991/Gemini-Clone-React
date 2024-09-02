import {
  GoogleGenerativeAI,
  // HarmCategory,
  // HarmBlockThreshold,
} from '@google/generative-ai'
import apiKey from '/apiKey'

const MODEL_NAME = 'gemini-1.5-flash'
export const API_KEY = apiKey

// Error handling for missing API key
if (!API_KEY) {
  throw new Error(
    'Missing API key in apiKey.js file. Please set apiKey="YOUR_KEY"',
  )
}

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY)
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
  })

  // const generationConfig = {
  //   temperature: 1,
  //   topP: 0.95,
  //   topK: 64,
  //   maxOutputTokens: 8192,
  //   responseMimeType: 'text/plain',
  // }

  // TODO: Define AND Use Safety Settings
  // const safetySettings = {
  //   // Block content that violates Google's AI Principles.
  // }

  const chatSession = model.startChat({
    // safetySettings,
    history: [],
  })

  const result = await chatSession.sendMessage(prompt)
  const response = result.response
  console.log(response.text())
  return response.text()
}

export default runChat
