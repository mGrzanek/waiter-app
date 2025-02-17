import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { getAllStatuses } from '../../../redux/statusReducer';
import { getByTableNumber } from '../../../redux/tablesReducer';
import { Form, Button } from "react-bootstrap";
import clsx from "clsx";
import styles from "./FormTable.module.scss";
import { useForm } from 'react-hook-form';


const FormTable = ({id, number, status, peopleAmount, maxPeopleAmount, bill, txtBtn, action}) => {
    const [currentNumber, setCurrentNumber] = useState(number || '');
    const [currentStatus, setCurrentStatus] = useState(status || '');
    const [currentPeopleAmount, setCurrentPeopleAmount] = useState(peopleAmount || 0);
    const [currentMaxPeopleAmount, setCurrentMaxPeopleAmount] = useState(maxPeopleAmount || 0);
    const [currentBill, setCurrentBill] = useState(bill || 0);
    const [busyStatus, setBusyStatus] = useState(false);
    const [tableExist, setTableExist] = useState(false);
    
    const tableStatuses = useSelector(getAllStatuses);
    const tableNumberExist = useSelector(state => getByTableNumber(state, currentNumber, id));

    const navigate = useNavigate();

    const { register, handleSubmit: validate, formState: { errors } } = useForm();

    const handleSubmit = () => {
        if(tableNumberExist) setTableExist(true)
        else {
            action({ 
                id,
                number: currentNumber, 
                status: currentStatus, 
                peopleAmount: parseInt(currentPeopleAmount), 
                maxPeopleAmount: parseInt(currentMaxPeopleAmount), 
                bill: parseInt(currentBill) 
            });
            navigate("/");
        }
    };

    useEffect(() => {
        if(currentStatus === "Busy"){
            setBusyStatus(true);
        } else {
            setBusyStatus(false); 
            setCurrentBill(0);
        }
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
        if(isNaN(currentBill) || currentBill < 0) setCurrentBill(0);
    }, [currentBill]);
    
    return(
        <Form onSubmit={validate(handleSubmit)} className="col-9 col-sm-8 col-md-6 col-lg-4">
            <Form.Group className="py-2 d-flex align-items-centerpy-3">
                <Form.Label htmlFor="currentNumber" className="col-sm-4 col-md-4 pt-2 fw-bold">Number:</Form.Label>
                <div className='d-flex align-items-center'>
                    <Form.Control 
                        className={clsx(styles.numberInput, "text-center mx-4")} 
                        {...register("currentNumber", { min: 0, required: true})}
                        id="currentNumber"
                        value={currentNumber}
                        onChange={e => setCurrentNumber(e.target.value)}
                    />
                    {errors.currentNumber && <small className="d-block form-text text-danger mt-2">Required field</small>}
                    {tableExist && !errors.currentNumber &&<small className="d-block form-text text-danger mt-2">This number exist</small>}
                </div>
            </Form.Group>
            <Form.Group className="py-2 d-flex align-items-center py-3">
                <Form.Label htmlFor="currentStatus" className="col-sm-4 col-md-4 pt-2 fw-bold">Status:</Form.Label>
                <Form.Select 
                    {...register("currentStatus", { required: true, validate: value => value !== "default" })}
                    className="mx-4"
                    id="currentStatus"
                    value={currentStatus}
                    onChange={e => setCurrentStatus(e.target.value)}
                >   
                    <option value="default">Select status...</option>
                    {tableStatuses.map(tableStatus => 
                        <option key={tableStatus.id} value={tableStatus.name}>{tableStatus.name}</option>)}
                </Form.Select>
                {errors.currentStatus && <small className="d-block form-text text-danger mt-2">Status is required</small>}
            </Form.Group>
            <Form.Group className="py-2 d-flex align-items-center py-3">
                <Form.Label htmlFor="currentPeople" className="col-sm-4 col-md-4 pt-2 fw-bold">People:</Form.Label>
                <div className="d-flex">
                    <Form.Control 
                        className={clsx(styles.numberInput, "mx-4 text-center")} 
                        type="number"
                        data-testid="people-amount"
                        {...register("currentPeopleAmount", { min: 0, max: 10, required: true })}
                        value={currentPeopleAmount}
                        onChange={e => setCurrentPeopleAmount(e.target.value)}
                    />
                    {errors.currentPeopleAmount && <small className="d-block form-text text-danger mt-2">Required field</small>}
                    <span className="pt-2">/</span>
                    <Form.Control 
                        className={clsx(styles.numberInput, "mx-4 text-center")} 
                        type="number"
                        data-testid="max-people-amount"
                        {...register("currentMaxPeopleAmount", { min: 0, max: 10, required: true })}
                        value={currentMaxPeopleAmount}
                        onChange={e => setCurrentMaxPeopleAmount(e.target.value)}
                    />
                    {errors.currentMaxPeopleAmount && <small className="d-block form-text text-danger mt-2">Required field</small>}
                </div>
            </Form.Group>
            {busyStatus && <Form.Group className="py-2 d-flex align-items-center py-3">
                <Form.Label htmlFor="currentBillId" className="col-sm-4 col-md-4 pt-2 fw-bold">Bill:</Form.Label>
                <div className='mx-4 d-flex align-items-center'>
                    <span>$</span>
                    <Form.Control 
                        className={clsx(styles.numberInput, "mx-2 text-center")} 
                        {...register("currentBill", { min: 0, required: true})}
                        id="currentBillId"
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
    id: PropTypes.string,
    number: PropTypes.string,
    status: PropTypes.string,
    peopleAmount: PropTypes.number,
    maxPeopleAmount: PropTypes.number,
    bill: PropTypes.number,
    txtBtn: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
}

export default FormTable;