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
        if (repository.objects('Sez').filtered("container_no = '" + sez.container_no + "'").length) return;

        repository.write(() => {
            sez.updatedAt = new Date();
            repository.create('Sez', sez);
        })
    },

    update: function(sez, callback) {
        if (!callback) return;
        repository.write(() => {
          callback();
          sez.updatedAt = new Date();
        });
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

    getData : function (sez) {
        const id = sez;
        const container = repository.objects('Sez').filtered("id = '" + id + "'")
    //    console.warn(container);
        return container[0].container_no;
    },
};

/*SezServices.picture_save(new PicturesModel('Hello Koding', '12'));
SezServices.picture_save(new PicturesModel('Make a Todo App with React Native' , '12'));
SezServices.save(new SezModel('Check to complete a todo'));
SezServices.save(new SezModel('Long press, drag and drop a todo to sort'));
SezServices.save(new SezModel('Save data with Realm'));
SezServices.save(new SezModel('Sync data with Firebase'));
*/
module.exports = SezServices;
