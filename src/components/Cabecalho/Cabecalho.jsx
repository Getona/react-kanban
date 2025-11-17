import './Cabecalho.scss';

const Cabecalho = () => {
  return (
    <header className="cabecalho" role="banner">
      <div className="cabecalho-container">
        <h1 className="cabecalho-titulo">Kanban Board</h1>
        <p className="cabecalho-descricao">
          Sistema de gerenciamento de tarefas
        </p>
      </div>
    </header>
  );
};

export default Cabecalho;