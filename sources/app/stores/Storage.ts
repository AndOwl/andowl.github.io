import { storageInterface } from './storageInterface'
import EmployerModel from '../models/EmployerModel'

import { observable } from 'mobx'

export default class AbstractStorage implements storageInterface {

    protected storage;
    @observable public employers:Array<EmployerModel> = [];

    constructor( storage:storageInterface ) {
        this.storage = storage;
    }


    read( storage ) {
        this.employers = this.storage.read( storage ) ? this.storage.read( storage ) : [];
    }

    write( storage ) {
        this.storage.write( storage, this.employers )
    }

    clear( storage ) {
        this.storage.clear( storage )
    }

    add( employer:EmployerModel ) {
        this.employers.push( employer )
    }

    remove( employer:EmployerModel ) {
        let key = this.employers.findIndex( item => item.id ===  employer.id );
        this.employers.splice(key, 1);
    }
}