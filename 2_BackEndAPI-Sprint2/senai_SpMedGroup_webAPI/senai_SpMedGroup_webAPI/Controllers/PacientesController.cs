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
    public class PacientesController : Controller
    {
        private IPacienteRepository _pacienteRepository;
        public PacientesController()
        {
            _pacienteRepository = new PacienteRepository();
        }

        [HttpPost]
        [Authorize(Roles = "3")]
        public IActionResult Cadastrar(Paciente novoPaciente)
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);
                _pacienteRepository.Cadastrar(novoPaciente, idUsuario);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet]
        [Authorize(Roles = "3")]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_pacienteRepository.ListarTodos());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
