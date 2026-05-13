package spa2.lundeborgsaunagus.UserPackage;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link GusUser}
 */
public record GusUserResponse(String username, String firstname, String lastname, String phoneNumber,
                              String address, LocalDate birthday, Gender gender, Role role) implements Serializable {
}