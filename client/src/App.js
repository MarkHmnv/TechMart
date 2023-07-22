import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import {Container} from "react-bootstrap";
import Footer from "./components/Footer";
import {Outlet} from "react-router-dom";
import './assets/styles/main.css';

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
    </>
  );
}

export default App;