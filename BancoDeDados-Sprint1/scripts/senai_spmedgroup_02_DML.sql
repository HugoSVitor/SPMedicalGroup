USE SpMedicalGroup_T;
GO

INSERT INTO especialidade (nomeEspecialidade)
VALUES ('Acupuntura'),('Anestesiologia'),('Angiologia'),('Cardiologia'),('Cirurgia Cardiovascular'),
('Cirurgia da Mão'),('Cirurgia do Aparelho Digestivo'),('Cirurgia Geral'),('Cirurgia Pediátrica'),
('Cirurgia Plástica'),('Cirurgia Torácica'),('Cirurgia Vascular'),('Dermatologia'),('Radioterapia'),
('Urologia'),('Pediatria'),('Psiquiatria')
GO

INSERT INTO clinica(nomeClinica,horarioAbertura,horarioFechamento,cnpj,razaoSocial,enderecoClinica)
VALUES ('Clinica Possarle','07:30:00','00:00:00','86400902000130','SP Medical Group',
'Av. Barão Limeira, 532, São Paulo, SP')
GO

INSERT INTO tipoUsuario(nomeTipoUsuario)
VALUES('Paciente'),('Medico'),('ADM')
GO

INSERT INTO usuario(idTipoUsuario,email,senha)
VALUES (2,'ricardo.lemos@spmedicalgroup.com.br','ric123'),
(2,'roberto.possarle@spmedicalgroup.com.br','rob123'),
(2,'helena.souza@spmedicalgroup.com.br','hele123'),
(1,'ligia@gmail.com','ligia123'),(1,'alexandre@gmail.com','ale123'),
(1,'fernando@gmail.com','fer123'),(1,'henrique@gmail.com','her123'),
(1,'joao@hotmail.com','jao123'),(1,'bruno@gmail.com','bru123'),
(1,'mariana@outlook.com','mari123'),(3,'adm@gmail.com','adm123')
GO

INSERT INTO medico(idUsuario,idClinica,idEspecialidade,nomeMedico,crm)
VALUES(1,1,2,'Ricardo Lemos','54356SP'),(2,1,17,'Roberto Possarle','53452SP'),(3,1,16,'Helena Strada','65463SP')
GO

INSERT INTO paciente(idUsuario,nomePaciente,dataNascimento,telefone,rg,cpf,enderecoPaciente)
VALUES (4,'Ligia','13/10/1983','1134567654','435225435','94839859000','Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000'),
(5,'Alexandre','23/07/2001','11987656543','326543457','73556944057','Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200'),
(6,'Fernando','10/10/1978','11972084453','546365253','16839338002','Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200'),
(7,'Henrique','13/10/1985','1134566543','543663625','14332654765','R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030'),
(8,'João','27/08/1975','1176566377','325444441','91305348010','R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380'),
(9,'Bruno','21/03/1972','11954368769','545662667','79799299004','Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001'),
(10,'Mariana','05/03/2018',NULL,'545662668','13771913039','R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140')
GO

INSERT INTO situacao (nomeSituacao)
VALUES ('Realizada'),('Agendada'),('Cancelada')
GO

INSERT INTO consulta (idPaciente,idMedico,idSituacao,dataConsulta,descricaoConsulta)
VALUES (7,3,1,'20/01/2020 15:00','Consulta realizada com sucesso.'),
(2,2,3,'06/01/2020 10:00','Consulta cancelada com sucesso.'),
(3,2,1,'07/02/2020 11:00','Consulta realizada com sucesso.'),
(2,2,1,'06/02/2018 10:00','Consulta realizada com sucesso.'),
(4,1,3,'07/02/2019 11:00','Consulta cancelada com sucesso.'),
(7,3,2,'08/03/2020 15:00','Consulta agendada com sucesso.'),
(4,1,2,'09/03/2020 11:00','Consulta agendada com sucesso.')
GO