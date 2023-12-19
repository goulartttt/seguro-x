import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './criacaoproposta.css';
import { Row, Col, Form, Button } from 'react-bootstrap';
import NavBar from '../../componentes/Navbar';
import { toast } from 'react-toastify';
import services from '../../services';
import { useParams, Link} from 'react-router-dom';


const CriacaoProposta = () => {
  const { indice } = useParams();
  const [dadosCotacao, setDadosCotacao] = useState(null);
  const [metodoPagamento, setMetodoPagamento] = useState(''); 
  const [parcelas, setParcelas] = useState(1);
  const [pagamentoTotal, setPagamentoTotal] = useState(0);

  useEffect(() => {
    const criarProposta = async () => {
      try {
        const resposta = await services.criarProposta(indice);

        if (resposta.success) {
          setDadosCotacao(resposta.proposta);
        } else {
          toast.error('Erro ao obter dados da cotação');
        }
      } catch (error) {
        console.error('Erro ao obter dados da cotação:', error);
        toast.error('Erro interno ao obter dados da cotação');
      }
    };

    criarProposta();
  }, []); 

  const handleMetodoPagamentoChange = (e) => {
    setMetodoPagamento(e.target.value);
    if (e.target.value === 'avista'){
      setPagamentoTotal(calcularPagamentoTotal(dadosCotacao.valorRisco, 0, e.target.value));
    }
  };

  const handleParcelasChange = (e) => {
    const numParcelas = parseInt(e.target.value);
    setParcelas(numParcelas);
    setPagamentoTotal(calcularPagamentoTotal(dadosCotacao.valorRisco, numParcelas, metodoPagamento));
  };

  const calcularPagamentoTotal = (valorRisco, numParcelas, metodoPagamento) => {
    const percentualAvista = 0.05;
    const valorAvista = valorRisco * (1 + percentualAvista);

    if (metodoPagamento === 'avista') {
      return valorAvista;
    } else {
      return valorRisco / numParcelas;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!metodoPagamento) {
      toast.error('Selecione a forma de pagamento');
      return;
    }

    try {

      const resposta = await services.apolice({
        ...dadosCotacao, 
        formas_pagamento: {
          parcelas: parcelas, 
          pagamentoTotal: pagamentoTotal, 
          metodoPagamento: metodoPagamento 
        }
      });

      if (resposta.success) {
        toast.success('Proposta efetivada com sucesso');
        setTimeout(() => {
          window.location.href = '/listaApolice';
        }, 1000);
      } else {
        toast.error('Erro ao criar proposta');
      }
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
      toast.error('Erro interno ao processar formulário');
    }
  };


  return (
    <>
      <header className='cabeca-criacao-proposta'>
        <NavBar />
      </header>

      <main className='main-criacao-proposta'>
        {dadosCotacao && (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Nome</Form.Label>
                <Form.Control type='text' placeholder='Digite Seu Nome' value={dadosCotacao.nome} readOnly />
              </Form.Group>

              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>CPF</Form.Label>
                <Form.Control type='text' value={dadosCotacao.cpf} readOnly />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Início de Vigência</Form.Label>
                <Form.Control type='date' value={dadosCotacao.inicioVigencia} readOnly />
              </Form.Group>

              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Fim de Vigência</Form.Label>
                <Form.Control type='date' value={dadosCotacao.fimVigencia} readOnly />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Cobertura</Form.Label>
                <Form.Control value={dadosCotacao.coberturas} readOnly />
              </Form.Group>

              <Form.Group as={Col} md='6' className='input-criacao-proposta'>
                <Form.Label>Valor de Risco</Form.Label>
                <Form.Control type='number' value={dadosCotacao.valorRisco} readOnly />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md='12' className='input-criacao-proposta-excecao'>
                <Form.Label>Forma de Pagamento</Form.Label>
                <Form.Control as='select' value={metodoPagamento} onChange={handleMetodoPagamentoChange} required>
                  <option value=''>Selecione</option>
                  <option value='avista'>À Vista</option>
                  <option value='parcelado'>Parcelado</option>
                </Form.Control>
              </Form.Group>
            </Row>

            {metodoPagamento === 'parcelado' && (
              <Row>
                <Form.Group as={Col} md='12' className='input-criacao-proposta-excecao'>
                  <Form.Label>Número de Parcelas</Form.Label>
                  <Form.Control
                    as='select'
                    value={parcelas}
                    onChange={handleParcelasChange}
                    required
                  >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num}x
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Row>
            )}

            <Row>
              <Form.Group as={Col} md='12' className='input-criacao-proposta-excecao'>
                <Form.Label>Valor Total a ser Pago</Form.Label>
                <Form.Control type='text' value={`R$ ${pagamentoTotal ? pagamentoTotal.toFixed(2) : '0.00'}`} readOnly />
              </Form.Group>
            </Row>

            <Button variant='primary' type='submit' className='botao-submit'>
              Efetivar Proposta
            </Button>
          </Form>
        )}
      </main>
    </>
  );
};

export default CriacaoProposta;
