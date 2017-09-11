import Utils from './Utils';

class SezModel {
  constructor( uuid ,container_no, completed) {
    this.id = uuid;
    this.container_no = container_no;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = SezModel;
