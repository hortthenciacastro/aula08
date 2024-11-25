import React, { useState } from 'react';

export default function Registrar() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

 
  const registrar = async (event) => {
    event.preventDefault(); 
    if (!nome || !email) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    console.log("Registrando usuário...");
    console.log("Nome:", nome);
    console.log("E-mail:", email);


   event.preventDefault();
   try {
    await fetch ('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        nome: nome,
        email: email
      })
    });
   } catch {
    alert("Ocorreu um erro na aplicação.");
   }

    setNome('');
    setEmail('');
  };

  return (
    <main>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            placeholder="Digite seu nome"
          />
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </div>

        <button type="submit">Registrar</button>
      </form>
    </main>
  );
}

export default Registro;
