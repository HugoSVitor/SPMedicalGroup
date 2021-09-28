using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using senai_SpMedGroup_webAPI.Domains;
using senai_SpMedGroup_webAPI.Interfaces;
using senai_SpMedGroup_webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]

    [ApiController]
    public class LoginController : Controller
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Logar(Usuario Login)
        {
            Usuario UsuarioBuscado = _usuarioRepository.Login(Login.Email, Login.Senha);
            try
            {
                if (UsuarioBuscado != null)
                {
                    var Claims = new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Email, UsuarioBuscado.Email),
                    new Claim(ClaimTypes.Role,UsuarioBuscado.IdTipoUsuario.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, UsuarioBuscado.IdUsuario.ToString())
                    };

                    var Chave = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("spmedgroup-chave-autenticacao"));
                    var Credenciais = new SigningCredentials(Chave, SecurityAlgorithms.HmacSha256);
                    var Token = new JwtSecurityToken
                        (
                            issuer: "SpMedGroup.webAPI",
                            audience: "SpMedGroup.webAPI",
                            claims: Claims,
                            expires: DateTime.Now.AddMinutes(30),
                            signingCredentials: Credenciais
                        );
                    return Ok(new JwtSecurityTokenHandler().WriteToken(Token));
                }
                else
                {
                    return NotFound("Email ou senha inválidos! Usuário não encontrado!!!");
                }
            }

            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
