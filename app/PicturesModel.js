import Utils from './Utils';

class PicturesModel {
  constructor(container_path, c_id, completed) {
    this.id = Utils.guid();
    this.c_id = c_id;
    this.container_path = container_path;
    this.completed = completed || false;
    this.createdAt = new Date();
  }
}

module.exports = PicturesModel;
