using Microsoft.AspNetCore.Mvc;
using senai_SpMedGroup_webAPI.Interfaces;
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
    public class MedicoController : Controller
    {
        private IMedicoRepository _medicoRepository;
        public MedicoController()
        {
            _medicoRepository = new MedicoRepository();
        }
    }
}
