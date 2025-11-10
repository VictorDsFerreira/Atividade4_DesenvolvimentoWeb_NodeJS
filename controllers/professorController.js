let professores = require('../db');

const listarTodos = (req, res) => {
  res.status(200).json(professores);
};

const buscarPorId = (req, res) => {
  const { id } = req.params;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ message: "Professor não encontrado." });
  }

  res.status(200).json(professor);
};

const listarTurmasDoProfessor = (req, res) => {
    const { id } = req.params;
    const professor = professores.find(p => p.id === id);
  
    if (!professor) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }
  
    if (!professor.turmas || professor.turmas.length === 0) {
      return res.status(200).json({ message: "Professor não possui turmas cadastradas." });
    }
  
    res.status(200).json(professor.turmas);
  };


  const atualizarProfessor = (req, res) => {
    const { id } = req.params;
    const { nome, idade, departamento } = req.body;
  
    const index = professores.findIndex(p => p.id === id);
  
    if (index === -1) {
      return res.status(404).json({ message: "Id não existente" });
    }
  
    const professorAtual = professores[index];
  
    const professorAtualizado = {
      ...professorAtual,
      nome: nome || professorAtual.nome,
      idade: idade || professorAtual.idade, 
      departamento: departamento || professorAtual.departamento 
    };
  
    professores[index] = professorAtualizado;
  
    res.status(200).json(professorAtualizado);
  };

  const adicionarTurma = (req, res) => {
    const { id } = req.params;
    
    const { codigo, disciplina, alunos } = req.body;

    if (!codigo || !disciplina || !alunos) {
      return res.status(400).json({ message: "Dados incompletos. É necessário enviar código, disciplina e alunos." });
    }
 
    const professor = professores.find(p => p.id === id);

    if (!professor) {
      return res.status(404).json({ message: "Professor não encontrado." });
    }
  
    const novaTurma = {
      codigo: codigo,
      disciplina: disciplina,
      alunos: alunos
    };

    professor.turmas.push(novaTurma);

    res.status(201).json(novaTurma);
  };

  const listarPorDepartamento = (req, res) => {
    const { departamento } = req.params;

    const professoresFiltrados = professores.filter(
      p => p.departamento.toLowerCase() === departamento.toLowerCase()
    );

    if (professoresFiltrados.length === 0) {
      return res.status(404).json({ message: "Nenhum professor encontrado para este departamento." });
    }

    res.status(200).json(professoresFiltrados);
  };

  const removerProfessor = (req, res) => {
    const { id } = req.params;
 
    const index = professores.findIndex(p => p.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Id não existente" });
    }
  
    professores.splice(index, 1);
  
    res.status(200).json({ message: "Professor removido com sucesso." });
  };

module.exports = {
  listarTodos,
  buscarPorId,
  listarTurmasDoProfessor,
  atualizarProfessor,
  adicionarTurma,
  listarPorDepartamento,
  removerProfessor
};