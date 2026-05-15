package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spa2.lundeborgsaunagus.UserPackage.GusUser;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Long> {

    List<Event> findAllByDateAfterOrderByDate(LocalDate dateAfter);

    List<Event> findAllByDateBetweenOrderByDate(LocalDate dateAfter, LocalDate dateBefore);

    List<Event> findAllBySaunaMasterIdOrderByDate(Long saunaMaster_id);

    List<Event> findAllByAddress(String address);

    List<Event> findAllByCapacityIsGreaterThan(int capacityIsGreaterThan);

    List<Event> findAllByStartTimeAfterAndEndTimeBeforeAndDateBetweenOrderByDate
            (LocalTime startTimeAfter, LocalTime endTimeBefore, LocalDate dateAfter, LocalDate dateBefore);
}
