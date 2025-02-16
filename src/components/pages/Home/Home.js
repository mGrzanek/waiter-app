import { Container } from "react-bootstrap";
import Tables from "../../features/Tables/Tables";
import styles from "./Home.module.scss";

const Home = () => {
    return(
        <Container data-testid="home-section">
            <h1 className={styles.homeTitle}>All Tables:</h1>
            <Tables />
        </Container>
    );
}

export default Home;