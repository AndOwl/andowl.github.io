import { storageInterface } from './storageInterface'

class LocalStorage implements storageInterface {
    read( storageName:string ) {
        return JSON.parse( localStorage.getItem( storageName ) );
    }

    write( storageName:string, storageData ) {
        localStorage.setItem( storageName, JSON.stringify(storageData) )
    }

    clear( storageName:string ) {
        localStorage.removeItem( storageName );
    }
}

export const Storage = new LocalStorage();