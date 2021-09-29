using Microsoft.AspNetCore.Http;
using senai_SpMedGroup_webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Interfaces
{
    interface IUsuarioRepository
    {
        void Cadastrar(Usuario novoUsuario);
        List<Usuario> ListarTodos();
        public Usuario Login(string email, string senha);

        public string ConsultarPerfilBD(int idUsuario);

        public void SalvarPerfilBD(IFormFile foto, int id_usuario);


    }
}
