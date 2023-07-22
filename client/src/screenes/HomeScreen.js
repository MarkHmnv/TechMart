import {Col, Row} from "react-bootstrap";
import Product from "../components/Product";
import {useGetProductsQuery} from "../redux/slices/productsSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

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
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Latest Products</h1>
                </div>
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </>)}
        </>
    );
};

export default HomeScreen;