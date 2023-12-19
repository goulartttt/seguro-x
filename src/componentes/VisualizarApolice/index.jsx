import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Button } from 'react-bootstrap';
import NavBar from '../Navbar';
import { toast } from 'react-toastify';
import services from '../../services';
import { useParams, Link } from 'react-router-dom';

const Editar = () => {
  const { num_doc } = useParams();
  const [dadosApolice, setDadosApolice] = useState(null);

  useEffect(() => {
    const obterDadosApolice = async () => {
      try {
        const resposta = await services.obterDadosApolice(num_doc);

        if (resposta.success) {
          setDadosApolice(resposta.dadosApolice);
        } else {
          toast.error('Erro ao obter dados da apolice');
        }
      } catch (error) {
        console.error('Erro ao obter dados da apolice:', error);
        toast.error('Erro interno ao obter dados da apolice');
      }
    };

    obterDadosApolice();
  }, []); 

  return (
    <>
      <header className='cabeca-criacao-proposta'>
        <NavBar />
      </header>

      <main className='main-criacao-proposta'>
        {dadosApolice && (
          <>
              <Form>
              <Row>
              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Nome</Form.Label>
                <Form.Control 
                  type='text' 
                  value={dadosApolice?.nome} 
                  readOnly 
                />
              </Form.Group>

              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>CPF</Form.Label>
                <Form.Control 
                  type='text' 
                  value={dadosApolice?.cpf} 
                  readOnly 
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Início de Vigência</Form.Label>
                <Form.Control 
                  type='date' 
                  value={dadosApolice?.inicioVigencia} 
                  readOnly 
                />
              </Form.Group>

              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Fim de Vigência</Form.Label>
                <Form.Control 
                  type='date' 
                  value={dadosApolice?.fimVigencia} 
                  readOnly 
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Cobertura</Form.Label>
                <Form.Control 
                  value={dadosApolice.coberturas} 
                  readOnly 
                />
              </Form.Group>

              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Valor de Risco</Form.Label>
                <Form.Control 
                  type='number' 
                  value={dadosApolice?.valorRisco} 
                  readOnly 
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md='12' className='input-criacao-proposta-excecao'>
                <Form.Label>Forma de Pagamento</Form.Label>
                <Form.Control 
                  value={dadosApolice?.formas_pagamento.metodoPagamento} 
                  readOnly
                />
              </Form.Group>
            </Row>


              <Row>
                <Form.Group as={Col} md='12' className='input-criacao-proposta-excecao'>
                  <Form.Label>Número de Parcelas</Form.Label>
                  <Form.Control
                    value={dadosApolice?.formas_pagamento.parcelas}
                    readOnly
                  />
                </Form.Group>
              </Row>


            <Row>
              <Form.Group as={Col} md='12' className='input-criacao-proposta-excecao'>
                <Form.Label>Valor Total a ser Pago</Form.Label>
                <Form.Control 
                  type='text' 
                  value={`R$ ${dadosApolice?.formas_pagamento.pagamentoTotal}`} 
                  readOnly 
                />
              </Form.Group>
            </Row>
            
                <Link to={'/listaApolice'}>
                  <Button variant='primary'>
                    Voltar
                  </Button>
                </Link>
              </Form>
          </>
        )}
      </main>
    </>
  );
};

export default Editar;
