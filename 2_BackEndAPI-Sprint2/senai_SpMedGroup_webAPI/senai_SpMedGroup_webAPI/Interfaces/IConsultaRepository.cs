using senai_SpMedGroup_webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Interfaces
{
    interface IConsultaRepository
    {
        List<Consultum> ListarTodas();
        void AgendarConsulta(Consultum novaConsulta);
        void DeletarConsulta(int Consulta);
        void CancelarConsulta(int idConsulta);
        List<Consultum> ListarConsultasMedico(int idMedico);
        List<Consultum> ListarConsultasPaciente(int idPaciente);
        void ModificarDescricao(int idConsulta, string novaDescricao);
        Consultum EncontrarConsulta(int idConsulta);
    }
}
