import Utils from './Utils';

class SezModel {
  constructor( uuid, job_id , container_id, container_no, completed) {
    this.id = uuid;
    this.job_id = job_id;
    this.container_id = container_id;
    this.container_no = container_no;
    this.completed = completed || false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = SezModel;
