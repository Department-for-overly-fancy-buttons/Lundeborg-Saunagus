package spa2.lundeborgsaunagus.TicketPackage;

import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.Event;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.EventService;
import spa2.lundeborgsaunagus.UserPackage.GusUser;
import spa2.lundeborgsaunagus.UserPackage.UserService;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserService userService;
    private final EventService eventService;

    public TicketService(TicketRepository ticketRepository, UserService userService, EventService eventService) {
        this.ticketRepository = ticketRepository;
        this.userService = userService;
        this.eventService = eventService;
    }

    public List<Ticket> getTickets() {
        return ticketRepository.findAll();
    }

    public TicketResponse createTicket(TicketRequest ticketRequest, String email) {
        GusUser user = userService.getUser(email);
        Event event = eventService.getEventById(ticketRequest.eventId());
        Ticket ticket = new Ticket(user,"ticket",false,50, LocalDateTime.now(),event);
        Ticket addedTicket = ticketRepository.save(ticket);
        return new TicketResponse();
    }


    public List<Ticket> getTicketsForUser(String email) {
        GusUser user = userService.getUser(email);
        return ticketRepository.findAllByUser(user);
    }

}
