import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'

import Rodape from './components/Footer'
import Cabecalho from './components/Header';

import Turmas from './components/Classes';
import Login from './components/Login';
import Logout from './components/Logout';
import RecoverPassword from './components/RecoverPassword'
import ResetPassword from './components/ResetPassword'

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Cabecalho/>

          <Route path="/" exact component={Login}/>
          <Route path="/classes" component={Turmas}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/recoverpassword" component={RecoverPassword}/>
          <Route path="/resetpassword" component={ResetPassword}/>

          <Rodape/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
