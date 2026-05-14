package spa2.lundeborgsaunagus.EventManagementPackage.ReservationPackage;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {

    List<Reservation> findAllByEventId(Long eventId);

}
