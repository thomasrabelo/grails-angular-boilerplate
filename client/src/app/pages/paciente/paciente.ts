export class Paciente {
  id: number;
  nome: string;
  rg: string;
  cpf: string

  constructor(object?: any) {
    if (object) {

      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'Paciente : ' + (this.id ? this.id : '(unsaved)');
  }
}
