import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usuarioSchema } from "../../utils/validacao";
import './CadastroUsuario.scss';

const CadastroUsuario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm({
    resolver: zodResolver(usuarioSchema)
  });

  const setores = [
    'TI',
    'Marketing',
    'Vendas',
    'RH',
    'Financeiro',
    'Operações'
  ];

  const onSubmit = async (data) => {
    try {
      // Simular chamada API
      console.log('Dados do usuário:', data);
      
      // await api.post('/usuarios', data);
      
      alert('Usuário cadastrado com sucesso!');
      reset();
    } catch (error) {
      setError('root', {
        message: 'Erro ao cadastrar usuário. Tente novamente.'
      });
    }
  };

  return (
    <div className="cadastro-usuario">
      <div className="container">
        <h2 className="titulo-pagina">Cadastro de Usuário</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="formulario" noValidate>
          <div className="campo-grupo">
            <label htmlFor="nome" className="campo-label">
              Nome Completo *
            </label>
            <input
              {...register('nome')}
              type="text"
              id="nome"
              className={`campo-input ${errors.nome ? 'erro' : ''}`}
              aria-invalid={errors.nome ? "true" : "false"}
              aria-describedby={errors.nome ? "erro-nome" : undefined}
            />
            {errors.nome && (
              <span id="erro-nome" className="mensagem-erro" role="alert">
                {errors.nome.message}
              </span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="email" className="campo-label">
              Email *
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={`campo-input ${errors.email ? 'erro' : ''}`}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <span className="mensagem-erro" role="alert">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="telefone" className="campo-label">
              Telefone
            </label>
            <input
              {...register('telefone')}
              type="tel"
              id="telefone"
              placeholder="(99) 99999-9999"
              className={`campo-input ${errors.telefone ? 'erro' : ''}`}
            />
            {errors.telefone && (
              <span className="mensagem-erro" role="alert">
                {errors.telefone.message}
              </span>
            )}
          </div>

          <div className="campo-grupo">
            <label htmlFor="setor" className="campo-label">
              Setor *
            </label>
            <select
              {...register('setor')}
              id="setor"
              className={`campo-input ${errors.setor ? 'erro' : ''}`}
            >
              <option value="">Selecione um setor</option>
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
            <label htmlFor="cargo" className="campo-label">
              Cargo *
            </label>
            <input
              {...register('cargo')}
              type="text"
              id="cargo"
              className={`campo-input ${errors.cargo ? 'erro' : ''}`}
            />
            {errors.cargo && (
              <span className="mensagem-erro" role="alert">
                {errors.cargo.message}
              </span>
            )}
          </div>

          {errors.root && (
            <div className="erro-geral" role="alert">
              {errors.root.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="botao-primario"
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Usuário'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroUsuario;