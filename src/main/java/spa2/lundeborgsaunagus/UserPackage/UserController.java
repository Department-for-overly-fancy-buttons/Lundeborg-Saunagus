package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import spa2.lundeborgsaunagus.ExceptionHandling.InvalidInputException;

import java.util.List;

import java.util.List;

@CrossOrigin(origins = "http://localhost")
@RequestMapping("/api/users")
@RestController
class UserController {

    private final UserService userService;
    private final UserValidationService userValidationService;

    UserController(UserService userService, UserValidationService userValidationService) {
        this.userService = userService;
        this.userValidationService = userValidationService;
    }

    @GetMapping
    List<GusUserResponse> getUsers(Authentication authentication) {
        if (!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return null;
        }
        return userService.getUsers();
    }

    @PostMapping("/log_in")
    ResponseEntity<GusUserResponse> logIn(@RequestBody GusUser gusUser) {
        GusUser loggedInUser = userService.logIn(gusUser.getUsername(), gusUser.getPassword());
        if (loggedInUser != null) {
            return ResponseEntity.ok(new GusUserResponse(loggedInUser.getUsername(), loggedInUser.getFirstname(), loggedInUser.getLastname(), loggedInUser.getPhoneNumber(), loggedInUser.getAddress(), loggedInUser.getBirthday(), loggedInUser.getGender(), loggedInUser.getRole()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/user")
    GusUserResponse getUser(Authentication authentication) {
        if (authentication == null) {
            throw new InvalidInputException("test");
        }
        GusUser user = userService.getUser(authentication.getName());

        return new GusUserResponse(user.getUsername(), user.getFirstname(), user.getLastname(), user.getPhoneNumber(), user.getAddress(), user.getBirthday(), user.getGender(), user.getRole());
    }

    @GetMapping("/employees")
    List<GusUserResponse> getEmployees() {
        return userService.getAllEmployees();
    }

    @PostMapping("/register")
    ResponseEntity<GusUserResponse> registerUser(@RequestBody CreateGusUserRequest userRequest) {
        userValidationService.validateUserInput(userRequest);
        GusUser addedUser = userService.createUser(userRequest);
        if (addedUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(new GusUserResponse(addedUser.getUsername(), addedUser.getFirstname(), addedUser.getLastname(), addedUser.getPhoneNumber(), addedUser.getAddress(), addedUser.getBirthday(), addedUser.getGender(), addedUser.getRole()));
    }

    @PutMapping({"update/{id}"})
    ResponseEntity<GusUser> updateUser(@PathVariable Long id, @RequestBody CreateGusUserRequest userRequest) {
        GusUser updateUser = userService.updateUserLogin(id, userRequest);
        if (updateUser == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(updateUser);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/role/{role}")
    ResponseEntity<List<GusUser>> getAllUsersByRole(@PathVariable Role role) {
        return ResponseEntity.ok(userService.getAllUsersByRole(role));
    }

}
