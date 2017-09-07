import Realm from 'realm';
import SezModel from './SezModel';
import PicturesModel from './PicturesModel';


const PictureSchema = {
  name: 'Pictures',
  primaryKey: 'id',
  properties: {
      id: {type: 'string', indexed: true},
      c_id : {type: 'string'},
      container_path: 'string',
      createdAt: 'date',
  }
};

const ContainerSchema = {
  name: 'Sez',
  primaryKey: 'id',
  properties: {
      id: {type: 'string', indexed: true},
      container_no: 'string',
      completed: 'bool',
      createdAt: 'date',
      updatedAt: 'date'
  }
};


let repository = new Realm({schema: [PictureSchema, ContainerSchema]});


/*let repository = new Realm({
    schema: [{
	name: 'Sez',
	primaryKey: 'id',
	properties: {
	    id: {type: 'string', indexed: true},
	    container_no: 'string',
	    completed: 'bool',
	    createdAt: 'date',
	    updatedAt: 'date'
	}
    }]
});*/

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

  getRow: function (sez) {
    let people = repository.objects('Pictures');
//      return people.length;
      alert(people.length);
  },

  picture_save: function(pictures, s_id ) {
    if (repository.objects('Pictures').filtered("container_path = '" + pictures.container_path + "'").length) return;

    repository.write(() => {
      pictures.updatedAt = new Date();
      repository.create('Pictures', pictures);
    })
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
