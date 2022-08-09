package grails.angular.boilerplate

class BootStrap {

    PacienteService pacienteService

    def init = { servletContext ->
        for(int i in 1..50) {
            Paciente paciente = new Paciente();
            paciente.nome = "Joao" + i
            paciente.rg = i + 1
            paciente.cpf = "011667094-00"
            pacienteService.save(paciente)
        }
    }
    def destroy = {
    }
}
