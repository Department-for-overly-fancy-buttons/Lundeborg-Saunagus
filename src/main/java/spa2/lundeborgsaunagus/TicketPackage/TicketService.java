package spa2.lundeborgsaunagus.TicketPackage;

import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.Event;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.EventService;
import spa2.lundeborgsaunagus.UserPackage.GusUser;
import spa2.lundeborgsaunagus.UserPackage.UserService;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    public List<TicketResponse> getTickets() {
        return ticketListToTicketResponseList(ticketRepository.findAll());
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
            return ticketToTicketResponse(addedTicket);
        } else return null;

    }

    public List<TicketResponse> getTicketsForEvent(Long eventId) {
        return ticketListToTicketResponseList(ticketRepository.findAllByEventOrderByPaid(eventService.getEventById(eventId)));
    }

    public List<TicketResponse> getTicketForEventAndUser(Event event, GusUser user) {
        return ticketListToTicketResponseList(ticketRepository.findAllByEventAndUser(event, user));
    }

    public List<TicketResponse> getTicketsForUser(String email) {
        GusUser user = userService.getUser(email);
        return ticketListToTicketResponseList(ticketRepository.findAllByUser(user));
    }

    public TicketResponse setTicketPaidStatus(TicketRequest ticketRequest) {
        Ticket ticket = ticketRepository.findAllByEventIdAndUser(ticketRequest.eventId(), userService.getUser(ticketRequest.email()));
        if (ticket == null) {
            return null;
        }
        ticket.setPaid(!ticket.isPaid());
        Ticket updatedTicket = ticketRepository.save(ticket);
        return ticketToTicketResponse(updatedTicket);
    }

    private TicketResponse ticketToTicketResponse(Ticket ticket) {
        return new TicketResponse(ticket.getUser().getId(),ticket.getUser().getUsername(), ticket.getTicketType(), ticket.isPaid(),
                ticket.getPrice(), ticket.getTimeOfPurchase(), ticket.getEvent().getId(), ticket.getEvent().getTitle(),ticket.getEvent().getDate());
    }

    private List<TicketResponse> ticketListToTicketResponseList(List<Ticket> tickets) {
        List<TicketResponse> ticketResponses = new ArrayList<>();
        for (Ticket ticket : tickets) {
            ticketResponses.add(ticketToTicketResponse(ticket));
        }
        return ticketResponses;
    }

}
