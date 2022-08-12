package grails.angular.boilerplate

class BootStrap {

    PacienteService pacienteService
    PatientService patientService

    def init = { servletContext ->
        for(int i in 1..50) {
            Paciente paciente = new Paciente();
            paciente.nome = "Joao" + i
            paciente.rg = i + 1
            paciente.cpf = "011667094-00"
            pacienteService.save(paciente)
        }

        for(int i in 1..50) {
            Patient patient = new Patient();
            patient.name = "Joao" + i
            patient.gender = Gender.MALE
            patient.dob = new Date()
            patient.bloodGroup = BloodGroup.ABMinus
            patient.mobileNumber = "87988240185"
            patient.email = "trabelo@gmail.com"
            patient.symptoms = "";
            patientService.save(patient)
        }
    }
    def destroy = {
    }
}
