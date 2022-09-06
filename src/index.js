import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const main = async () => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      // Check if periodicSync is supported
      if ('periodicSync' in registration) {
        // Request permission
        const status = await navigator.permissions.query({name: 'periodic-background-sync'});    
        if (status.state === 'granted') {
          try {
            // Register new sync every 24 hours
            await registration.periodicSync.register('news', {          minInterval: 24 * 60 * 60 * 1000, 
              // 1 day        
            });        console.log('Periodic background sync registered!');
          } catch(e) {
            console.error(`Periodic background sync failed:\n${e}`);
          }
        }
      }
    }}
    main();