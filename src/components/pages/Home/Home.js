import { Container } from "react-bootstrap";
import Tables from "../../features/Tables/Tables";

const Home = () => {
    return(
        <Container>
            <h1>All Tables:</h1>
            <Tables />
        </Container>
    );
}

export default Home;