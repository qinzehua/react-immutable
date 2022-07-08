import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';
import MyRouter from './routes/index.js';
import store from './store/index'


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <GlobalStyle></GlobalStyle>
          <IconStyle></IconStyle>
          {<MyRouter />}
        </div>
      </Router>
    </Provider>
  );
}

export default App;