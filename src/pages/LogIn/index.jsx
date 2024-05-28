import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../../componentes/Navbar';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import services from '../../services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const dados = { username, senha: password }; 
      const data = await services.login(dados);
    
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.mostraUsuario))
        toast.success('Usuário Logado'); 
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro no login:', error.message);
      toast.error('Erro ao tentar fazer login. Por favor, tente novamente.');
    }
  };

  return (
    <>
      <header className='cabeca-login'>
        <NavBar />
      </header>

      <main className='corpo-login'>
        <Form>
          <Form.Label className='log-in'>LOG IN</Form.Label>

          <Form.Group className='input-login'>
            <Form.Label className='label-login'>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite seu Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='input-login'>
            <Form.Label className='label-login'>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit' className='logar' onClick={handleLogin}>
            Logar
          </Button>
        </Form>
      </main>
    </>
  );
};

export default Login;
