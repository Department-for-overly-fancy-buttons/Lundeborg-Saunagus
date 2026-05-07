package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public JpaUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<GusUser> optionalUser = userRepository.findByUsername(username);
        if(optionalUser.isPresent()){
            System.out.println(optionalUser.get().getUsername());
            GusUser foundUser = optionalUser.get();
            return User.builder()
                    .username(foundUser.getUsername())
                    .password(foundUser.getPassword())
                    //.authorities(new SimpleGrantedAuthority("ROLE_" + foundUser.getRole().name()))
                    .build();
        }
        System.out.println(":'(");
        throw new UsernameNotFoundException("User by username " + username + " could not be found");
    }
}
