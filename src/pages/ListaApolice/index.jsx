import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './listaApolice.css';
import { Row, Col, Container } from 'react-bootstrap';
import NavBar from '../../componentes/Navbar';
import { toast } from 'react-toastify';
import services from '../../services';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

const ListaApolice = () => {
  const [dadosApolice, setDadosApolice] = useState(null);

  useEffect(() => {
    const listaApolice = async () => {
      try {
        const resposta = await services.listaApolice();

        if (resposta.success) {
          setDadosApolice(resposta.dadosApolice);
        } else {
          toast.error('Erro ao obter dados da Apolice');
        }
      } catch (error) {
        console.error('Erro ao obter dados da Apolice:', error);
      }
    };

    listaApolice();
  }, []);

  return (
    <>
      <header className='cabeca-lista-apolice'>
        <NavBar />
      </header>

      <Container>
        <Row className='main-lista-apolice'>
          <Col md={{ span: 8, offset: 2 }}>
            <main>
                {dadosApolice && (
                  <ListGroup>
                    {dadosApolice.map((item, index) => (
                      <ListGroup.Item key={index}>
                        {item.nome}
                        <Link to={`/apolice/${item.num_doc}`}>
                        <button type='button'>Visualizar</button>
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

export default ListaApolice;
