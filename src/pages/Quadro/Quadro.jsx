import { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import Coluna from '../../components/Coluna/Coluna';
import Tarefa from '../../components/Tarefa/Tarefa';
import './Quadro.scss';

// Dados mock
const tarefasMock = [
  {
    id: '1',
    titulo: 'Desenvolver sistema de login',
    descricao: 'Implementar autenticação JWT com refresh token',
    setor: 'TI',
    usuario: { nome: 'Talita Cristina' },
    prioridade: 'alta',
    dataVencimento: '2025-12-20',
    status: 'fazer'
  },
  {
    id: '2',
    titulo: 'Reunião de planejamento',
    descricao: 'Definir metas do próximo trimestre com a equipe',
    setor: 'RH',
    usuario: { nome: 'Joyce Kelly' },
    prioridade: 'media',
    dataVencimento: '2025-12-15',
    status: 'fazendo'
  },
  {
    id: '3',
    titulo: 'Atualizar documentação',
    descricao: 'Revisar e atualizar a documentação do projeto',
    setor: 'TI',
    usuario: { nome: 'Nicolas Duarte' },
    prioridade: 'baixa',
    dataVencimento: '2025-12-10',
    status: 'pronto'
  },
  {
    id: '4',
    titulo: 'Testes de integração',
    descricao: 'Implementar testes end-to-end para o módulo de vendas',
    setor: 'TI',
    usuario: { nome: 'Pedro Magaieski' },
    prioridade: 'media',
    dataVencimento: '2025-12-25',
    status: 'fazer'
  }
];

const colunas = [
  { id: 'fazer', titulo: 'A Fazer', cor: '#fbbf24' },
  { id: 'fazendo', titulo: 'Fazendo', cor: '#60a5fa' },
  { id: 'pronto', titulo: 'Pronto', cor: '#34d399' }
];

const Quadro = () => {
  const [tarefas, setTarefas] = useState([]);
  const [activeTarefa, setActiveTarefa] = useState(null);

  useEffect(() => {
    // Simular carregamento de dados
    setTarefas(tarefasMock);
  }, []);

  const tarefasPorColuna = (status) => {
    return tarefas.filter(tarefa => tarefa.status === status);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveTarefa(tarefas.find(t => t.id === active.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTarefa(null);

    if (!over) return;

    const tarefaId = active.id;
    const colunaDestinoId = over.data?.current?.coluna || over.id;

    // Atualizar status da tarefa
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === tarefaId 
        ? { ...tarefa, status: colunaDestinoId }
        : tarefa
    ));

    // await api.put(`/tarefas/${tarefaId}`, { status: colunaDestinoId });
  };

  return (
    <div className="quadro">
      <div className="quadro-container">
        <header className="quadro-cabecalho">
          <h1 className="quadro-titulo">Quadro Kanban</h1>
          <p className="quadro-descricao">
            Arraste as tarefas entre as colunas para atualizar o status
          </p>
        </header>

        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="quadro-colunas">
            {colunas.map(coluna => (
              <Coluna
                key={coluna.id}
                id={coluna.id}
                titulo={coluna.titulo}
                tarefas={tarefasPorColuna(coluna.id)}
                cor={coluna.cor}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTarefa ? (
              <Tarefa tarefa={activeTarefa} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Quadro;