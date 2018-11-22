import * as React from 'react'
import { observer } from 'mobx-react'

export interface IProps {
    handleAdd: any
    handleSave: any
    handleRead: any
    handleClear: any
    handleRemove: any
    employers: number
    employerId: number
}

@observer
export default class Buttons extends React.Component<IProps> {

    render() {
        const {
            handleAdd,
            handleSave,
            handleRead,
            handleRemove,
            handleClear,
            employers,
            employerId } = this.props;

        const defaultClass:string = "btn btn-info";
        const disabledSave:string = ( employers > 0 || employerId !== 0 ) ? '': 'disabled';
        const disabledDelete:string = employerId > 0 ? '' : 'disabled';
        return (
            <div className="center-block btn-group-vertical" role="group">
                <button onClick={ handleAdd } className={ defaultClass }>Добавить</button>
                <button onClick={ handleSave } className={ `${defaultClass} ${disabledSave}` }>Сохранить</button>
                <button onClick={ handleRead } className={ defaultClass }>Обновить</button>
                <button onClick={ handleRemove } className={ `${defaultClass} ${disabledDelete}` }>Удалить</button>
                <button onClick={ handleClear } className={ defaultClass }>Очистить</button>
            </div>
        )
    }
}