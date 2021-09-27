using Microsoft.EntityFrameworkCore;
using senai_SpMedGroup_webAPI.Context;
using senai_SpMedGroup_webAPI.Domains;
using senai_SpMedGroup_webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Repositories
{
    public class PacienteRepository : IPacienteRepository
    {
        /// <summary>
        /// Objeto contexto por onde serão chamados os métodos do EF Core
        /// </summary>
        SpMedGroupContext ctx = new();

        public void Cadastrar(Paciente novoPaciente, int idUsuario)
        {
            novoPaciente.IdUsuario = idUsuario;
            ctx.Pacientes.Add(novoPaciente);

            ctx.SaveChanges();
        }

        public List<Paciente> ListarTodos()
        {
            return ctx.Pacientes.Include(P => P.IdUsuarioNavigation).ToList();
        }
    }
}
