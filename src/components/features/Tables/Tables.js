import { ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAllTables } from "../../../redux/tablesReducer";
import { useSelector } from "react-redux";
import Loader from "../../common/Loader/Loader";
import TableListItem from "../../views/TableListItem/TableListItem";

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
                    <TableListItem key={table.id} {...table} />
                )}
            </ListGroup>}
        </>
    );
}

export default Tables;