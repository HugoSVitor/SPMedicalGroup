import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/css/style.css"
import Footer from "../../components/footer/footer.js"
import Header from "../../components/header/header.jsx"
import { Link } from 'react-router-dom';

export default function LocalizacaoCad() 
{
    const [ latitude, setLatitude  ] = useState("")
    const [ longitude, setLongitude  ] = useState("")
    const [ isLoading, setIsLoading  ] = useState(false)


    function cadastrarLocalizacao(event) 
    {
        event.preventDefault()
        setIsLoading(true)

        let novaLocalizacao = {
            latitude : latitude,
            longitude : longitude
        }

        axios.post('http://192.168.5.66:5000/api/localizacoes', novaLocalizacao, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
              },
            })
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log('Localização cadastrada com sucesso!')
                    setIsLoading(false)
                    setLatitude('')
                    setLongitude('')
                }
            })
            .catch(erro => console.log(erro),setIsLoading(false))
    }

    return(
        <div>
            <Header/>
            <main>
                <div className="login-Fundo">
                    <div className="form-login">
                    <form onSubmit={cadastrarLocalizacao}>
                        <div className="form-login">
                        <h2 className="tituloCadLocalizacao">Cadastrar localização</h2>

                        <div className="login-inputs">

                        <input  type="text" value={latitude} placeholder="Latitude" onChange={(campo) => setLatitude(campo.target.value)}/>
                        <input  type="text" value={longitude} placeholder="Longitude" onChange={(campo) => setLongitude(campo.target.value)}/>

                        
                        </div>
                        {
                            isLoading === true &&
                            <button disabled className="botaoPadrao botaoConAdm" type="submit">Loading...</button>
                        }
                        {
                            isLoading === false &&
                            <button className="botaoPadrao botaoConAdm" type="submit">Cadastrar</button>
                        }
                        </div>
                    </form>     
                    </div>               
                </div>
                <div>
                <Link to="file:///C:/Users/53961345856/Desktop/SPMedicalGroup/4_FrontEndReact-Sprint4/React/spmedgroup/src/pages/localizacoes/mapa.html"/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}