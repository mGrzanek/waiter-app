import FormTable from "../../features/FormTable/FormTable";
import { Container } from "react-bootstrap";

const AddTable = () => {
    return(
        <Container>
            <h2>Add Table</h2>
            <FormTable txtBtn="Add" />
        </Container>
        
    );
}

export default AddTable;