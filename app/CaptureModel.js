import Utils from './Utils';

class CaptureModel {
  constructor( job_id, uri, type , completed ) {
    this.id 			= 	Utils.guid();
    this.job_id 		= 	job_id;
    this.Uri 			= 	uri;
    this.type 			= 	type;
    this.completed 		= 	completed || false;
    this.createdAt 		= 	new Date();
  }
}

module.exports = CaptureModel;
