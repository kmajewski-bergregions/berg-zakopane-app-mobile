import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import App from './pages/App';
import 'mapbox-gl/dist/mapbox-gl.css';
import './i18n';
import reportWebVitals from './reportWebVitals';

const Loading = styled.div`
  position: absolute;
  width: 100vw;
  top: 50%;
  margin-right: auto;
  margin-left: auto;
  color: rgb(155, 157, 159);
  font-size: 36px;
  text-align: center;
`;

ReactDOM.render(
  <Suspense fallback={<Loading>Loading...</Loading>}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
