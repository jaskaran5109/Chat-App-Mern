import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import ChatProvider from './Context/ChatProvider';
import { BrowserRouter } from 'react-router-dom';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);
