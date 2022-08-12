export class Patient {

  id: number
  photoUrl: string;
  name: string;
  gender: string;
  dob: string;
  bloodGroup: string;
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
