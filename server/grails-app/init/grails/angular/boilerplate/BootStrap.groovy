package grails.angular.boilerplate

class BootStrap {

    PacienteService pacienteService
    PatientService patientService
    DoctorService doctorService

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

        for(int i in 1..50) {
            Doctor doctor = new Doctor();
            doctor.name = "Joao" + i
            doctor.gender = Gender.MALE
            doctor.mobileNumber = "87988240185"
            doctor.email = "trabelo@gmail.com"
            doctor.education = "MSc. Neurology"
            doctor.experience = "General"
            doctor.designation = "General"
            doctor.specialization = null
            doctor.department = null
            doctorService.save(doctor)
        }
    }
    def destroy = {
    }
}
