package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.ExceptionHandling.DuplicateUserException;
import spa2.lundeborgsaunagus.ExceptionHandling.ProfileNotFoundException;

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

    public GusUser getUser(String name) {
        return userRepository.findByUsernameIgnoreCase(name).orElseThrow(() -> new ProfileNotFoundException("User not found"));
    }

    public GusUser getUserById(Long id) {
        return (userRepository.getReferenceById(id));
    }

    public GusUserResponse getUserResponseById(Long id) {
        return toUserResponse(userRepository.getReferenceById(id));
    }

    public List<GusUserResponse> getUsers() {
        return toUserResponseList(userRepository.findAll());
    }

    public List<GusUserResponse> getAllEmployees() {
        List<GusUser> employees = userRepository.findByRole(Role.EMPLOYEE);
        employees.addAll(userRepository.findByRole(Role.ADMIN));
        return toUserResponseList(employees);
    }

    public GusUser createUser(CreateGusUserRequest userRequest) {
        GusUser user;
        try {
            user = userRepository.save(new GusUser(userRequest.username(), passwordEncoder.encode(userRequest.password()), userRequest.firstname(), userRequest.lastname(), userRequest.phoneNumber(), userRequest.address().replaceAll(";", " "), userRequest.birthday(), parseJsonGender(userRequest.gender()), Role.CUSTOMER, MembershipStatus.PENDING));
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
        return switch (roleText) {
            case "CUSTOMER" -> Role.CUSTOMER;
            case "EMPLOYEE" -> Role.EMPLOYEE;
            case "ADMIN" -> Role.ADMIN;
            default -> null;
        };
    }

    private MembershipStatus stringToMembershipStatus(String membership) {
        return switch (membership) {
            case "ACTIVE" -> MembershipStatus.ACTIVE;
            case "INACTIVE" -> MembershipStatus.INACTIVE;
            case "PENDING" -> MembershipStatus.PENDING;
            case "PASSIVE" -> MembershipStatus.PASSIVE;
            default -> null;
        };
    }

    public List<GusUser> getAllUsers() {
        return userRepository.findAll();
    }

    public List<GusUser> getAllUsersByRole(Role role) {
        return userRepository.findByRole(role);
    }

    /*public GusUser getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
    }*/

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public GusUser updateUserLogin(Long id, UpdateGusUserRequest userRequest, String callerName) {
        GusUser caller = getUser(callerName);
        GusUser newUser = getUserById(id);

        if (!newUser.getId().equals(caller.getId())) {
            throw new DuplicateUserException("test");
        }
        newUser.setUsername(userRequest.username());
        newUser.setPassword(userRequest.password());
        newUser.setRole(stringToRole(userRequest.role()));

        if (newUser.getRole() == null) {
            return null;
        }

        return userRepository.save(newUser);
    }

    public GusUser updateUserByUsername(String callerUsername, CreateGusUserRequest request) {

        GusUser user = userRepository.findByUsernameIgnoreCase(callerUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.firstname() != null) {
            user.setFirstname(request.firstname());
        }

        if (request.lastname() != null) {
            user.setLastname(request.lastname());
        }

        if (request.username() != null) {
            user.setUsername(request.username());
        }

        if (request.phoneNumber() != null) {
            user.setPhoneNumber(request.phoneNumber());
        }

        if (request.address() != null) {
            user.setAddress(request.address().replaceAll(";", " "));
        }

        return userRepository.save(user);
    }

    private GusUserResponse toUserResponse(GusUser user) {
        return new GusUserResponse(user.getId(), user.getUsername(),
                user.getFirstname(), user.getLastname(), user.getPhoneNumber(), user.getAddress(),
                user.getBirthday(), user.getGender(), user.getRole(), user.getMembershipStatus());
    }

    private List<GusUserResponse> toUserResponseList(List<GusUser> users) {
        List<GusUserResponse> userResponses = new ArrayList<>();
        for (GusUser user : users) {
            userResponses.add(toUserResponse(user));
        }
        return userResponses;
    }

    public GusUserResponse updateMembershipStatus(Long id, String membershipStatus) {
        GusUser user = getUserById(id);
        user.setMembershipStatus(stringToMembershipStatus(membershipStatus));
        return toUserResponse(userRepository.save(user));
    }
}
