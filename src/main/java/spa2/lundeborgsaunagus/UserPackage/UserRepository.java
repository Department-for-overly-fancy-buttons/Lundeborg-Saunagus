package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<GusUser,Long> {

    List<GusUser> findByRole(Role role);

    GusUser findByUsernameAndPassword(String username, String password);

    Optional<GusUser> findByUsernameIgnoreCase(String username);

    List<GusUser> findAllByGender(Gender gender);

    List<GusUser> findAllByBirthdayBetween(LocalDate birthdayAfter, LocalDate birthdayBefore);

    List<GusUser> findAllByGenderAndBirthdayBetween
            (Gender gender, LocalDate birthdayAfter, LocalDate birthdayBefore);
}
