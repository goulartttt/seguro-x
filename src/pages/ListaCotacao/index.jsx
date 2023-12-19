import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './listacotacao.css';
import { Row, Col, Container, Badge } from 'react-bootstrap';
import NavBar from '../../componentes/Navbar';
import { toast } from 'react-toastify';
import services from '../../services';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const ListaCotacao = () => {
  const [dadosCotacao, setDadosCotacao] = useState(null);

  useEffect(() => {
    const listaCotacao = async () => {
      try {
        const resposta = await services.listaCotacao();

        if (resposta.success) {
          setDadosCotacao(resposta.dadosCotacao);
        } else {
          toast.error('Erro ao obter dados da cotação');
        }
      } catch (error) {
        console.error('Erro ao obter dados da cotação:', error);
        toast.error('Erro interno ao obter dados da cotação');
      }
    };

    listaCotacao();
  }, []); 

  return (
    <>
      <header className='cabeca-criacao-cotacao'>
        <NavBar />
      </header>
      
      <Container>
        <Row className='main-lista-cotacao'>
          <Col md={{ span: 8, offset: 2 }}>
            <main>
                {dadosCotacao && (
                  <ListGroup className='lista'>
                    {dadosCotacao.map((item, index) => (
                      <ListGroup.Item key={index} className='lista-item'>
                        {item.nome}
                        {item.efetivada && (
                          <Badge className='botao-efetivado'>Efetivado</Badge>
                        )}
                        {!item.efetivada && (
                          <Link to={`/editar/${item.n_cotacao}`}>
                            <button type='button' className='botao-editar'>Editar</button>
                          </Link>
                        )}
                        <Link to={`/cotacao/visualizar/${item.n_cotacao}`}>
                        <button type='button' className='botao-visualizar'>Visualizar</button>
                        </Link>
                        
                        
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
            </main>
          </Col>
        </Row>
      </Container>             
    </>
  );
};

export default ListaCotacao;
