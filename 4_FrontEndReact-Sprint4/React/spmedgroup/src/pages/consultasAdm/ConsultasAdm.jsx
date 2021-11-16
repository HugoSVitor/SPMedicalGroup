import { useState, useEffect } from 'react';
import axios from 'axios';
import "../../assets/css/style.css"
import Footer from "../../components/footer/footer.js"
import Header from "../../components/header/header.jsx"

export default function ConsultasAdm() 
{
    const [ listaConsultas, setListaConsultas  ] = useState([])
    const [ listaMedicos, setListaMedicos ] = useState([])
    const [ listaPacientes, setListaPacientes  ] = useState([])


    const [ dataConsulta, setDataConsulta  ] = useState(new Date())
    const [ idMedico, setIdMedico  ] = useState(0)
    const [ idPaciente, setIdPaciente  ] = useState(0)
    const [ descricaoConsulta, setDescricaoConsulta  ] = useState('')
    const [ situacao, setSituacao  ] = useState('')
    const [ isLoading, setIsLoading  ] = useState(false)
    

    function buscarConsultas() {
        axios('http://localhost:5000/api/Consultas', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                setListaConsultas(resposta.data)
                console.log(listaConsultas)
            }
        })
        .catch(erro => console.log(erro),setIsLoading(false))
    }

    function buscarMedicos() {
        axios('http://localhost:5000/api/Medicos', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                setListaMedicos(resposta.data)
                console.log(listaMedicos)
            }
        })
        .catch(erro => console.log(erro),setIsLoading(false))
    }

    function buscarPacientes() {
        axios('http://localhost:5000/api/Pacientes', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        }).then(resposta => {
            if (resposta.status === 200) {
                setListaPacientes(resposta.data)
                console.log(listaPacientes)
            }
        })
        .catch(erro => console.log(erro),setIsLoading(false))
    }
    

    function agendarConsulta(event) {
        event.preventDefault()
        setIsLoading(true)

        let novaConsulta = {

            idPaciente : idPaciente,
            idMedico : idMedico,
            idSituacao: situacao,
            dataConsulta: dataConsulta,
            descricaoConsulta : descricaoConsulta

        }

        axios.post('http://localhost:5000/api/Consultas/agendar', novaConsulta, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login'),
              },
        })
        .then(resposta => {
            if (resposta.status === 201) {
                console.log('Consulta agendada com sucesso!')
                buscarConsultas();
                setIsLoading(false)
                setSituacao('')
                setDescricaoConsulta('')
                setIdPaciente(0)
                setIdMedico(0)
                setDataConsulta(new Date())
            }
        })
        .catch(erro => console.log(erro),setIsLoading(false))
    }

    useEffect(buscarConsultas, [])
    useEffect(buscarMedicos, [])
    useEffect(buscarPacientes, [])

    return(
        <div>
            <Header/>
            <main >
                <div className="consultasPac-Fundo">
                <section className="consultasPac-base">
                    <h2>Consultas</h2>
                    <div>
                        <table className="tabelaPacienteConsultas">

                            <thead>
                                <tr>
                                    <th>idConsulta</th>
                                    <th>Data Consulta</th>
                                    <th>Descrição Consulta</th>
                                    <th>Situação</th>
                                    <th>Nome Médico</th>
                                    <th>Nome Paciente</th>
                                    <th>Especialidade(Médico)</th>
                                    <th>Endereço</th>
                                </tr>
                                
                            </thead>

                            <tbody>
                                {
                                    listaConsultas.map((consulta) => 
                                    {
                                        return(
                                            <tr key={consulta.idConsulta}>
                                                <td>{consulta.idConsulta}</td>
                                                <td>{Intl.DateTimeFormat("pt-BR", { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(consulta.dataConsulta))}</td>
                                                <td>{consulta.descricaoConsulta}</td>
                                                <td>{consulta.idSituacaoNavigation.nomeSituacao}</td>
                                                <td>{consulta.idMedicoNavigation.nomeMedico}</td>
                                                <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                                <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</td>
                                                <td>{consulta.idMedicoNavigation.idClinicaNavigation.enderecoClinica}</td>
                                            </tr>
                                        )
                                    })
                                }
                                
                            </tbody>

                        </table>
                    </div>

                    <div className="consultasPac-base">
                        <h2>Agendamento de Consulta</h2>
                        <form onSubmit={agendarConsulta} className="formConsultasAdm">
                            <div>

                            <select name="idPaciente" value={idPaciente} onChange={(campo) => setIdPaciente(campo.target.value)}>
                                <option value="0">Selecione um paciente</option> 
                                
                                {
                                    listaPacientes.map((paciente) => {
                                        return(
                                            <option key={paciente.idPaciente} value={paciente.idPaciente}>{paciente.nomePaciente}</option>
                                        )
                                    })
                                }
                                
                            </select>

                            <select name="idMedico" value={idMedico} onChange={(campo) => setIdMedico(campo.target.value)}>
                                <option value="0">Selecione um médico</option> 
                                
                                {
                                    listaMedicos.map((medico) => {
                                        return(
                                            <option key={medico.idMedico} value={medico.idMedico}>{medico.nomeMedico}</option>
                                        )
                                    })
                                }
                                
                            </select>

                            </div>
                            

                            <div>
                            <input required name="descricao" type="text" placeholder='descrição' onChange={(campo) => setDescricaoConsulta(campo.target.value)} value={descricaoConsulta}/>

                            <input required name="situacao" type="text" placeholder='situação (1=Realizada, 2=Agendada, 3=Cancelada)' onChange={(campo) => setSituacao(campo.target.value)} value={situacao}/>

                            <input type="datetime-local" name="dataConsulta" value={dataConsulta} onChange={(campo) => setDataConsulta(campo.target.value)} />

                            </div>

                            {
                            isLoading === true &&
                            <button disabled className="botaoPadrao botaoConAdm" type="submit">Loading...</button>
                            }
                            {
                            isLoading === false &&
                            <button className="botaoPadrao botaoConAdm" type="submit">Agendar</button>
                            }

                        </form>
                    </div>
                </section>
                </div>
            </main>
            <Footer/>
        </div>
    )
}