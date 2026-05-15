package spa2.lundeborgsaunagus.TicketPackage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.Event;
import spa2.lundeborgsaunagus.UserPackage.GusUser;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findAllByUser(GusUser user);

    List<Ticket> findAllByEventOrderByPaid(Event event);

    List<Ticket> findAllByEventAndUser(Event event, GusUser user);

    Ticket findAllByEventIdAndUser(Long event_id, GusUser user);

    List<Ticket> findAllByPaid(Boolean paid);

    List<Ticket> findAllByPaidAndEvent(Boolean paid, Event event);

    List<Ticket> findAllByPaidAndUser(Boolean paid, GusUser user);

}
