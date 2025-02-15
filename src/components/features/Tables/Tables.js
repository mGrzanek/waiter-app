import { ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllTables } from "../../../redux/tablesReducer";
import { useSelector } from "react-redux";
import Loader from "../../common/Loader/Loader";
import { NavLink } from "react-router-dom";

const Tables = () => {
    const tables = useSelector(getAllTables);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const loadingTime = setTimeout(() => {
            setLoader(false);
        }, 250);
        return () => clearTimeout(loadingTime);
    }, [tables]);

    return(
        <>
            {loader && <Loader />}
            {!loader && <ListGroup className="pt-4">
                {tables.map(table => 
                <ListGroup.Item key={table.id} className="p-3 d-flex justify-content-between align-items-center border-0 border-bottom ">
                    <div className="d-flex align-items-center">
                        <h2>Table {table.number}</h2>
                        <span className="px-4"><b>Status:</b> {table.status}</span>
                    </div>
                    <div>
                        <Button as={NavLink} to={`/table/${table.id}`} variant="primary">Show more</Button>
                    </div>
                </ListGroup.Item>)}
            </ListGroup>}
        </>
    );
}

export default Tables;