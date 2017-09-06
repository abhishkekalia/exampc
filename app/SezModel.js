import Utils from './Utils';

class SezModel {
  constructor(container_no, completed) {
    this.id = Utils.guid();
    this.container_no = container_no;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = SezModel;
