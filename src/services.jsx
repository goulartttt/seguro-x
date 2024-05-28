import axios from 'axios'

const configApi = axios.create({
    baseURL:'http://localhost:3001/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  configApi.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers['token'] = token;
  
    return config;
  });
  

  const services = {
    cadastro: async (parms) => {
      const resp = await  configApi.post('/users/cadastro', parms)
      return resp.data
    },
    login:async (parms)=> {
      const resp =  await configApi.post('/users/login', parms)
      return resp.data
    },
    verificarAutenticacao:async (parms)=> {
      const resp =  await configApi.get('/verificar-autenticacao', parms)
      return resp.data
    },
    coberturas:async (parms)=> {
      const resp =  await configApi.get('/coberturas', parms)
      return resp.data
    },
    cadastrarCotacao:async (parms)=> {
      const resp =  await configApi.post('/cotacao/cadastro', parms)
      return resp.data
    },
    obterDadosCotacao:async (parms)=> {
      const resp =  await configApi.get('/obterDadosCotacao/' + parms)
      return resp.data
    },
    listaCotacao:async ()=> {
      const resp =  await configApi.get('/listaCotacao')
      return resp.data
    },
    salvarEdicao:async (parms)=> {
      const resp =  await configApi.post('/salvarEdicao', parms);
      return resp.data
    },
    criarProposta: async (parms) => {
      const resp = await configApi.get('/proposta/'+ parms);
      return resp.data;
    },
    apolice:async (parms)=> {
      const resp =  await configApi.post('/apolice', parms);
      return resp.data
    },
    listaApolice:async ()=> {
      const resp =  await configApi.get('/listaApolice')
      return resp.data
    },
    obterDadosApolice:async (parms)=> {
      const resp =  await configApi.get('/obterDadosApolice/' + parms)
      return resp.data
    },
    
};

export default services