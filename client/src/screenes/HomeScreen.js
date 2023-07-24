import {Col, Row} from "react-bootstrap";
import Product from "../components/Product";
import {useGetProductsQuery} from "../redux/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Title from "../components/Title";

const HomeScreen = () => {
    const {data: products, error, isLoading} = useGetProductsQuery();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (<>
                <Title title={"Latest Products"}/>
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </>)}
        </>
    );
};

export default HomeScreen;