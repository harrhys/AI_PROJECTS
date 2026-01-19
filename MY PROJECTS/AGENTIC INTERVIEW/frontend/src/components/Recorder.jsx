import { useEffect, useRef } from 'react'
export default function Recorder({onRecordComplete}){
  const mediaRef=useRef(null), chunksRef=useRef([])
  useEffect(()=>()=>{if(mediaRef.current)mediaRef.current.stream.getTracks().forEach(t=>t.stop())},[])
  async function startRecording(){
    const stream=await navigator.mediaDevices.getUserMedia({audio:true})
    const media=new MediaRecorder(stream)
    mediaRef.current=media; chunksRef.current=[]
    media.ondataavailable=e=>chunksRef.current.push(e.data)
    media.onstop=()=>{const blob=new Blob(chunksRef.current,{type:'audio/wav'}); onRecordComplete && onRecordComplete(blob)}
    media.start()
  }
  function stopRecording(){mediaRef.current && mediaRef.current.stop()}
  return <div><button onClick={startRecording}>Start Recording</button><button onClick={stopRecording}>Stop & Send</button></div>
}