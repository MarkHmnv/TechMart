import Header from "./components/Header";
import {Container} from "react-bootstrap";
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';
import "react-toastify/dist/ReactToastify.min.css"
import {ToastContainer} from "react-toastify";

const App = () => {
  return (
    <>
        <Header/>
        <main className="py-3">
          <Container>
              <Outlet/>
          </Container>
        </main>
        <Footer/>
        <ToastContainer />
    </>
  );
}

export default App;
