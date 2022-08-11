import { PacienteModel } from './paciente';

describe('Paciente', () => {
  it('should create an instance', () => {
    expect(new PacienteModel()).toBeTruthy();
  });
});
