package grails.angular.boilerplate

class Patient {

    String photoUrl
    String name
    Gender gender
    Date dob
    BloodGroup bloodGroup
    String mobileNumber
    String email
    String symptoms

    static constraints = {
        photoUrl(nullable: true)
        symptoms(nullable: true)
    }
}
