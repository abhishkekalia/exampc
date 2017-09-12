import Realm from 'realm';
import SezModel from './SezModel';
import PicturesModel from './PicturesModel';

const SealSchema = {
    name        : 'Seal',
    primaryKey  : 'id',
    properties  : {
        id          : { type : 'string', indexed : true },
        c_id        : { type : 'string' },
        Uri         : 'string',
        completed   : 'bool',
        createdAt   : 'date',
    }
};

const DoorSchema = {
    name        : 'Door',
    primaryKey  : 'id',
    properties  : {
        id          : { type : 'string', indexed : true },
        c_id        : { type : 'string' },
        Uri         : 'string',
        completed   : 'bool',
        createdAt   : 'date',
    }
};

const InsideSchema = {
    name        : 'Inside',
    primaryKey  : 'id',
    properties  : {
        id          : { type : 'string', indexed : true },
        c_id        : { type : 'string' },
        Uri         : 'string',
        completed   : 'bool',
        createdAt   : 'date',
    }
};

const OutsideSchema = {
    name        : 'Outside',
    primaryKey  : 'id',
    properties  : {
        id          : { type : 'string', indexed : true },
        c_id        : { type : 'string' },
        Uri         : 'string',
        completed   : 'bool',
        createdAt   : 'date',
    }
};

const ContainerSchema = {
    name        : 'Sez',
    primaryKey  : 'id',
    properties  : {
        id          : { type : 'string', indexed : true},
        container_no: 'string',
        completed   : 'bool',
        createdAt   : 'date',
        updatedAt   : 'date',
    }
};

let repository = new Realm({schema  : [SealSchema, ContainerSchema, DoorSchema , InsideSchema, OutsideSchema]});

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

    seal_save: function(pictures, s_id ) {
        if (repository.objects('Seal').filtered("Uri = '" + pictures.Uri + "'").length) return;

        repository.write(() => {
          pictures.updatedAt = new Date();
          repository.create('Seal', pictures);
        })
    },

    door_save: function(pictures, s_id ) {
        if (repository.objects('Door').filtered("Uri = '" + pictures.Uri + "'").length) return;

        repository.write(() => {
          pictures.updatedAt = new Date();
          repository.create('Door', pictures);
        })
    },
    inside_save: function(pictures, s_id ) {
        if (repository.objects('Inside').filtered("Uri = '" + pictures.Uri + "'").length) return;

        repository.write(() => {
          pictures.updatedAt = new Date();
          repository.create('Inside', pictures);
        })
    },
    outside_save: function(pictures, s_id ) {
        if (repository.objects('Outside').filtered("Uri = '" + pictures.Uri + "'").length) return;

        repository.write(() => {
          pictures.updatedAt = new Date();
          repository.create('Outside', pictures);
        })
    },

    findPictures: function(sortBy) {
        if (!sortBy) sortBy = [['completed', false]];
        return repository.objects('Seal').sorted(sortBy);
    },
  
    getRow: function (sez) {
        let picture = repository.objects('Seal');
        return picture.length;
    },

    sealData : function (sez) {
        const c_id = sez;
        const picture = repository.objects('Seal').filtered("c_id = '" + c_id + "'")
        return picture;
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
