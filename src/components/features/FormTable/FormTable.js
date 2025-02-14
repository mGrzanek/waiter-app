import { useSelector } from "react-redux";
import { useState } from "react";
import { getAllStatuses } from "../../../redux/tablesReducer";
import { Form, Button } from "react-bootstrap";
import clsx from "clsx";
import styles from "./FormTable.module.scss";


const FormTable = ({status, peopleAmount, maxPeopleAmount, bill}) => {
    const statuses = useSelector(getAllStatuses);
    const [currentStatus, setCurrentStatus] = useState(status);
    const [currentPeopleAmount, setCurrentPeopleAmount] = useState(peopleAmount);
    const [currentMaxPeopleAmount, setCurrentMaxPeopleAmount] = useState(maxPeopleAmount);
    const [currentBill, setCurrentBill] = useState(bill);

    return(
        <Form className="col-4">
            <Form.Group className="py-2 d-flex align-items-center py-3">
                <Form.Label className="pt-2 col-2"><b>Status:</b></Form.Label>
                <Form.Select 
                    className="mx-3"
                    value={currentStatus}
                    onChange={e => setCurrentStatus(e.target.value)}
                > 
                    {statuses.map(statusName => 
                        <option key={statusName} value={statusName}>{statusName}</option>)}
                </Form.Select>
            </Form.Group>
            <Form.Group className="py-2 d-flex align-items-centerpy-3">
                <Form.Label className="pt-2 col-2"><b>People:</b></Form.Label>
                <div className="d-flex">
                    <Form.Control 
                        className={clsx(styles.numberInput, "mx-3 text-center")} 
                        type="number"
                        value={currentPeopleAmount}
                        onChange={e => setCurrentPeopleAmount(e.target.value)}
                    /> 
                    <span className="pt-2">/</span>
                    <Form.Control 
                        className={clsx(styles.numberInput, "mx-3 text-center")} 
                        type="number"
                        value={currentMaxPeopleAmount}
                        onChange={e => setCurrentMaxPeopleAmount(e.target.value)}
                    /> 
                </div>
            </Form.Group>
            <Form.Group className="py-2 d-flex align-items-centerpy-3">
                <Form.Label className="col-2 pt-2 "><b>Bill:</b></Form.Label>
                <Form.Control 
                    className={clsx(styles.numberInput, "mx-3 text-center")} 
                    type="number"
                    value={currentBill}
                    onChange={e => setCurrentBill(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" className="my-2">Update</Button>
        </Form>
    );
}

export default FormTable;