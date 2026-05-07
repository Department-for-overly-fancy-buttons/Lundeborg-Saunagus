package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public GusUser logIn(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }
}
