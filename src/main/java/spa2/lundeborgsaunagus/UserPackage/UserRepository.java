package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<GusUser,Long> {

    //List<GusUser> findByRole(String role);

    GusUser findByUsernameAndPassword(String username, String password);

    Optional<GusUser> findByUsernameIgnoreCase(String username);



}
