import Utils from './Utils';

class PicturesModel {
  constructor( c_id, container_path, completed ) {
    this.id = Utils.guid();
    this.c_id = c_id;
    this.container_path = container_path;
    this.completed = completed || false;
    this.createdAt = new Date();
  }
}

module.exports = PicturesModel;
