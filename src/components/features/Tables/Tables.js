import { ListGroup, Button } from "react-bootstrap";
import { getAllTables } from "../../../redux/tablesReducer";
import { useSelector } from "react-redux";

const Tables = () => {
    const tables = useSelector(getAllTables);
    return(
        <ListGroup className="py-4 border-0">
            {tables.map(table => 
            <ListGroup.Item className="p-3 d-flex justify-content-between align-items-center border-0 border-bottom ">
                <div className="d-flex align-items-center">
                    <h2>Table {table.id}</h2>
                    <span className="px-4"><b>Status:</b> {table.status}</span>
                </div>
                <div>
                    <Button variant="primary">Show more</Button>
                </div>
            </ListGroup.Item>)}
        </ListGroup>
    );
}

export default Tables;