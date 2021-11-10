import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from './services/Auth';

import './index.css';
import reportWebVitals from './reportWebVitals';
import NotFound from './pages/notFound/NotFound';
import ConsultasPacientes from './pages/consultasPac/ConsultasPac';
import ConsultasMedicos from './pages/consultasMed/ConsultasMed';
import ConsultasAdm from './pages/consultasAdm/ConsultasAdm';
import Login from './pages/Login/Login';

//2 = médico, 1 = paciente, adm = 3

const PermissaoAdm = ({component : Component}) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '3' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoMedico = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoPaciente = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);
   

const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <PermissaoPaciente path="/minhasConsultas" component={ConsultasPacientes} />
        <PermissaoMedico path="/consultasMed" component={ConsultasMedicos} />
        <PermissaoAdm path="/consultasAdm" component={ConsultasAdm} />
        <Route path="/notFound" component={NotFound}/>
        <Redirect to="/notFound"/>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
