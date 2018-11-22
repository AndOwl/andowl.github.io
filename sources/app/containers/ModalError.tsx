import * as React from 'react'
import { observer } from 'mobx-react'
import { Modal, Button } from 'react-bootstrap'

interface IProps {
    message: string
    callback: any
    closeModal: any
}

@observer
export default class ModalError extends React.Component<IProps>  {

    render() {
        const {message, callback, closeModal} = this.props;
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Что-то пошло не так</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{message}</Modal.Body>

                    <Modal.Footer>
                        <Button onClick={ closeModal.bind(this, callback ) }>Продолжить</Button>
                        <Button onClick={ closeModal.bind(this) }>Отмена</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )
    }
}