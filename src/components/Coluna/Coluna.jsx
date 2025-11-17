import { useDroppable } from '@dnd-kit/core';
import Tarefa from '../Tarefa/Tarefa';
import './Coluna.scss';

const Coluna = ({ id, titulo, tarefas = [], cor }) => {
  const {
    isOver,
    setNodeRef
  } = useDroppable({
    id,
    data: {
      type: 'coluna',
      coluna: id
    }
  });

  return (
    <section
      ref={setNodeRef}
      className={`coluna ${isOver ? 'sobre' : ''}`}
      style={{ '--cor-coluna': cor }}
      aria-label={`Coluna ${titulo} com ${tarefas.length} tarefas`}
    >
      <header className="coluna-cabecalho">
        <h2 className="coluna-titulo">{titulo}</h2>
        <span className="coluna-contador">{tarefas.length}</span>
      </header>

      <div className="coluna-tarefas">
        {tarefas.map(tarefa => (
          <Tarefa key={tarefa.id} tarefa={tarefa} />
        ))}
        {tarefas.length === 0 && (
          <div className="coluna-vazia">
            <p>Nenhuma tarefa</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Coluna;