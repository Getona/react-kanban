import { useDraggable } from '@dnd-kit/core';
import './Tarefa.scss';

const Tarefa = ({ tarefa }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging
  } = useDraggable({
    id: tarefa.id,
    data: {
      type: 'tarefa',
      tarefa
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const getPrioridadeIcon = (prioridade) => {
    switch (prioridade) {
      case 'alta': return '🔴';
      case 'media': return '🟡';
      case 'baixa': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`tarefa ${isDragging ? 'arrastando' : ''} prioridade-${tarefa.prioridade}`}
      role="button"
      tabIndex={0}
      aria-label={`Tarefa: ${tarefa.titulo}. Prioridade ${tarefa.prioridade}. Arraste para mover.`}
    >
      <header className="tarefa-cabecalho">
        <h3 className="tarefa-titulo">{tarefa.titulo}</h3>
        <span className="tarefa-prioridade">
          {getPrioridadeIcon(tarefa.prioridade)}
        </span>
      </header>
      
      <div className="tarefa-corpo">
        <p className="tarefa-descricao">{tarefa.descricao}</p>
      </div>

      <footer className="tarefa-rodape">
        <div className="tarefa-meta">
          <span className="tarefa-responsavel">👤 {tarefa.usuario?.nome}</span>
          <span className="tarefa-setor">🏢 {tarefa.setor}</span>
        </div>
        <div className="tarefa-data">
          <span className="tarefa-vencimento">
            📅 {new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR')}
          </span>
        </div>
      </footer>
    </article>
  );
};

export default Tarefa;