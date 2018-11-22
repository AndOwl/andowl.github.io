export interface storageInterface {
    read( storageName ),
    write( storageName, storageData ),
    clear( storageName )
}