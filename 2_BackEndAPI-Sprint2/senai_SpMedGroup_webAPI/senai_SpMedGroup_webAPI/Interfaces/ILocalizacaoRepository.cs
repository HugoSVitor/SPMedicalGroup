using senai_SpMedGroup_webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Interfaces
{
    interface ILocalizacaoRepository
    {
        List<Localizacao> ListarTodas();

        //List<Localizacao> ListarMinha(int idUsuario);

        void Cadastrar(Localizacao novaLocalizacao);
    }
}
