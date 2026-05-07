package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin( origins = "http://localhost")
@RequestMapping("/api/users")
@RestController
class UserController {

    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/log_in")
    ResponseEntity<GusUser> logIn(@RequestBody GusUser gusUser) {
        GusUser loggedInUser = userService.logIn(gusUser.getUsername(), gusUser.getPassword());
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/user")
    GusUser getUser(Authentication authentication) {
        String username = authentication.getName();

        return new GusUser(username, "t");
    }

}
