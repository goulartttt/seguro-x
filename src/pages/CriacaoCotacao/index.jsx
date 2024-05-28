import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './criacaocotacao.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, Button } from 'react-bootstrap';
import NavBar from '../../componentes/Navbar';
import { toast } from 'react-toastify';
import services from '../../services';
import { useNavigate } from 'react-router-dom';

const CriacaoCotacao = () => {
  const [inputs, setInputs] = useState({
    nome: '',
    cpf: '',
    fimVigencia: '',
    inicioVigencia: '',
    valorRisco: '',
    coberturas: [],
  });
  const [coberturas, setCoberturas] = useState([]);
  const [coberturaSelecionada, setCoberturaSelecionada] = useState('');
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [disabledBotao, setDisabledBotao] = useState(false);

  const navegarLogin = useNavigate();

  useEffect(() => {
    const verificarAutenticacao = async () => {
      try {
        const resposta = await services.verificarAutenticacao();
        setUsuarioAutenticado(resposta.success);
      } catch (error) {
        navegarLogin('/login');
        toast('Para realizar uma cotação, faça seu login');
      }
    };

    verificarAutenticacao();
  }, [navegarLogin]);

  const handleInicioVigencia = (e) => {
    const hoje = new Date().toISOString().split('T')[0];
    const { value } = e.target;
    const dataParseada = new Date(value).toISOString().split('T')[0];

    if (dataParseada < hoje) {
      toast.error('Atenção, coloque uma data superior ao dia de hoje');
    } else {
      setInputs((prevInputs) => ({ ...prevInputs, inicioVigencia: dataParseada }));
    }
  };

  const handleFimVigencia = (e) => {
    const { value } = e.target;
    const hoje = new Date();
    const anoInserido = new Date(value).getFullYear();
    const minAnos = 5;
    const maxAnos = 10;
    const diferencaAnos = anoInserido - hoje.getFullYear();

    if (diferencaAnos < minAnos || diferencaAnos > maxAnos) {
      toast.error(`Atenção, coloque uma data entre ${hoje.getFullYear() + minAnos} e ${hoje.getFullYear() + maxAnos}`);
      setInputs((prevInputs) => ({ ...prevInputs, fimVigencia: '' }));
    } else {
      setInputs((prevInputs) => ({ ...prevInputs, fimVigencia: value }));
    }
  };

  async function getCoberturas() {
    try {
      const resp = await services.coberturas();
      setCoberturas(resp.coberturas);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCoberturas();
  }, []);

  function listarCoberturas() {
    return coberturas.map((cobertura, key) => (
      <option key={key} value={cobertura.nome}>
        {cobertura.nome}
      </option>
    ));
  }

  const liberaValorRisco = (e) => {
    const selectedValue = e.target.value;
    setCoberturaSelecionada(selectedValue);
  };

  const onChangeIs = (e) => {
    const vlr = e.target.value;
    const cob = coberturas.find((c) => c.nome === coberturaSelecionada);

    if (!cob) {
      return;
    }

    if (cob.min > vlr || vlr > cob.max) {
      toast.error(`O valor em risco deve estar entre ${cob.min} e ${cob.max}`);
      setDisabledBotao(true);
    } else {
      setDisabledBotao(false);
      setInputs((prevInputs) => ({ ...prevInputs, valorRisco: vlr }));
    }
  };

  const formatarCPF = (value) => {
    const onlyNumbers = value.replace(/[^\d]/g, '');
    const formattedCPF = onlyNumbers.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      '$1.$2.$3-$4'
    );

    return formattedCPF;
  };

  const handleCPFChange = (e) => {
    const { value } = e.target;
    const formattedCPF = formatarCPF(value);

    setInputs((prevInputs) => ({ ...prevInputs, cpf: formattedCPF }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!inputs.nome || !inputs.cpf || !inputs.inicioVigencia || !inputs.fimVigencia || !inputs.valorRisco || !coberturaSelecionada) {
        toast.error('Preencha todos os campos obrigatórios');
        return;
      }

      const salvarInputs = {
        nome: inputs.nome,
        cpf: inputs.cpf,
        inicioVigencia: inputs.inicioVigencia,
        fimVigencia: inputs.fimVigencia,
        coberturas: [coberturaSelecionada],
        valorRisco: inputs.valorRisco,
      };

      const resposta = await services.cadastrarCotacao(salvarInputs);

      if (resposta.success) {
        toast.success('Cotação criada com sucesso');
        localStorage.setItem('cotação', JSON.stringify(resposta));
        setTimeout(() => {
          window.location.href = '/listaCotacao';
        }, 1000);
      } else {
        toast.error('Erro ao criar cotação');
      }
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
      console.log(error);
      toast.error('Erro interno ao processar formulário');
    }
  };

  return (
    <>
      <header className='cabeca-criacao-cotacao'>
        <NavBar />
      </header>

      <main className='main-criacao-cotacao'>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md='12' className='input-criacao-cotacao'>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type='text'
                placeholder='Digite Seu Nome'
                value={inputs.nome}
                onChange={(e) => setInputs({ ...inputs, nome: e.target.value })}
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md='12' className='input-criacao-cotacao'>
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type='text'
                placeholder='CPF (apenas números)'
                name='cpf'
                minLength={11}
                maxLength={14}
                value={inputs.cpf}
                onChange={handleCPFChange}
                required
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md='12' className='input-criacao-cotacao'>
              <Form.Label>Início de Vigência</Form.Label>
              <Form.Control type='date' value={inputs?.inicioVigencia} onChange={handleInicioVigencia} required />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md='12' className='input-criacao-cotacao'>
              <Form.Label>Fim de Vigência</Form.Label>
              <Form.Control type='date' value={inputs?.fimVigencia} onChange={handleFimVigencia} required />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} md='12' className='input-criacao-cotacao'>
              <Form.Label>Cobertura</Form.Label>
              <Form.Select
                placeholder='Cobertura'
                onChange={(e) => {
                  liberaValorRisco(e);
                  onChangeIs(e);
                }}
                value={inputs?.cobertura}
                name='cobertura'
                required
              >
                <option value=''>Selecione</option>
                {coberturas && listarCoberturas()}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} md='12' className='input-criacao-cotacao'>
              <Form.Label>Valor de Risco</Form.Label>
              <Form.Control
                type='number'
                placeholder='Valor de Risco'
                value={inputs?.valorRisco}
                name='valor_risco'
                onChange={(e) => {
                  setInputs((prevInputs) => ({ ...prevInputs, valorRisco: e.target.value }));
                }}
                onBlur={onChangeIs}
                required
                readOnly={!coberturaSelecionada}
              />
            </Form.Group>
          </Row>

          <Button variant='primary' type='submit' disabled={disabledBotao}>
            Elaborar Proposta
          </Button>
        </Form>
      </main>
    </>
  );
};

export default CriacaoCotacao;
