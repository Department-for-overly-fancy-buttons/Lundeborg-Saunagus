package spa2.lundeborgsaunagus.UserPackage;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link GusUser}
 */
public record CreateGusUserRequest(String username, String password, String firstname, String lastname, String phoneNumber,
                                   String address, LocalDate birthday, String gender) implements Serializable {
}