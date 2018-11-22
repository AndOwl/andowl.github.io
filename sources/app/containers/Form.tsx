import * as React from 'react'
import { observer } from 'mobx-react'
import { Row, Col, FormGroup, ControlLabel, FormControl, Radio, Checkbox, Panel } from 'react-bootstrap'

import * as moment from 'moment'
import * as ruLocale from 'moment/locale/ru'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
moment.locale('ru', ruLocale);
export interface IProps {
    handleChange: any,
    employer: {
        data: {
            fullName: string,
            sex: string,
            birth: Date,
            position: string,
            fired: boolean
        }
    }
}

@observer
export default class FormContainer extends React.Component<IProps, {}> {

    render() {
        const { employer, handleChange } = this.props;
        return (
            <Panel>
                <Panel.Body>
                    <Row>
                        <Col xs={12} >
                            <FormGroup>
                                <ControlLabel>Ф.И.О:</ControlLabel>
                                <FormControl
                                    type="text"
                                    name="fullName"
                                    value={ employer.data.fullName }
                                    placeholder="Введите данные"
                                    onChange={ handleChange('fullName') } />
                            </FormGroup>

                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <strong>Дата рождения:</strong>
                            <DatePicker className="form-control col-xs-12"
                                        selected={ new Date(employer.data.birth) }
                                        onChange={ handleChange('birth') }
                                        dateFormat="MMMM d, yyyy" />
                        </Col>
                        <Col xs={6} >
                            <FormGroup>
                                <strong className="col-xs-12 input-group">Пол:</strong>
                                <Radio name="radioGroup" inline value="male"
                                       onChange={ handleChange('sex') }
                                       checked={ employer.data.sex === 'male' } >
                                    муж
                                </Radio>
                                <Radio name="radioGroup" inline value="female"
                                       onChange={ handleChange('sex') }
                                       checked={ employer.data.sex === 'female' } >
                                    жен
                                </Radio>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} >
                            <FormGroup>
                                <ControlLabel>Должность:</ControlLabel>
                                <FormControl componentClass="select"
                                             onChange={ handleChange('position') }
                                             value={ employer.data.position } >

                                    <option value="">выберите должность</option>
                                    <option value="Отец Гаскойн">Отец Гаскойн</option>
                                    <option value="Викарий Амелия">Викарий Амелия</option>
                                    <option value="Кровоглот">Кровоглот</option>
                                    <option value="Тень Ярнама">Тень Ярнама</option>
                                </FormControl>

                                <Checkbox
                                    checked={ employer.data.fired }
                                    onChange={ handleChange('fired') }>
                                    Уволен
                                </Checkbox>
                            </FormGroup>
                        </Col>
                    </Row>
                </Panel.Body>
            </Panel>
        )
    }
}