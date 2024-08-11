'use client'
import { Box, Button, Stack, TextField, IconButton, Typography } from '@mui/material'
import { ThumbUp, ThumbDown, ExitToApp } from '@mui/icons-material'
import { useRef, useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import '@fontsource/inter'
import '@fontsource/rubik'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Rubik',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

export default function Home() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState([]) 
  const router = useRouter() 

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return
    setIsLoading(true)
    setMessage('')

    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([...messages, { role: 'user', content: message }]),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const text = decoder.decode(value, { stream: true })
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ]
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
      ])
    }
    setIsLoading(false)
  }

  const handleFeedback = (messageIndex, feedbackType) => {
    const updatedFeedback = [...feedback]
    updatedFeedback[messageIndex] = feedbackType
    setFeedback(updatedFeedback)
    console.log(`Feedback for message ${messageIndex}: ${feedbackType}`)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: 'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)',
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
      >
        <Box
          width="100%"
          bgcolor="primary.main"
          color="white"
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Headstarter AI ChatBot</Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6">{session?.user?.name || 'User'}</Typography>
            <IconButton color="inherit" onClick={handleSignOut}>
              <ExitToApp />
            </IconButton>
          </Stack>
        </Box>
        <Stack
          direction={'column'}
          width="500px"
          height="700px"
          border="1px solid #ccc"
          borderRadius={4}
          p={2}
          spacing={3}
          bgcolor="white"
          boxShadow={3}
          sx={{
            overflowY: 'auto',
          }}
        >
          <Stack
            direction={'column'}
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                alignItems={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
                transition="all 0.3s ease"
              >
                <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? 'primary.main'
                      : 'secondary.main'
                  }
                  color="white"
                  borderRadius={16}
                  p={3}
                  mb={1}
                >
                  {message.content}
                </Box>
                {message.role === 'assistant' && (
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={() => handleFeedback(index, 'thumbs up')}
                      color={feedback[index] === 'thumbs up' ? 'primary' : 'default'}
                    >
                      <ThumbUp />
                    </IconButton>
                    <IconButton
                      onClick={() => handleFeedback(index, 'thumbs down')}
                      color={feedback[index] === 'thumbs down' ? 'primary' : 'default'}
                    >
                      <ThumbDown />
                    </IconButton>
                  </Stack>
                )}
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
          <Stack direction={'row'} spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </Stack>
        </Stack>
        <Box
          width="100%"
          bgcolor="primary.main"
          color="white"
          p={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={2}
        >
          <Typography variant="body2">© 2024 Headstarter AI. All rights reserved.</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
