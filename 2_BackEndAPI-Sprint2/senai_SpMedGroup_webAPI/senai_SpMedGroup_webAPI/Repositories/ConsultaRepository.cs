using senai_SpMedGroup_webAPI.Context;
using System;
using senai_SpMedGroup_webAPI.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using senai_SpMedGroup_webAPI.Domains;
using Microsoft.EntityFrameworkCore;

namespace senai_SpMedGroup_webAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        /// <summary>
        /// Objeto contexto por onde serão chamados os métodos do EF Core
        /// </summary>
        SpMedGroupContext ctx = new();

        public void AgendarConsulta(Consultum novaConsulta)
        {
            ctx.Consulta.Add(novaConsulta);

            ctx.SaveChanges();
        }

        public void CancelarConsulta(int idConsulta)
        {
            Consultum consultaCancelada = ctx.Consulta.FirstOrDefault(c => c.IdConsulta == idConsulta);

            consultaCancelada.IdSituacao = 3;

            ctx.Update(consultaCancelada);
            ctx.SaveChanges();
        }

        public void DeletarConsulta(int Consulta)
        {
            ctx.Consulta.Remove(EncontrarConsulta(Consulta));

            ctx.SaveChanges();
        }

        public Consultum EncontrarConsulta(int idConsulta)
        {
            return ctx.Consulta.Include(c => c.IdMedicoNavigation).Include(c => c.IdPacienteNavigation).Include(c => c.IdSituacaoNavigation).FirstOrDefault(c => c.IdConsulta == idConsulta);
        }

        public List<Consultum> ListarConsultasMedico(int idUsuario)
        {
            Medico m = ctx.Medicos.FirstOrDefault(m => m.IdUsuario == idUsuario);
            
            return ctx.Consulta
                .Include(c => c.IdMedicoNavigation.IdEspecialidadeNavigation)
                .Include(c => c.IdMedicoNavigation.IdClinicaNavigation)
                .Include(c => c.IdPacienteNavigation)
                .Include(c => c.IdSituacaoNavigation)
                .Where(c => c.IdMedico == m.IdMedico)
                .ToList();
        }

        public List<Consultum> ListarConsultasPaciente(int idUsuario)
        {
            Paciente p = ctx.Pacientes.FirstOrDefault(p => p.IdUsuario == idUsuario);
                                        
            return ctx.Consulta
                .Include(c => c.IdMedicoNavigation.IdEspecialidadeNavigation)
                .Include(c => c.IdMedicoNavigation.IdClinicaNavigation)
                .Include(c => c.IdPacienteNavigation)
                .Include(c => c.IdSituacaoNavigation)
                .Where(c => c.IdPaciente == p.IdPaciente)
                .ToList();
        }

        public List<Consultum> ListarTodas()
        {
            return ctx.Consulta
                .Include(c => c.IdMedicoNavigation.IdEspecialidadeNavigation)
                .Include(c => c.IdMedicoNavigation.IdClinicaNavigation)
                .Include(c => c.IdPacienteNavigation)
                .Include(c => c.IdSituacaoNavigation)
                .ToList(); 
        }

        public void ModificarDescricao(int idConsulta, string novaDescricao)
        {
            Consultum consultaModificada = ctx.Consulta
                .FirstOrDefault(p => p.IdConsulta == idConsulta);

            if (consultaModificada != null)
            {
                consultaModificada.DescricaoConsulta = novaDescricao;

                ctx.Consulta.Update(consultaModificada);

                ctx.SaveChanges();
            }
        }
    }
}
