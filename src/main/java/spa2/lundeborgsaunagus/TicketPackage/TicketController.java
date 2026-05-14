package spa2.lundeborgsaunagus.TicketPackage;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.Event;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.EventService;
import spa2.lundeborgsaunagus.EventManagementPackage.ReservationPackage.Reservation;

import java.util.List;

@CrossOrigin(origins = "http://localhost")
@RequestMapping("/api/tickets")
@RestController
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping()
    public List<Ticket> getTickets() {
        List<Ticket> tickets = ticketService.getTickets();
        return tickets;
    }

    @GetMapping("/reservations")
    public List<Reservation> getReservations() {
        return ticketService.getAllReservations();
    }

}
