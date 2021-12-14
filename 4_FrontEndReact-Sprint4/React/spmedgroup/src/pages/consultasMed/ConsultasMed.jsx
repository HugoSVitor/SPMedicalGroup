import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/css/style.css"
import Footer from "../../components/footer/footer.js"
import Header from "../../components/header/header.jsx"

export default function ConsultasMedicos() 
{
    const [ listaMinhasConsultasMed, setListaMinhasConsultasMed  ] = useState([])
    const [ descricaoAlterada, setDescricaoAlterada ] = useState('')
    const [ idDescricaoAlterada, setIdDescricaoAlterada ] = useState(0)
    const [ alterandoDescricao, setAlterandoDescricao ] = useState(false)
    //const [ ,  ] = useState('')

    function buscarConsultasMed() {
        axios('http://localhost:5000/api/Consultas/minhas/medico', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 200) {
                setListaMinhasConsultasMed(response.data)
            }
        })
        .catch(erro => console.log(erro))

        setAlterandoDescricao(false)
    };

    function ativarForm(consulta) {
        setAlterandoDescricao(true)
        setIdDescricaoAlterada(consulta.idConsulta)
    }

    function alterarDescricao(event) {
        event.preventDefault()

        axios.patch('http://192.168.5.66:5000/api/Consultas/descricao/' + idDescricaoAlterada,
        {
            descricaoConsulta : descricaoAlterada
        }, {headers : {
            'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
        }})
        .then((response) =>
        {   
            console.log(response)
            if (response.status === 204) {
                console.log('Descrição alterada com sucesso!')
                setAlterandoDescricao(false)
                setDescricaoAlterada('')
                buscarConsultasMed()
            }
        })
        .catch(erro => console.log(erro))
    }

    useEffect(buscarConsultasMed, [])

    return(
        <div>
            <Header />
            <main>
                <div className="consultasPac-Fundo">
                    <section className="consultasPac-base">
                        <h2>Consultas Médico</h2>
                        <div>
                            <table className="tabelaPacienteConsultas">
                                <thead>
                                    <tr>
                                        <th>idConsulta</th>
                                        <th>Paciente</th>
                                        <th>Data da Consulta</th>
                                        <th>Situação</th>
                                        <th>Endereço</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        listaMinhasConsultasMed.map((consulta) =>{
                                            return(
                                                <tr key={consulta.idConsulta}>
                                                    <td>{consulta.idConsulta}</td>
                                                    <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                                    <td>{Intl.DateTimeFormat("pt-BR", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(consulta.dataConsulta))}</td>
                                                    <td>{consulta.idSituacaoNavigation.nomeSituacao}</td>
                                                    <td>{consulta.idMedicoNavigation.idClinicaNavigation.enderecoClinica}</td>
                                                    <td>{consulta.descricaoConsulta}</td>
                                                    <td>
                                                        {
                                                            alterandoDescricao === false &&
                                                            <button className="botaoPadrao botaoConsultasMed" onClick={() => ativarForm(consulta)}>Alterar descrição</button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <form className="formConsultasMed" onSubmit={alterarDescricao}>
                            {
                            alterandoDescricao === true &&
                            <input type="text" value={descricaoAlterada} onChange={ (campo) => setDescricaoAlterada(campo.target.value)}/> 
                            }
                            {
                            alterandoDescricao === true &&
                            <button className="botaoPadrao botaoConsultasMed" type="submit">Definir</button>
                            }
                            </form>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}