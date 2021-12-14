import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/css/style.css"
import Footer from "../../components/footer/footer.js"
import Header from "../../components/header/header.jsx"

export default function ConsultasPacientes() 
{
    const [listaMinhasConsultas, setListaMinhasConsultas] = useState([]);

    function buscarMinhasConsultas() {
        axios('http://192.168.5.66:5000/api/Consultas/minhas/paciente', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 200) {
                setListaMinhasConsultas( response.data );
            }
        })
        .catch(erro => console.log(erro))
    };

    useEffect(buscarMinhasConsultas, []);

    return(
        <div>
            <Header/>
            <main >
                <div className="consultasPac-Fundo">
                <section className="consultasPac-base">
                    <h2>Minhas Consultas</h2>
                    <div>
                        <table className="tabelaPacienteConsultas">

                            <thead>
                                <tr>
                                    <th>idConsulta</th>
                                    <th>Data Consulta</th>
                                    <th>Descrição Consulta</th>
                                    <th>Situação</th>
                                    <th>Nome Médico</th>
                                    <th>Especialidade (Médico)</th>
                                    <th>Endereço</th>
                                </tr>
                                
                            </thead>

                            <tbody>
                                {
                                    listaMinhasConsultas.map((minhaConsulta) => 
                                    {
                                        return(
                                            <tr key={minhaConsulta.idConsulta}>
                                                <td>{minhaConsulta.idConsulta}</td>
                                                <td>{Intl.DateTimeFormat("pt-BR", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(minhaConsulta.dataConsulta))}</td>
                                                <td>{minhaConsulta.descricaoConsulta}</td>
                                                <td>{minhaConsulta.idSituacaoNavigation.nomeSituacao}</td>
                                                <td>{minhaConsulta.idMedicoNavigation.nomeMedico}</td>
                                                <td>{minhaConsulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</td>
                                                <td>{minhaConsulta.idMedicoNavigation.idClinicaNavigation.enderecoClinica}</td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>

                        </table>
                    </div>
                </section>
                </div>
            </main>
            <Footer/>
        </div>
    )
}