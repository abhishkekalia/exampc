import Utils from './Utils';

class CaptureModel {
  constructor( c_id, uri, type , completed ) {
    this.id 			= 	Utils.guid();
    this.c_id 			= 	c_id;
    this.Uri 			= 	uri;
    this.type 			= 	type;
    this.completed 		= 	completed || false;
    this.createdAt 		= 	new Date();
  }
}

module.exports = CaptureModel;
