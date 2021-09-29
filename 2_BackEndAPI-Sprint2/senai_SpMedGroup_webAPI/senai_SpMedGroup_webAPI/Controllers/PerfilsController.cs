using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai_SpMedGroup_webAPI.Interfaces;
using senai_SpMedGroup_webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class PerfilsController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository;
        public PerfilsController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [Authorize(Roles = "1,2")]
        [HttpPost("imagem/bd")]
        public IActionResult postBD(IFormFile arquivo)
        {
            try
            {
                //if (arquivo.Length > 5000)//5MB
                    //return BadRequest(new { mensagem = "Tamanho máximo de imagem foi atingido!!" });

                string extensao = arquivo.FileName.Split(".").Last();

                if (extensao == "png" || extensao == "jpg")
                {
                    int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                    _usuarioRepository.SalvarPerfilBD(arquivo, idUsuario);

                    return Ok();
                }
                else
                    return BadRequest(new { mensagem = "Apenas arquivos .png e .jpg são permitidos." });
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        [Authorize(Roles = "1,2")]
        [HttpGet("imagem/bd")]
        public IActionResult getBD()
        {
            try
            {
                int idUsuario = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                string base64 = _usuarioRepository.ConsultarPerfilBD(idUsuario);

                return Ok(base64);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }
    }
}
