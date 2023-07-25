import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const {accessToken} = useSelector(state => state.auth);
    return accessToken ? <Outlet /> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;
