import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { getAllStatuses } from '../../../redux/statusReducer';
import { editTableRequest } from "../../../redux/tablesReducer";
import { Form, Button } from "react-bootstrap";
import clsx from "clsx";
import styles from "./FormTable.module.scss";


const FormTable = ({id, status, peopleAmount, maxPeopleAmount, bill}) => {
    const tableStatuses = useSelector(getAllStatuses);
    console.log(tableStatuses);
    const [currentStatus, setCurrentStatus] = useState(status);
    const [currentPeopleAmount, setCurrentPeopleAmount] = useState(peopleAmount);
    const [currentMaxPeopleAmount, setCurrentMaxPeopleAmount] = useState(maxPeopleAmount);
    const [currentBill, setCurrentBill] = useState(bill);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        console.log(status);
        dispatch(editTableRequest({ 
            id, 
            status: currentStatus, 
            peopleAmount: currentPeopleAmount, 
            maxPeopleAmount: currentMaxPeopleAmount, 
            bill: currentBill 
        }));
        navigate("/");
    }

    return(
        <Form onSubmit={handleSubmit} className="col-4">
            <Form.Group className="py-2 d-flex align-items-center py-3">
                <Form.Label className="pt-2 col-2"><b>Status:</b></Form.Label>
                <Form.Select 
                    className="mx-3"
                    value={currentStatus}
                    onChange={e => setCurrentStatus(e.target.value)}
                > 
                    {tableStatuses.map(tableStatus => 
                        <option key={tableStatus.id} value={tableStatus.name}>{tableStatus.name}</option>)}
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

FormTable.propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    peopleAmount: PropTypes.number.isRequired,
    maxPeopleAmount: PropTypes.number.isRequired,
    bill: PropTypes.number.isRequired
}

export default FormTable;