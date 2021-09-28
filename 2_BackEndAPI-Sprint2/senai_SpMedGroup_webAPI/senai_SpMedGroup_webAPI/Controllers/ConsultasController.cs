using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using senai_SpMedGroup_webAPI.Domains;
using senai_SpMedGroup_webAPI.Interfaces;
using senai_SpMedGroup_webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]

    [ApiController]
    public class ConsultasController : Controller
    {
        private IConsultaRepository _consultaRepository;
        public ConsultasController()
        {
            _consultaRepository = new ConsultaRepository();
        }

        [HttpPost("agendar")]
        [Authorize(Roles = "3")]
        public IActionResult Agendar(Consultum novaConsulta)
        {
            if (novaConsulta.IdMedico != null || novaConsulta.IdPaciente != null)
            {
                try
                {
                    novaConsulta.IdSituacao = 2;
                    _consultaRepository.AgendarConsulta(novaConsulta);
                    return StatusCode(201);
                }
                catch (Exception erro)
                {
                    return BadRequest(erro);
                    throw;
                }
            }
            else
                return BadRequest("Falta informações para o agendamento");


        }

        [HttpGet("minhas/medico")]
        [Authorize(Roles = "2")]
        public IActionResult ListarConsultasMedico()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_consultaRepository.ListarConsultasMedico(idUsuario));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("minhas/paciente")]
        [Authorize(Roles = "1")]
        public IActionResult ListarConsultasPaciente()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                return Ok(_consultaRepository.ListarConsultasPaciente(idUsuario));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPatch("cancelar/{IdConsulta}")]
        [Authorize(Roles = "3")]
        public IActionResult CancelarConsulta(int IdConsulta)
        {
            try
            {
                _consultaRepository.CancelarConsulta(IdConsulta);
                return StatusCode(200);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("deletar/{IdConsulta}")]
        [Authorize(Roles = "3")]
        public IActionResult DeletarConsulta(int IdConsulta)
        {
            try
            {
                _consultaRepository.DeletarConsulta(IdConsulta);
                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("{IdConsulta}")]
        [Authorize(Roles = "3")]
        public IActionResult BuscarConsulta(int IdConsulta)
        {
            try
            {
                return Ok(_consultaRepository.EncontrarConsulta(IdConsulta));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet]
        [Authorize(Roles = "3")]
        public IActionResult ListarTodas()
        {
            try
            {
                return Ok(_consultaRepository.ListarTodas());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPatch("descricao/{IdConsulta}")]
        [Authorize(Roles = "2")]
        public IActionResult ModificarDescricao(int IdConsulta, Consultum novaDescricao)
        {
            try
            {
                _consultaRepository.ModificarDescricao(IdConsulta, novaDescricao.DescricaoConsulta);

                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
