import * as React from 'react'
import { observer } from 'mobx-react'
import { Panel } from 'react-bootstrap'

interface IProps {
    employers: Array<any>,
    employerId: number
    handleSelect: Function,
}

@observer
export default class EmployersList extends React.Component<IProps, {}> {

    render() {
        const { employers, handleSelect, employerId } = this.props;
        return employers.map(
            employer => {
                return (
                    <Panel id={`${employer.id}`} key={employer.id} className="panel panel-primary" >
                        <Panel.Body className={`${employer.id === employerId ? 'bg-primary': ''}`}
                                    onClick={ handleSelect.bind(this, employer.id) }>
                            <div className="col-xs-6">{ employer.data.fullName }</div>
                            <div className="col-xs-6">{ employer.data.position }</div>
                        </Panel.Body>

                    </Panel>
                )
            }
        )
    }
}