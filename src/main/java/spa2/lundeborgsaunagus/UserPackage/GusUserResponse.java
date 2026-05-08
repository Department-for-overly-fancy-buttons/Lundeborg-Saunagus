package spa2.lundeborgsaunagus.UserPackage;

import java.io.Serializable;

/**
 * DTO for {@link GusUser}
 */
public record GusUserResponse(String username, String firstname, String lastname, String phoneNumber,
                              String address, Role role) implements Serializable {
}