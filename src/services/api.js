import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

export const usuarioService = {
  listar: () => api.get('/usuarios'),
  criar: (dados) => api.post('/usuarios', dados),
  atualizar: (id, dados) => api.put(`/usuarios/${id}`, dados),
  excluir: (id) => api.delete(`/usuarios/${id}`)
};

export const tarefaService = {
  listar: () => api.get('/tarefas'),
  criar: (dados) => api.post('/tarefas', dados),
  atualizar: (id, dados) => api.put(`/tarefas/${id}`, dados),
  excluir: (id) => api.delete(`/tarefas/${id}`),
  atualizarStatus: (id, status) => api.patch(`/tarefas/${id}/status`, { status })
};

export default api;