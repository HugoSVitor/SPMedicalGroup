import { useState } from "react";
import axios from "axios"
import { parseJwt,usuarioAutenticado } from "../../services/Auth.jsx";
import { Link, useHistory } from 'react-router-dom';
import "../../assets/css/style.css"
import Footer from "../../components/footer/footer.js"
import logo from '../../assets/imagens/image1.png'

export default function Login() 
{
    const [ email, setEmail ] = useState( 'adm@gmail.com' )
    const [ senha, setSenha ] = useState('adm123')
    const [ erroMensagem, setErroMensagem ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    let history = useHistory();

    function efetuaLogin(event)
    {
        event.preventDefault();

        setErroMensagem('')
        setIsLoading(true)

        axios.post('http://192.168.5.66:5000/api/Login', {
            email : email,
            senha : senha
        })
        .then((resposta) => 
        {
            if (resposta.status === 200) 
            {
                console.log(resposta);
                localStorage.setItem('usuario-login', resposta.data.token);

                setIsLoading(false);

                let base64 = localStorage.getItem('usuario-login').split('.')[1];

                console.log(base64);
                console.log(parseJwt());
                console.log(parseJwt().role);
                //1 = paciente, 2 = médico, adm = 3
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
                        console.log('estou logado: ' + usuarioAutenticado());
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
            <header><div className="header_container-login"><Link to="/"/><img  className="logoHeader" src={logo} alt="Logo SpMedGroup" /></div></header>
            <div className="login-Fundo">
                <div className="form-login">
                    <form onSubmit={efetuaLogin}>
                        <div className="form-login">
                            <h2>Login</h2>
                            <div  className="login-inputs">
                                <input type="text" placeholder="Email" value={email} onChange={(campo) => setEmail(campo.target.value)}/>
                                <input type="password" placeholder="Senha" value={senha} onChange={(campo) => setSenha(campo.target.value)}/>
                                <p>{erroMensagem}</p>
                            </div>
                            

                            {
                                isLoading === false &&
                                <button type="submit" disabled={
                                    email === '' || senha === ''
                                      ? 'none'
                                      : ''
                                  } className="botaoPadrao botaoLogar">Logar</button>
                            }

                            {
                                isLoading === true &&
                                <button type="submit" className="botaoPadrao botaoLogar" disabled>Carregando...</button>
                            }

                            
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}