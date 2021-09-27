using Microsoft.AspNetCore.Mvc;
using senai_SpMedGroup_webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]

    [ApiController]
    public class PacienteController : Controller
    {
        private IPacienteRepository _pacienteRepository;
        public PacienteController()
        {
            _pacienteRepository = new PacienteRepository();
        }
    }
}
