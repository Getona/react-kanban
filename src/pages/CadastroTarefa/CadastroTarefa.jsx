import { useForm } from "react-hook-form";  //era "userform"
import { zodResolver } from "@hookform/resolvers/zod";
import { tarefaSchema } from "../../utils/validacao";  //caminho e nome

import "./CadastroTarefa.scss";

// Dados mock
const usuariosMock = [
  { id: '1', nome: 'Fernanda Fretes' },
  { id: '2', nome: 'Vinicius de Almeida' },
  { id: '3', nome: 'Michel Modesto' }
];

const setores = ['TI', 'Marketing', 'Vendas', 'RH', 'Financeiro'];

const CadastroTarefa = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(tarefaSchema),
    defaultValues: {
      prioridade: 'media'
    }
  });

  const dataVencimento = watch('dataVencimento');

  const onSubmit = async (data) => {
    try {
      console.log('Dados da tarefa:', data);
      // await api.post('/tarefas', data);
      alert('Tarefa cadastrada com sucesso!');
      reset();
    } catch (error) {
      alert('Erro ao cadastrar tarefa');
    }
  };

  return (
    <div className="cadastro-tarefa">
      <div className="container">
        <h2 className="titulo-pagina">Nova Tarefa</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="formulario" noValidate>
          <div className="campo-grupo">
            <label htmlFor="titulo" className="campo-label">
              Título da Tarefa *
            </label>
            <input
              {...register('titulo')}
              type="text"
              id="titulo"
              className={`campo-input ${errors.titulo ? 'erro' : ''}`}
              placeholder="Ex: Desenvolver feature de login"
            />
            {errors.titulo && (
              <span className="mensagem-erro" role="alert">
                {errors.titulo.message}
              </span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="descricao" className="campo-label">
              Descrição *
            </label>
            <textarea
              {...register('descricao')}
              id="descricao"
              rows="4"
              className={`campo-input ${errors.descricao ? 'erro' : ''}`}
              placeholder="Descreva detalhadamente a tarefa..."
            />
            {errors.descricao && (
              <span className="mensagem-erro" role="alert">
                {errors.descricao.message}
              </span>
            )}
          </div>

          <div className="campos-grid">
            <div className="campo-grupo">
              <label htmlFor="setor" className="campo-label">
                Setor *
              </label>
              <select
                {...register('setor')}
                id="setor"
                className={`campo-input ${errors.setor ? 'erro' : ''}`}
              >
                <option value="">Selecione o setor</option>
                {setores.map(setor => (
                  <option key={setor} value={setor}>
                    {setor}
                  </option>
                ))}
              </select>
              {errors.setor && (
                <span className="mensagem-erro" role="alert">
                  {errors.setor.message}
                </span>
              )}
            </div>

            <div className="campo-grupo">
              <label htmlFor="usuarioId" className="campo-label">
                Responsável *
              </label>
              <select
                {...register('usuarioId')}
                id="usuarioId"
                className={`campo-input ${errors.usuarioId ? 'erro' : ''}`}
              >
                <option value="">Selecione o responsável</option>
                {usuariosMock.map(usuario => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nome}
                  </option>
                ))}
              </select>
              {errors.usuarioId && (
                <span className="mensagem-erro" role="alert">
                  {errors.usuarioId.message}
                </span>
              )}
            </div>
          </div>

          <div className="campos-grid">
            <div className="campo-grupo">
              <label htmlFor="prioridade" className="campo-label">
                Prioridade *
              </label>
              <select
                {...register('prioridade')}
                id="prioridade"
                className={`campo-input ${errors.prioridade ? 'erro' : ''}`}
              >
                <option value="baixa">🟢 Baixa</option>
                <option value="media">🟡 Média</option>
                <option value="alta">🔴 Alta</option>
              </select>
              {errors.prioridade && (
                <span className="mensagem-erro" role="alert">
                  {errors.prioridade.message}
                </span>
              )}
            </div>

            <div className="campo-grupo">
              <label htmlFor="dataVencimento" className="campo-label">
                Data de Vencimento *
              </label>
              <input
                {...register('dataVencimento')}
                type="date"
                id="dataVencimento"
                className={`campo-input ${errors.dataVencimento ? 'erro' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.dataVencimento && (
                <span className="mensagem-erro" role="alert">
                  {errors.dataVencimento.message}
                </span>
              )}
              {dataVencimento && (
                <span className="dias-restantes">
                  {Math.ceil((new Date(dataVencimento) - new Date()) / (1000 * 60 * 60 * 24))} dias restantes
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="botao-primario"
          >
            {isSubmitting ? 'Cadastrando...' : 'Criar Tarefa'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroTarefa;