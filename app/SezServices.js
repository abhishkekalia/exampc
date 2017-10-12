import Realm from 'realm';
import SezModel from './SezModel';
import CaptureModel from './CaptureModel';

const CaptureSchema = {
    name        : 'Capture',
    primaryKey  : 'id',
    properties  : {
        id          : { type : 'string', indexed : true },
        job_id        : { type : 'string' },
        Uri         : 'string',
        type        : 'string',
        completed   : 'bool',
        createdAt   : 'date',
    }
};

const ContainerSchema = {
    name        : 'Sez',
    primaryKey  : 'id',
    properties  : {
        id          : { type : 'string', indexed : true},
        job_id      : 'string',
        container_id :'string',
        container_no: 'string',
        completed   : 'bool',
        createdAt   : 'date',
        updatedAt   : 'date',
    }
};

let repository = new Realm({schema  : [CaptureSchema, ContainerSchema,]});

let SezServices = {
    findAll: function(sortBy) {
        if (!sortBy) sortBy = [['completed', false], ['updatedAt', true]];
        return repository.objects('Sez').sorted(sortBy);
    },

    save: function(sez) {
        if (repository.objects('Sez').filtered("container_id = '" + sez.container_id + "'").length) return;

        repository.write(() => {
            sez.updatedAt = new Date();
            repository.create('Sez', sez);
        })
    },

    delete: function(sez){ 
        let all_containers = repository.objects('Sez');
        repository.write(() => {
            repository.delete(all_containers);
        })
    },

// ----------------#picture table ----------------

    capture_save: function(pictures, s_id ) {
        if (repository.objects('Capture').filtered("Uri = '" + pictures.Uri + "'").length) return;

        repository.write(() => {
          pictures.updatedAt = new Date();
          repository.create('Capture', pictures);
        })
    },

    findPictures : function(sortBy) {
        if (!sortBy) sortBy = [['completed', false]];
        return repository.objects('Capture');
    },

    getRow: function (sez) {
        let picture = repository.objects('Capture');
        return picture.length;
    },

    getPhoto : function (sez, type, sortBy) {
        if (!sortBy) sortBy = [['completed', false]];
        const container = repository.objects('Capture').filtered("job_id = '" + sez + "' AND type ='"+ type+"' " )
        return container;
    },
};

module.exports = SezServices;
