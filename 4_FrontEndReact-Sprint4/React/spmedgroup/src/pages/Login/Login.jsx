import { useState, useEffect } from "react";
import axios from "axios"
import { parseJwt, usuarioAutenticado } from '../../services/Auth';
import { Link, useHistory } from 'react-router-dom';
import "../../assets/css/style.css"

export default function Login() 
{
    const [ email, setEmail ] = useState('')
    const [ senha, setSenha ] = useState('')
    const [ erroMensagem, setErroMensagem ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    let history = useHistory();

    function efetuaLogin(event)
    {
        event.PeventDefault();

        setErroMensagem('')
        setIsLoading(true)

        axios.post('http://localhost:5000/api/Login', {
            email : email,
            senha : senha
        })
        .then((resposta) => 
        {
            if (resposta.status === 200) 
            {
                localStorage.setItem('usuario-login', resposta.data.token);

                setIsLoading(false);

                let base64 = localStorage.getItem('usuario-login').split('.')[1];

                console.log(base64);

                //2 = médico, 1 = paciente, adm = 3
                switch (parseJwt().role) {
                    case '1':
                        history.push("/minhasConsultas")
                        console.log('estou logado: ' + usuarioAutenticado());
                        break;
                    case '2':
                        history.push("/consultasMed")
                        console.log('estou logado: ' + usuarioAutenticado());
                        break;
                    case '3':
                        history.push("/consultasAdm")
                        break;
                
                    default:
                        break;
                }
            }
        })
        .catch(() => {
            setIsLoading(false)
            setErroMensagem('E-mail e/ou senha inválidos!')
        })
    }

    return (
        <div>
            <header><div className="header_container-login"><img  className="logoHeader" src="../../assets/imagens/image1" alt="Logo SpMedGroup" /></div></header>
            <div className="login-Fundo">
                <div className="form-login">
                    <form onSubmit={efetuaLogin}>
                        <div className="form-login">
                            <h2>Login</h2>
                            <div className="login-inputs">
                                <input type="text" placeholder="Email" value={email} onChange={(campo) => setEmail(campo.target.value)}/>
                                <input type="password" placeholder="Senha" value={senha} onChange={(campo) => setSenha(campo.target.value)}/>
                            </div>

                            {
                                isLoading === false &&
                                <button type="submit" className="botaoPadrao botaoLogar">Logar</button>
                            }

                            {
                                isLoading === true &&
                                <button type="submit" className="botaoPadrao botaoLogar" disabled>Carregando...</button>
                            }

                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}