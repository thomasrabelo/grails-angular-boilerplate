export class Doctor {

  id: number
  photoUrl: string;
  name: string;
  gender: Gender;
  mobileNumber: string;
  email: string;
  education: string;
  experience: string;
  designation: string;
  department: Department
  specialization: Specialization

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  toString(): string {
    return 'Doctor : ' + (this.id ? this.id : '(unsaved)');
  }
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export class Specialization {
  id: number;
  name: string;
}

export class Department {
  id: number;
  name: string;
}
