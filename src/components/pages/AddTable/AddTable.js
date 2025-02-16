import FormTable from "../../features/FormTable/FormTable";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTableRequest } from "../../../redux/tablesReducer";

const AddTable = () => {
    const dispatch = useDispatch();
    const add = table => {
        dispatch(addTableRequest(table));
    }

    return(
        <Container data-testid="add-table-section">
            <h2>Add Table</h2>
            <FormTable txtBtn="Add" action={add} />
        </Container>
        
    );
}

export default AddTable;