import { Spinner } from "react-bootstrap";

const Loader = () => {
    return(
        <div className="d-flex justify-content-center align-items-center flex-column m-4 p-2">
            <Spinner animation="border" variant="primary" />
            <p>Loading...</p>
        </div>
    );
}

export default Loader;