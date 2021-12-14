using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_SpMedGroup_webAPI.Domains
{
    public class Localizacao
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRequired]
        public string Latitude { get; set; }

        [BsonRequired]
        public string Longitude { get; set; }

        //[BsonRequired]
        //public string IdadePaciente { get; set; }

        //[BsonRequired]
        //public string Descricao { get; set; }

        //[BsonRequired]
        //public string Especialidade { get; set; }

        //[BsonRequired]
        //public int IdUsuario { get; set; }
    }
}
