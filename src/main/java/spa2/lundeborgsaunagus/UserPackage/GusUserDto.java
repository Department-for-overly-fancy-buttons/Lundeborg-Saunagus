package spa2.lundeborgsaunagus.UserPackage;

import java.io.Serializable;

/**
 * DTO for {@link GusUser}
 */
public record GusUserDto(String username, String firstname, String lastname, String phoneNumber,
                         String address) implements Serializable {
}