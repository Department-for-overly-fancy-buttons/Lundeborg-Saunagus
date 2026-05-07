package spa2.lundeborgsaunagus.ConfigurationPackage;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import spa2.lundeborgsaunagus.UserPackage.GusUser;
import spa2.lundeborgsaunagus.UserPackage.UserRepository;

@Component
public class DBInit implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DBInit(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) throws Exception {
        GusUser user = new GusUser("Freja", passwordEncoder.encode("test"));
        userRepository.save(user);
    }
}
