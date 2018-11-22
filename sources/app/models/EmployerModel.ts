import { observable } from 'mobx'

export default class EmployerModel {

    readonly id: number = Math.random();

    @observable
    public data: {
        birth:    any,
        sex:      string,
        fullName: string,
        position: string,
        fired:    boolean
        friends?: Array<object>
    };

    constructor ( employer ) {
        this.data = {
            sex:      employer.data.sex,
            fired:    employer.data.fired,
            birth:    employer.data.birth,
            friends:  employer.data.friends,
            fullName: employer.data.fullName,
            position: employer.data.position
        };
    }
}