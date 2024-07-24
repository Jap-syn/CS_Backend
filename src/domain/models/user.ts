import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public id: ObjectId,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public phone: string,
    public dob: Date,
    public gender: string,
    public status: string,
    public remark: string
  ) {}
}
