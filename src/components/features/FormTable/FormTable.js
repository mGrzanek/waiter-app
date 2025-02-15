import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { getAllStatuses } from '../../../redux/statusReducer';
import { editTableRequest } from "../../../redux/tablesReducer";
import { Form, Button } from "react-bootstrap";
import clsx from "clsx";
import styles from "./FormTable.module.scss";
import { useForm } from 'react-hook-form';


const FormTable = ({id, status, peopleAmount, maxPeopleAmount, bill, txtBtn}) => {
    const [currentStatus, setCurrentStatus] = useState(status);
    const [currentPeopleAmount, setCurrentPeopleAmount] = useState(peopleAmount);
    const [currentMaxPeopleAmount, setCurrentMaxPeopleAmount] = useState(maxPeopleAmount);
    const [currentBill, setCurrentBill] = useState(bill);
    const [busyStatus, setBusyStatus] = useState(false);
    
    const tableStatuses = useSelector(getAllStatuses);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit: validate, formState: { errors } } = useForm();

    const handleSubmit = e => {
        //e.preventDefault();
        dispatch(editTableRequest({ 
            id, 
            status: currentStatus, 
            peopleAmount: parseInt(currentPeopleAmount), 
            maxPeopleAmount: parseInt(currentMaxPeopleAmount), 
            bill: parseInt(currentBill) 
        }));
        navigate("/");
    };

    useEffect(() => {
        if(currentStatus === "Busy"){
            setBusyStatus(true);
            setCurrentBill(0);
        } else setBusyStatus(false); 

        if(currentStatus === "Cleaning" 
            || currentStatus === "Free") setCurrentPeopleAmount(0);
    }, [currentStatus]);

    useEffect(() => {
        if(currentPeopleAmount > currentMaxPeopleAmount) setCurrentPeopleAmount(currentMaxPeopleAmount);
        if(currentMaxPeopleAmount > 10) setCurrentMaxPeopleAmount(10);
        if(currentMaxPeopleAmount < 0) setCurrentMaxPeopleAmount(0);
        if(currentPeopleAmount < 0) setCurrentPeopleAmount(0);
    }, [currentPeopleAmount, currentMaxPeopleAmount]);

    useEffect(() => {
        if(currentBill < 0) setCurrentBill(0);
    }, [currentBill]);
    
    return(
        <Form onSubmit={validate(handleSubmit)} className="col-4">
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
                        {...register("currentPeopleAmount", { min: 0, max: 10, required: true })}
                        value={currentPeopleAmount}
                        onChange={e => setCurrentPeopleAmount(e.target.value)}
                    />
                    {errors.currentPeopleAmount && <small className="d-block form-text text-danger mt-2">Required field</small>}
                    <span className="pt-2">/</span>
                    <Form.Control 
                        className={clsx(styles.numberInput, "mx-3 text-center")} 
                        type="number"
                        {...register("currentMaxPeopleAmount", { min: 0, max: 10, required: true })}
                        value={currentMaxPeopleAmount}
                        onChange={e => setCurrentMaxPeopleAmount(e.target.value)}
                    />
                    {errors.currentMaxPeopleAmount && <small className="d-block form-text text-danger mt-2">Required field</small>}
                </div>
            </Form.Group>
            {busyStatus && <Form.Group className="py-2 d-flex align-items-centerpy-3">
                <Form.Label className="col-2 pt-2 "><b>Bill:</b></Form.Label>
                <div className='d-flex align-items-center'>
                    <span>$</span>
                    <Form.Control 
                        className={clsx(styles.numberInput, "mx-3 text-center")} 
                        type="number"
                        {...register("currentBill", { min: 0, required: true})}
                        value={currentBill}
                        onChange={e => setCurrentBill(e.target.value)}
                    />
                    {errors.currentBill && <small className="d-block form-text text-danger mt-2">Required field</small>}
                </div>
            </Form.Group>}
            <Button type="submit" className="my-2">{txtBtn}</Button>
        </Form>
    );
}

FormTable.propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    peopleAmount: PropTypes.number.isRequired,
    maxPeopleAmount: PropTypes.number.isRequired,
    bill: PropTypes.number.isRequired,
    txtBtn: PropTypes.string.isRequired
}

export default FormTable;