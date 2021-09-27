using senai_SpMedGroup_webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Interfaces
{
    interface IPacienteRepository
    {
        void Cadastrar(Paciente novoPaciente, int idUsuario); 
        List<Paciente> ListarTodos();
    }
}
