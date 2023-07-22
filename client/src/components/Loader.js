import {Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <Spinner
        animation="border"
        role="status"
        className="loader"
        />
    );
};

export default Loader;
