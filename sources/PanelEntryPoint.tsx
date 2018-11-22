import * as React from 'react'
import { Provider }  from 'mobx-react'
import { Well } from 'react-bootstrap'

// import PanelStore from './app/stores/indexStore'
import AbstractStorage from './app/stores/Storage'
import { Storage } from './app/stores/localStorage'
import PlaceHolder from './app/index'

export default class Panel extends React.Component {
    render() {
        return (
            <Provider store={ new AbstractStorage( Storage ) }>
                <Well className="col-xs-12">
                    <PlaceHolder />
                </Well>
            </Provider>
        )
    }
}