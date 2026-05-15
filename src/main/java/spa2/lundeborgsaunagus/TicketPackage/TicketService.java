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
        if (!ticketRequest.email().equalsIgnoreCase(email)) {
            return null;
        }
        GusUser user = userService.getUser(email);
        Event event = eventService.getEventById(ticketRequest.eventId());
        if (!getTicketForEventAndUser(event, user).isEmpty()) {
            return null;
        }
        if (event.ticketsLeft() > 0) {
            Ticket ticket = new Ticket(user, "ticket", false, 50, LocalDateTime.now(), event);
            Ticket addedTicket = ticketRepository.save(ticket);
            return new TicketResponse();
        } else return null;

    }

    public List<Ticket> getTicketsForEvent(Long eventId) {
        return ticketRepository.findAllByEvent(eventService.getEventById(eventId));
    }

    public List<Ticket> getTicketForEventAndUser(Event event, GusUser user) {
        return ticketRepository.findAllByEventAndUser(event, user);
    }

    public List<Ticket> getTicketsForUser(String email) {
        GusUser user = userService.getUser(email);
        return ticketRepository.findAllByUser(user);
    }

    public Ticket setTicketPaidStatus(TicketRequest ticketRequest) {
        Ticket ticket = ticketRepository.findAllByEventIdAndUser(ticketRequest.eventId(), userService.getUser(ticketRequest.email()));
        if (ticket == null) {
            return null;
        }
        ticket.setPaid(!ticket.isPaid());
        return ticketRepository.save(ticket);
    }
}
