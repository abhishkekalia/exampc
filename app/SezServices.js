import Realm from 'realm';
import SezModel from './SezModel';

let repository = new Realm({
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
});

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
  }
};

SezServices.save(new SezModel('Hello Koding'));
SezServices.save(new SezModel('Make a Todo App with React Native'));
SezServices.save(new SezModel('Check to complete a todo'));
SezServices.save(new SezModel('Long press, drag and drop a todo to sort'));
SezServices.save(new SezModel('Save data with Realm'));
SezServices.save(new SezModel('Sync data with Firebase'));

module.exports = SezServices;
