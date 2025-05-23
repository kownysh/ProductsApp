import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@chakra-ui/react/preset'

createRoot(document.getElementById('root')).render(
  <ChakraProvider value={system}>
    <StrictMode>
      <App />
    </StrictMode>
  </ChakraProvider>
)
