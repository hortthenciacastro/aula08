import { useEffect, useState } from "react";

// Componente Home
export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  // Buscar usuários
  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch {
        alert('Ocorreu um erro no app!');
      }
    };
    buscarUsuarios();
  }, []); // Corrigido: useEffect agora é disparado apenas uma vez

  // Deletar usuário
  const deletar = async (id) => {
    try {
      await fetch('http://localhost:3000/usuarios/' + id, {
        method: 'DELETE'
      });
      // Após deletar, atualiza a lista de usuários
      setUsuarios(usuarios.filter(usuario => usuario.id !== id));
    } catch {
      alert('Ish, não deu certo!');
    }
  };

  return (
    <table border='1'>
      <thead>
        <tr>
          <td>Nome</td>
          <td>E-mail</td>
          <td>Ações</td>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.nome}</td>
            <td>{usuario.email}</td>
            <td>
              <button onClick={() => deletar(usuario.id)}> X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Componente Registrar
export function Registrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const registrar = async (event) => {
    event.preventDefault();
    try {
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email
        })
      });
    } catch {
      alert("Ocorreu um erro na aplicação");
    }
  };

  return (
    <main>
      <form onSubmit={registrar}>
        <div className="centraliza">
          <div className="separar">
            <input
              placeholder="Nome"
              type="text"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
            />
          </div>

          <div className="separar">
            <input
              className="espacamento"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <button>Salvar</button>
        </div>
      </form>
    </main>
  );
}
