import { Col, Container, Row } from "react-bootstrap";
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; {currentYear} TechMart
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;