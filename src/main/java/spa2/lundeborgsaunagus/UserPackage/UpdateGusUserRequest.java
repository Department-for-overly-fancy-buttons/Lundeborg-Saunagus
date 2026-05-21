package spa2.lundeborgsaunagus.UserPackage;

import java.time.LocalDate;

public record UpdateGusUserRequest(String username, String password, String firstname, String lastname, String phoneNumber,
                                   String address, LocalDate birthday, String gender, String role, String membershipStatus){
}
