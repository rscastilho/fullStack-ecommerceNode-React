import './App.css';
import Footer from './components/Footer/Footer';
import Main from './components/Main/Main';
import NavBar from './components/Navbar/NavBar';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <NavBar />
          <Main />
        </BrowserRouter>
        <Footer />
        <ToastContainer />
      </AuthContextProvider>
    </>
  );
}

export default App;
