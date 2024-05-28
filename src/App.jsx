
  import './App.css';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import Login from './pages/LogIn';
  import SingUp from './pages/SingUp';
  import Home from './pages/Home';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import ListaCotacao from './pages/ListaCotacao';
  import Editar from './componentes/Editar'
  import CriacaoCotacao from './pages/CriacaoCotacao';
  import CriacaoProposta from './pages/CriacaoProposta';
  import ListaApolice from './pages/ListaApolice';
  import VizualizarApolice from './componentes/VisualizarApolice'

  function App() {
    return (
      <div className="App">
          <ToastContainer theme={'colored'}/>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/singup" element={<SingUp />} />
            <Route path="/editar/:indice" element={<Editar />} />        
            <Route path="/cotacao/:view/:indice" element={<Editar />} />           
            <Route path="/listacotacao" element={<ListaCotacao />} />
            <Route path="/criacaocotacao" element={<CriacaoCotacao />} />
            <Route path="/proposta/:indice" element={<CriacaoProposta />} />
            <Route path="/listaApolice" element={<ListaApolice />} />
            <Route path="/apolice/:num_doc" element={<VizualizarApolice />} />
          </Routes>
        </Router>
      </div>
    );
  }

  export default App;