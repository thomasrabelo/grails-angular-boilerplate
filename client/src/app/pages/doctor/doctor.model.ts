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
