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
    Department department
    Specialization specialization

    static constraints = {
        photoUrl(nullable: true)
        department(nullable: true)
        specialization(nullable: true)
    }
}
