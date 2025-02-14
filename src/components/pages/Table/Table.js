import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { getTableById } from "../../../redux/tablesReducer";
import { Container} from "react-bootstrap";
import FormTable from "../../features/FormTable/FormTable";

const Table = () => {
    const { id } = useParams();
    const table = useSelector(state => getTableById(state, id));

    if(!table) return <h2>Loading...</h2>
    else return(
        <Container>
            <h4>Table {table.id}</h4>
            <FormTable {...table} />
        </Container>
    );
}

export default Table;