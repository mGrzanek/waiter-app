import { ListGroup, Button } from "react-bootstrap";
import { removeTableRequest } from "../../../redux/tablesReducer";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./TableListItem.module.scss";
import ModalPage from "../ModalPage/ModalPage";

const TableListItem = ({ id, number, status }) => {
    const dispatch = useDispatch();

    const remove = ()=> {
        dispatch(removeTableRequest(id))
    }
    return (
        <ListGroup.Item key={id} className="p-3 d-flex justify-content-between align-items-center border-0 border-bottom ">
            <div className="d-flex align-items-center">
                <h2 className={styles.tableNumber}>Table {number}</h2>
                <span className={clsx(styles.elemInput, "px-4")}><b>Status:</b> {status}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <ModalPage children={<i className={clsx(styles.trashIcon, "fa fa-trash")} />} action={remove} />
                <Button as={NavLink} to={`/table/${id}`} variant="primary" className={clsx(styles.elemInput, "mx-4")}>Show more</Button>
            </div>
        </ListGroup.Item>
    );
}

export default TableListItem;