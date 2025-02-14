import { ListGroup, Button } from "react-bootstrap";
import { getAllTables } from "../../../redux/tablesReducer";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Tables = () => {
    const tables = useSelector(getAllTables);
    if(!tables) return <h4>Loading...</h4>
    return(
        <ListGroup className="pt-4">
            {tables.map(table => 
            <ListGroup.Item key={table.id} className="p-3 d-flex justify-content-between align-items-center border-0 border-bottom ">
                <div className="d-flex align-items-center">
                    <h2>Table {table.id}</h2>
                    <span className="px-4"><b>Status:</b> {table.status}</span>
                </div>
                <div>
                    <Button as={NavLink} to={`/table/${table.id}`} variant="primary">Show more</Button>
                </div>
            </ListGroup.Item>)}
        </ListGroup>
    );
}

export default Tables;