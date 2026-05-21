package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import spa2.lundeborgsaunagus.ExceptionHandling.InvalidInputException;

import java.util.List;

import java.util.List;

@CrossOrigin( origins = "http://localhost")
@RequestMapping("/api/users")
@RestController
class UserController {

    private final UserService userService;
    private final UserValidationService userValidationService;
    private final JpaUserDetailsService userDetailsService;

    UserController(UserService userService, UserValidationService userValidationService, JpaUserDetailsService userDetailsService) {
        this.userService = userService;
        this.userValidationService = userValidationService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/user")
    GusUserResponse getUser(Authentication authentication) {
        System.out.println(authentication.getName());
        System.out.println("authentication");
        if(authentication == null) {
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

    @PutMapping("/update")
    public ResponseEntity<GusUserResponse> updateUser(
            Authentication authentication,
            @RequestBody CreateGusUserRequest userRequest) {

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Not logged in");
        }

        String callerUsername = authentication.getName();

        GusUser updatedUser = userService.updateUserByUsername(callerUsername, userRequest);
        UserDetails springSecurityUserDetails = userDetailsService.loadUserByUsername(updatedUser.getUsername());

        Authentication updatedAuthentication = new UsernamePasswordAuthenticationToken(
                springSecurityUserDetails,
                authentication.getCredentials(),
                authentication.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);

        return ResponseEntity.ok(
                new GusUserResponse(
                        updatedUser.getUsername(),
                        updatedUser.getFirstname(),
                        updatedUser.getLastname(),
                        updatedUser.getPhoneNumber(),
                        updatedUser.getAddress(),
                        updatedUser.getBirthday(),
                        updatedUser.getGender(),
                        updatedUser.getRole()
                )
        );
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }



    @GetMapping
    ResponseEntity<List<GusUser>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/role/{role}")
    ResponseEntity<List<GusUser>> getAllUsersByRole(@PathVariable Role role) {
        return ResponseEntity.ok(userService.getAllUsersByRole(role));
    }

}
