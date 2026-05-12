package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return userRepository.save(new GusUser(userRequest.username(), passwordEncoder.encode(userRequest.password()), userRequest.firstname(), userRequest.lastname(), userRequest.phoneNumber(), userRequest.address(), userRequest.birthday(), parseJsonGender(userRequest.gender()), Role.CUSTOMER));
    }

    private Gender parseJsonGender(String gender){
        return switch (gender) {
            case "male" -> Gender.MALE;
            case "female" -> Gender.FEMALE;
            default -> null;
        };
    }
    private Role stringToRole(String roleText){
        switch (roleText){
            case "CUSTOMER":
                return Role.CUSTOMER;
            case "EMPLOYEE":
                return Role.EMPLOYEE;
            case "ADMIN":
                return Role.ADMIN;
            default:
                return null;
        }
    }

    public GusUser getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
    }

    public GusUser updateUserLogin(Long id, CreateGusUserRequest userRequest) {
        GusUser newUser = getUserById(id);
        newUser.setUsername(userRequest.username());
        newUser.setPassword(userRequest.password());
        newUser.setRole(stringToRole(userRequest.role()));

        if(newUser.getRole() == null){
            return null;
        }

        return userRepository.save(newUser);
    }


}
