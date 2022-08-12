package grails.angular.boilerplate

class Doctor {

    String photoUrl
    String name
    Gender gender
    String mobileNumber
    String email
    String education
    String experience
    String designation

    static belongsTo = [department: Department, specialization: Specialization]

    static constraints = {
        photoUrl(nullable: true)
    }
}
