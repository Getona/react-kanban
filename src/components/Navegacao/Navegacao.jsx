import { Link, useLocation } from 'react-router-dom';
import './Navegacao.scss';

const Navegacao = () => {
  const location = useLocation();

  const links = [
    { path: '/quadro', label: '📊 Quadro', aria: 'Ir para o quadro de tarefas' },
    { path: '/cadastro-tarefa', label: '➕ Tarefa', aria: 'Cadastrar nova tarefa' },
    { path: '/cadastro-usuario', label: '👥 Usuários', aria: 'Gerenciar usuários' }
  ];

  return (
    <nav className="navegacao" role="navigation" aria-label="Navegação principal">
      <div className="navegacao-container">
        <ul className="navegacao-lista">
          {links.map(link => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navegacao-link ${location.pathname === link.path ? 'ativo' : ''}`}
                aria-current={location.pathname === link.path ? 'page' : undefined}
                aria-label={link.aria}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navegacao;