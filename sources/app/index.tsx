import * as React from 'react'
import {computed, observable} from 'mobx'
import { observer, inject } from 'mobx-react'
import { Row, Col } from 'react-bootstrap'

//хранилище
import AbstractStorage from './stores/Storage';
import EmployerModel from './models/EmployerModel'

//контейнеры
import EmployerForm from './containers/Form';
import Buttons from './containers/Buttons'
import EmployersList from './containers/List'
import ModalError from './containers/ModalError'

interface IProps {
    store?: AbstractStorage
}

interface IState {
    employer: EmployerModel
    employerUnsaved: boolean
    modal: {
        show: boolean,
        message: string
        callback: string
    }
}

@inject('store')
@observer
export default class Panel extends React.Component<IProps, IState> {
    /* хранилище, в которое будет производится запись. текущем случае строка, т.к используем localStorage */
    readonly STORAGE: 'list';

    /* состояние инициализации */
    state: IState = {
        employer: {
            id: 0,
            data: {
                sex: '',
                friends: [],
                fired: false,
                fullName: '',
                position: '',
                birth: new Date()
            }
        },
        employerUnsaved: false,
        modal: {
            show: false,
            message: '',
            callback: ''
        }
    };

    @observable employer = this.state.employer;
    @observable employerUnsaved = this.state.employerUnsaved;
    @observable modal = this.state.modal;

    @computed get countEmployers():number {
        return this.props.store.employers.length
    }

    @computed get validForm():boolean {
        return (this.employer.data.fullName.length !== 0 && this.employer.data.position.length !== 0)
    }

    handleChange = fieldName => (event: any) => {

        let value:any;

        if ( fieldName === 'birth' ) value = new Date(event.getFullYear(), event.getMonth(), event.getDate());
        else  value = event.currentTarget.value;

        this.employer.data = {
            ...this.employer.data,
            [fieldName]: value
        };

        if( this.employer.id !== 0 && !this.state.employerUnsaved ) this.employerUnsaved = true
    };

    /**
     * добавление сотрудника в список
     */
    handleAdd() {
        if ( this.validForm ) {
            let newEmployer = new EmployerModel( this.employer );
            this.props.store.add( newEmployer );

            this.handleSelect(newEmployer.id);
            this.employerUnsaved = true;
        }
    }

    /**
     * сохранение списка в хранилище
     */
    handleSave() {
        if( this.countEmployers > 0 ) {
            if (this.employerUnsaved) this.updateEmployers();
            this.props.store.write( this.STORAGE );
        }
    }

    /**
     * изменение информации о сотруднике в списке
     */
    updateEmployers() {
        const { employers } = this.props.store;
        employers.map( item => {
            if (item.id === this.employer.id) Object.assign(item, this.employer)
        });

        this.employerUnsaved = false;
    }

    /**
     * чтение списка из хранилища.
     * выдаст окно с ошибкой в случае если есть несохранённый сотрудник
     */
    handleRead() {
        if ( !this.employerUnsaved ) this.props.store.read( this.STORAGE );
        else this.showModal( 'Есть не сохранённые данные. Продолжить без сохранения?', 'read')
    }

    /**
     * удаление сотрудника из списка.
     * сбросит активного сотрудника( в тз этого небыло, но по другому у меня не получилось пока )
     */
    handleRemove() {
        if( this.employer.id !== 0 ) {
            this.props.store.remove( this.employer );
            this.employer = this.state.employer;
            this.employerUnsaved = true;
        }
    }

    /**
     * очистка списка в хранилище.
     * подтверждение очистки не реализовано
     */
    handleClear() {
        this.props.store.clear( this.STORAGE );
    }

    handleSelect( id:number ) {
        let selected = this.props.store.employers.find( item => item.id === id);
        if (selected) Object.assign(this.employer, selected);
    }

    /**
     * показ модального окна.
     * в параметры принимает сообщеине об ошибке и "коллбек"
     */
    showModal( message:string, callback ) {
        this.modal.show = !this.modal.show;
        this.modal.message = message;
        this.modal.callback = callback
    }

    /**
     * эвент закрытия попапа.
     * обрабатывает переданый параметр, в зависимости от него запускает необходиую ветку
     */
    closeModal( callback ) {
        switch( callback ) {
            case 'read':
                this.employerUnsaved = false;
                this.modal = this.state.modal;
                this.handleRead();
                break;
            default:
                this.modal = this.state.modal;
                break;
        }
    }

    render() {
        const { store } = this.props;
        return (
            <Row className="col-xs-12">
                <Row><h3 className="col-xs-12 text-center">Панель Сотрудников:</h3></Row>
                <hr className="my-4"/>
                <Row>
                    {   this.modal.show &&
                        <ModalError message={ this.modal.message }
                                    callback={ this.modal.callback }
                                    closeModal={ this.closeModal.bind(this) } />
                    }
                    <Col xs={4}>
                        <EmployerForm handleChange={ this.handleChange.bind(this) }
                                      employer={ this.employer } />
                    </Col>
                    <Col xs={4}>
                        <Buttons employers={ this.countEmployers }
                            employerId={ this.employer.id }
                            handleAdd={ this.handleAdd.bind(this)  }
                            handleSave={ this.handleSave.bind(this) }
                            handleRead={ this.handleRead.bind(this) }
                            handleRemove={ this.handleRemove.bind(this) }
                            handleClear={ this.handleClear.bind(this) } />
                    </Col>
                    <Col xs={4}>
                        {   this.countEmployers > 0 &&
                            <EmployersList
                                employers={ store.employers }
                                employerId = { this.employer.id }
                                handleSelect={ this.handleSelect.bind(this) } />
                        }
                    </Col>
                </Row>
            </Row>
        )
    }
}