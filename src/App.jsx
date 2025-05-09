import { useShape } from '@electric-sql/react';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import logo from './assets/logo.png';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; 
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const { isLoading, data } = useShape({
    url: import.meta.env.VITE_ELECTRIC_API_URL,
    params: {
      table: 'todos',
      columns: ['id', 'task', 'is_completed', 'created_at'],
      source_id: import.meta.env.VITE_ELECTRIC_SOURCE_ID,
      source_secret: import.meta.env.VITE_ELECTRIC_SOURCE_SECRET,
    },
  });

  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState('');

  // Adicionar uma nova tarefa
  const addTask = async () => {
    if (!newTask.trim()) {
      alert('A tarefa não pode estar vazia.');
      return;
    }
    const id = uuidv4();

    const { error } = await supabase
      .from('todos')
      .insert([{ id, task: newTask, is_completed: false }]);

    if (error) {
      console.error('Erro ao adicionar tarefa:', error.message);
      alert('Erro ao adicionar tarefa');
    } else {
      setNewTask('');
    }
  };

  // Atualizar uma tarefa
  const updateTask = async (id) => {
    if (!updatedTask.trim()) {
      alert('A tarefa atualizada não pode estar vazia.');
      return;
    }

    const { error } = await supabase
      .from('todos')
      .update({ task: updatedTask })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar tarefa:', error.message);
      alert('Erro ao atualizar tarefa');
    } else {
      setEditingTask(null);
      setUpdatedTask('');
    }
  };

  // Alterar o status da tarefa
  const toggleTaskStatus = async (id, isCompleted) => {
    const { error } = await supabase
      .from('todos')
      .update({ is_completed: !isCompleted })
      .eq('id', id);

    if (error) {
      console.error('Erro ao alternar o status da tarefa:', error.message);
      alert('Erro ao atualizar status');
    }
  };

  // Deletar uma tarefa
  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar tarefa:', error.message);
      alert('Erro ao excluir tarefa');
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Sincronizando dados iniciais...</p>
        <p className="electric-loading-text">Conectando ao ElectricSQL...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Demonstração ElectricSQL</h1>
        <div className="demo-alert">
          <div className="electric-badge">
            <img src={logo} alt="ElectricSQL Logo" className="electric-logo" />
          </div>
          <p className="demo-description">
            Esta aplicação demonstra a sincronização de dados em tempo real usando <strong>ElectricSQL</strong>.
            Edições feitas aqui serão refletidas instantaneamente em todos os dispositivos conectados.
          </p>
        </div>
      </header>

      <div className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          className="task-input"
          onKeyUp={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} className="btn btn-primary">
          Adicionar Tarefa
        </button>
      </div>

      <div className="sync-status">
        <div className="sync-indicator"></div>
        <span>Sincronização ativa - Conexão estabelecida</span>
      </div>

      <div className="task-list">
        {data.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhuma tarefa encontrada</h3>
            <p>Adicione sua primeira tarefa para ver a sincronização em ação!</p>
          </div>
        ) : (
          data.map((item) => (
            <div key={item.id} className="task-card">
              <div className="task-content">
                <div className="task-header">
                  <span className={`task-status ${item.is_completed ? 'completed' : 'pending'}`}>
                    {item.is_completed ? '✅ Concluída' : '⏳ Pendente'}
                  </span>
                  <span className="task-date">
                    {new Date(item.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                
                {editingTask === item.id ? (
                  <input
                    type="text"
                    value={updatedTask}
                    onChange={(e) => setUpdatedTask(e.target.value)}
                    className="task-input edit-input"
                    autoFocus
                  />
                ) : (
                  <p className="task-text">{item.task}</p>
                )}
              </div>

              <div className="task-actions">
                {editingTask === item.id ? (
                  <>
                    <button onClick={() => updateTask(item.id)} className="btn btn-save">
                      Salvar
                    </button>
                    <button onClick={() => setEditingTask(null)} className="btn btn-cancel">
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => toggleTaskStatus(item.id, item.is_completed)}
                      className="btn btn-status"
                    >
                      {item.is_completed ? 'Marcar Pendente' : 'Marcar Concluída'}
                    </button>
                    <button
                      onClick={() => {
                        setEditingTask(item.id);
                        setUpdatedTask(item.task);
                      }}
                      className="btn btn-edit"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteTask(item.id)}
                      className="btn btn-delete"
                    >
                      Excluir
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="footer">
        <p>
          Demonstração de sincronização em tempo real - Desenvolvido com 
          <a href="https://electric-sql.com" target="_blank" rel="noopener noreferrer"> ElectricSQL</a>
        </p>
        <p className="footer-note">
          Os dados são sincronizados automaticamente entre todos os clientes conectados
        </p>
      </footer>
    </div>
  );
}