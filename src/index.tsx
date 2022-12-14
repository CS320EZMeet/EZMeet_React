import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.render(
  <div style={{height: "100%"}}>
    <QueryClientProvider client={queryClient}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
      <App/>
    </QueryClientProvider>
  </div> ,
    document.getElementById('root')
    
);
