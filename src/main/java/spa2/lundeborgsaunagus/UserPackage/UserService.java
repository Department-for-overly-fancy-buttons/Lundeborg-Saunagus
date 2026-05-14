package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.ExceptionHandling.DuplicateUserException;

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
        employees.addAll(userRepository.findByRole(Role.ADMIN));
        System.out.println(Role.EMPLOYEE);
        for (GusUser user : employees) {
            gusUserResponses.add(new GusUserResponse(user.getUsername(),
                    user.getFirstname(), user.getLastname(), user.getPhoneNumber(), user.getAddress(),
                    user.getBirthday(), user.getGender(), user.getRole()));
        }
        return gusUserResponses;
    }

    public GusUser createUser(CreateGusUserRequest userRequest) {
        GusUser user;
        try{
            user = userRepository.save(new GusUser(userRequest.username(), passwordEncoder.encode(userRequest.password()), userRequest.firstname(), userRequest.lastname(), userRequest.phoneNumber(), userRequest.address(), userRequest.birthday(), parseJsonGender(userRequest.gender()), Role.CUSTOMER));
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateUserException("A user of this email or phonenumber already exist");
        }
        return user;
    }

    private Gender parseJsonGender(String gender) {
        return switch (gender) {
            case "male" -> Gender.MALE;
            case "female" -> Gender.FEMALE;
            default -> null;
        };
    }

    private Role stringToRole(String roleText) {
        switch (roleText) {
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

    public GusUser updateUserLogin(Long id, CreateGusUserRequest userRequest) {
        GusUser newUser = getUserById(id);
        newUser.setUsername(userRequest.username());
        newUser.setPassword(userRequest.password());
        newUser.setRole(stringToRole(userRequest.role()));

        if (newUser.getRole() == null) {
            return null;
        }

        return userRepository.save(newUser);
    }


}
