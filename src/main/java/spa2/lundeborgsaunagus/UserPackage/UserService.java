package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public GusUser getUserById(Long id) {
        return userRepository.getReferenceById(id);
    }

    public List<GusUserResponse> getAllEmployees() {
        List<GusUserResponse> gusUserResponses = new ArrayList<>();
        List<GusUser> employees = userRepository.findByRole(Role.EMPLOYEE);
        for (GusUser user : employees) {
            gusUserResponses.add(new GusUserResponse(user.getUsername(), user.getFirstname(),
                    user.getLastname(), user.getPhoneNumber(), user.getAddress(), user.getRole()));
        }
        return gusUserResponses;
    }

    public GusUser createUser(CreateGusUserRequest userRequest) {
        //Role requestedRole = stringToRole(userRequest.role());
        //if(requestedRole == null){
        //    return null;
        //}
        return userRepository.save(new GusUser(userRequest.username(), passwordEncoder.encode(userRequest.password()), userRequest.firstname(), userRequest.lastname(), userRequest.phoneNumber(), userRequest.address(), Role.CUSTOMER));
    }
}
