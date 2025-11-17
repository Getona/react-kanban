import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndContext } from '@dnd-kit/core';
import Cabecalho from './components/Cabecalho/Cabecalho';
import Navegacao from './components/Navegacao/Navegacao';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';
import CadastroTarefa from './pages/CadastroTarefa/CadastroTarefa';
import Quadro from './pages/Quadro/Quadro';
import './styles/main.scss';

function App() {
  return (
    <Router>
      <DndContext>
        <div className="app">
          <Cabecalho />
          <Navegacao />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Quadro />} />
              <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
              <Route path="/cadastro-tarefa" element={<CadastroTarefa />} />
              <Route path="/quadro" element={<Quadro />} />
            </Routes>
          </main>
        </div>
      </DndContext>
    </Router>
  );
}

export default App;