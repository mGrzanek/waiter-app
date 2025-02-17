import { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import PropTypes from 'prop-types';

const ModalPage = ({action, children}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className='bg-transparent border-0 text-primary' onClick={handleShow}>
                {children}
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>This action will completely remove this table from the app. Are you sure you want to do this?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={action}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

ModalPage.propTypes = {
    action: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}

export default ModalPage;
