package spa2.lundeborgsaunagus.TicketPackage;

import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.EventManagementPackage.ReservationPackage.Reservation;
import spa2.lundeborgsaunagus.EventManagementPackage.ReservationPackage.ReservationRepository;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final ReservationRepository reservationRepository;

    public TicketService(TicketRepository ticketRepository, ReservationRepository reservationRepository) {
        this.ticketRepository = ticketRepository;
        this.reservationRepository = reservationRepository;
    }

    public List<Ticket> getTickets() {
        return ticketRepository.findAll();
    }


    public List<Reservation> getAllReservationsForEvent(Long eventId) {
        return reservationRepository.findAllByEventId(eventId);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

}
