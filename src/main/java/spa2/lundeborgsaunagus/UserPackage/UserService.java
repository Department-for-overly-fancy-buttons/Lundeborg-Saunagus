package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public GusUser logIn(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }

    public GusUser getUser(String name) {
        return userRepository.findByUsernameIgnoreCase(name).orElseThrow();
    }

    public GusUser createUser(CreateGusUserRequest userRequest) {
        //Role requestedRole = stringToRole(userRequest.role());
        //if(requestedRole == null){
        //    return null;
        //}
        return userRepository.save(new GusUser(userRequest.username(), passwordEncoder.encode(userRequest.password()), userRequest.firstname(), userRequest.lastname(), userRequest.phoneNumber(), userRequest.address(), userRequest.birthday(), parseJsonGender(userRequest.gender()), Role.CUSTOMER));
    }

    private Gender parseJsonGender(String gender){
        return switch (gender) {
            case "male" -> Gender.MALE;
            case "female" -> Gender.FEMALE;
            default -> null;
        };
    }

}
