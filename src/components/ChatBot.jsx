import React, { useState } from 'react'

export default function ChatBot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I\'m SkillBot — how can I help today?' }
  ])
  const [text, setText] = useState('')

  const send = (e) =>{
    e && e.preventDefault()
    if(!text.trim()) return
    const userMsg = { from: 'user', text: text.trim() }
    setMessages(m => [...m, userMsg])
    setText('')
    // simple canned bot reply
    setTimeout(()=>{
      setMessages(m => [...m, { from: 'bot', text: 'Thanks — we will get back to you shortly (demo).' }])
    }, 700)
  }

  return (
    <div className={`chatbot ${open? 'open':''}`}>
      <button className="chatbot-toggle" onClick={()=>setOpen(o=>!o)} aria-label="Chat">
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((m, i)=> (
              <div key={i} className={`msg ${m.from}`}><div className="msg-text">{m.text}</div></div>
            ))}
          </div>
          <form className="chat-form" onSubmit={send}>
            <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message" />
            <button className="btn" type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  )
}
