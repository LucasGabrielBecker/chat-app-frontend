/* eslint-disable react-hooks/exhaustive-deps */
import './index.css'
import { useState, useEffect, useRef } from 'react'
import socketIOClient from 'socket.io-client'
import { Card, Loader, Message } from 'components/'
import { ReactComponent as SendIcon } from 'assets/send.svg'
import { ReactComponent as ArrowUpIcon } from 'assets/arrow_up.svg'
import InfiniteScroll from 'react-infinite-scroll-component'

function App() {
  const ioServer = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`
  const [user, setUser] = useState({})
  const [chat, setChat] = useState([])
  const [loading, setloading] = useState(true)
  const socketRef = useRef(null)
  const inputRef = useRef(null)

  const firstName = user?.name?.first
  const lastName = user?.name?.last
  const username = `${firstName} ${lastName}`

  useEffect(() => {
    socketRef.current = socketIOClient(ioServer)
    socketRef.current.on('message', ({ name, message, created_at }) => {
      setChat([...chat, { name, message, created_at }])
    })
    scrollToBottom()
    return () => socketRef.current.disconnect()
  }, [chat])

  useEffect(() => {
    fetch('https://randomuser.me/api/', {})
      .then(res => {
        res.json().then(data => {
          setUser(data.results[0])
        })
      })
      .finally(() => {
        setloading(false)
      })
    inputRef?.current?.focus()
  }, [])

  if (loading) return <Loader />

  const spaceScrolledFromTop = () => {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  //defined as function for the lexical scoping
  function scrollToBottom() {
    window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' }) // 24 is the padding size
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const form = e.target
    const message = form.message.value
    if (!message.trim()) return
    const currentLocaleTimestamp = new Date().toLocaleTimeString(
      navigator.language
    )
    socketRef.current.emit('message', {
      name: username,
      message,
      created_at: currentLocaleTimestamp,
    })
    form.reset()

    inputRef.current?.focus()
  }

  const renderChat = () => {
    return chat.map(({ name, message, created_at }, index) => (
      <Message
        sender={name}
        currentUser={username}
        message={message}
        createdAt={created_at}
      />
    ))
  }

  return (
    <div className="bg-gray-200 bg-gradient-to-t from-gray-400 w-screen h-full min-h-screen">
      <Card user={user} />

      <form onSubmit={onMessageSubmit}>
        <div className="py-20 ">
          <InfiniteScroll dataLength={chat.length} hasMore={true}>
            {renderChat()}
          </InfiniteScroll>
        </div>
        <div className="fixed bottom-0 w-full flex z-10">
          {spaceScrolledFromTop() > 100 ? (
            <ArrowUpIcon
              onClick={scrollToTop}
              color="#6e6e6e"
              className="absolute bottom-20 right-2 w-5"
            />
          ) : null}
          <input
            ref={inputRef}
            type="text"
            className="w-full px-2 h-16 bg-white focus:outline-none focus:shadow-inner"
            name="message"
            autoComplete="off"
          />
          <button type="submit" className="display-none">
            <SendIcon
              className="transform rotate-90 w-6 -ml-8"
              color="#9c9c9c"
            />
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
