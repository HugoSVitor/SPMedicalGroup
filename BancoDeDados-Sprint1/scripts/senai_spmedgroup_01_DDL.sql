CREATE DATABASE SpMedicalGroup_T

USE SpMedicalGroup_T;
GO

CREATE TABLE especialidade
(
	idEspecialidade SMALLINT PRIMARY KEY IDENTITY (1,1),
	nomeEspecialidade VARCHAR(30) UNIQUE NOT NULL
)
GO

CREATE TABLE  clinica 
(
	idClinica SMALLINT PRIMARY KEY IDENTITY (1,1),
	nomeClinica VARCHAR(50) UNIQUE NOT NULL,
	horarioAbertura TIME NOT NULL,
	horarioFechamento TIME NOT NULL,
	cnpj CHAR(14) UNIQUE NOT NULL,
	razaoSocial VARCHAR(100) NOT NULL,
	enderecoClinica VARCHAR(100) NOT NULL
)
GO

CREATE TABLE tipoUsuario
(
	idTipoUsuario INT PRIMARY KEY IDENTITY (1,1),
	nomeTipoUsuario	VARCHAR(15) UNIQUE NOT NULL
)
GO

CREATE TABLE usuario
(
	idUsuario INT PRIMARY KEY IDENTITY (1,1),
	idTipoUsuario INT FOREIGN KEY REFERENCES tipoUsuario(idTipoUsuario),
	email VARCHAR(50) UNIQUE NOT NULL,
	senha VARCHAR(20) NOT NULL
)
GO

CREATE TABLE medico 
(
	idMedico INT PRIMARY KEY IDENTITY (1,1),
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
	idClinica SMALLINT FOREIGN KEY REFERENCES clinica(idClinica),
	idEspecialidade SMALLINT FOREIGN KEY REFERENCES especialidade(idEspecialidade),
	nomeMedico VARCHAR(50) NOT NULL,
	crm CHAR(7) UNIQUE NOT NULL
)
GO

CREATE TABLE paciente
(
	idPaciente INT PRIMARY KEY IDENTITY (1,1),
	idUsuario INT FOREIGN KEY REFERENCES usuario(idUsuario),
	nomePaciente VARCHAR(50) NOT NULL,
	dataNascimento DATE NOT NULL,
	telefone VARCHAR(12),
	rg CHAR(9) UNIQUE NOT NULL,
	cpf CHAR(11) UNIQUE NOT NULL,
	enderecoPaciente VARCHAR(100) NOT NULL
)
GO

CREATE TABLE situacao
(
	idSituacao TINYINT PRIMARY KEY IDENTITY (1,1),
	nomeSituacao VARCHAR(10) UNIQUE NOT NULL
)
GO

CREATE TABLE consulta
(
	idConsulta INT PRIMARY KEY IDENTITY (1,1),
	idPaciente INT FOREIGN KEY REFERENCES paciente(idPaciente),
	idMedico INT FOREIGN KEY REFERENCES medico(idMedico),
	idSituacao TINYINT FOREIGN KEY REFERENCES situacao(idSituacao),
	dataConsulta DATETIME NOT NULL,
	descricaoConsulta VARCHAR(100) NOT NULL
)
GO