import { useParams } from "react-router";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getTableById, editTableRequest } from "../../../redux/tablesReducer";
import { Container} from "react-bootstrap";
import FormTable from "../../features/FormTable/FormTable";

const Table = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const table = useSelector(state => getTableById(state, id));

    const editTable = table => {
        dispatch(editTableRequest(table));
    }

    if(!table) return <Navigate to="/" />
    else return(
        <Container>
            <h4>Table {table.id}</h4>
            <FormTable txtBtn="Update" {...table} action={editTable} />
        </Container>
    );
}

export default Table;