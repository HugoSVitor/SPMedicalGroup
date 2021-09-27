using System;
using System.Collections.Generic;

#nullable disable

namespace senai_SpMedGroup_webAPI.Domains
{
    public partial class Clinica
    {
        public Clinica()
        {
            Medicos = new HashSet<Medico>();
        }

        public short IdClinica { get; set; }
        public string NomeClinica { get; set; }
        public TimeSpan HorarioAbertura { get; set; }
        public TimeSpan HorarioFechamento { get; set; }
        public string Cnpj { get; set; }
        public string RazaoSocial { get; set; }
        public string EnderecoClinica { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
