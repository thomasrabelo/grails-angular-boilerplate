export class Patient {

  id: number
  photoUrl: string;
  name: string;
  gender: Gender;
  dob: string;
  bloodGroup: BloodGroup;
  mobileNumber: string;
  email: string;
  symptoms: string;

  constructor(object?: any) {
    if (object) {
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }
  }

  toString(): string {
    return 'Patient : ' + (this.id ? this.id : '(unsaved)');
  }
}

export enum BloodGroup {
  ABPlus = 'ABPlus',
  APlus = 'APlus',
  BPlus = 'BPlus',
  OPlus = 'OPlus',
  ABMinus = 'ABMinus',
  AMinus = 'AMinus',
  BMinus = 'BMinus',
  OMinus = 'OMinus'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
