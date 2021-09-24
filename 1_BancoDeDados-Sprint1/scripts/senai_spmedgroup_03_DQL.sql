USE SpMedicalGroup_T;
GO

SELECT * FROM especialidade;
SELECT * FROM clinica
SELECT * FROM tipoUsuario
SELECT * FROM usuario
SELECT * FROM medico
SELECT * FROM paciente
SELECT * FROM situacao
SELECT * FROM consulta

SELECT nomeMedico, crm, nomeEspecialidade FROM medico
INNER JOIN especialidade
ON medico.idEspecialidade = especialidade.idEspecialidade;

SELECT nomeMedico[Médico],nomeEspecialidade[Especialidade],nomePaciente[Paciente],convert(varchar(20),dataConsulta,106) [Data da Consulta],descricaoConsulta[Descrição],nomeSituacao[Situação] FROM consulta
INNER JOIN paciente
ON consulta.idPaciente = paciente.idPaciente
INNER JOIN medico
ON consulta.idMedico = medico.idMedico
INNER JOIN especialidade
ON medico.idEspecialidade = especialidade.idEspecialidade
INNER JOIN situacao
ON consulta.idSituacao = situacao.idSituacao
