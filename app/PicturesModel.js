import Utils from './Utils';

class PicturesModel {
  constructor( c_id, uri, completed ) {
    this.id 			= 	Utils.guid();
    this.c_id 			= 	c_id;
    this.Uri 			= 	uri;
    this.completed 		= 	completed || false;
    this.createdAt 		= 	new Date();
  }
}

module.exports = PicturesModel;
