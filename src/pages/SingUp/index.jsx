import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../componentes/Navbar';
import './singup.css';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import services from '../../services';
import { toast } from 'react-toastify';

const SingUp = () => {
  const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');

  const validarSenha = (value) => {
    const regexNumeros = /[0-9].*[0-9]/;
    const regexEspecial = /[^A-Za-z0-9]/;

    return !(value.length < 6 || !regexNumeros.test(value) || !regexEspecial.test(value));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!validarSenha(senha)) {
      toast.error('A senha deve ter pelo menos 6 caracteres, 2 números e 1 caractere especial.');
      return;
    }
  
    try {
      const params = {
        nome,
        username,
        senha,
      };
  
      const data = await services.cadastro(params);
  
      if (data.success !== false) {
        localStorage.setItem('usuario', JSON.stringify(data));
        toast.success('Cadastro realizado com sucesso!');
        setTimeout(() => {
          window.location.href = '/login'; 
        }, 1000); 
      } else {
        toast.error('Essa conta já existe.');
        setUsername(''); 
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <>
      <header className='cabeca-singup'>
        <NavBar />
      </header>

      <main className='corpo-singup'>
        <Form onSubmit={handleSignUp}>
          <Form.Label className='sing-up'>Sing Up</Form.Label>

          <Form.Group className='input-singup'>
            <Form.Label className='label-singup'>Nome</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite Seu Nome'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='input-singup'>
            <Form.Label className='label-singup'>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite um Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='input-singup'>
            <Form.Label className='label-singup'>Senha</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit' className='cadastrar'>
            Cadastrar
          </Button>
        </Form>
      </main>
    </>
  );
};

export default SingUp;
