import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const registro = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome,
          email: email,
        }),
      });

      if (resposta.ok) {
        navigate('/');
      } else {
        alert('Erro no registro! Tente novamente.');
      }
    } catch (err) {
      alert('Erro no registro!', err);
    }
  };

  return (
    <main>
      <form onSubmit={registro}>
        <div>
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </main>
  );
}
