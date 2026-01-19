import { useState } from 'react'
import Recorder from './components/Recorder'
export default function App(){
  const [question,setQuestion]=useState('')
  const [answer,setAnswer]=useState('')
  const [nextQ,setNextQ]=useState('')
  async function start(){
    const res=await fetch('http://localhost:8000/interview/start',{method:'POST'})
    const j=await res.json()
    setQuestion(j.question)
  }
  async function onAudio(blob){
    const form=new FormData()
    form.append('audio_file',blob,'answer.wav')
    const res=await fetch('http://localhost:8000/interview/audio',{method:'POST',body:form})
    const j=await res.json()
    setAnswer(j.transcript)
    setNextQ(j.next_question)
  }
  return (<div style={{padding:20}}>
    <h1>Agentic Interview</h1>
    <button onClick={start}>Start Interview</button>
    <h2>Question:</h2><p>{question}</p>
    <Recorder onRecordComplete={onAudio}/>
    <h3>Transcript:</h3><pre>{answer}</pre>
    <h3>Next Question:</h3><p>{nextQ}</p>
  </div>)
}