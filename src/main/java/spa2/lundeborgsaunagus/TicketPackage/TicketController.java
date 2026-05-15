package spa2.lundeborgsaunagus.TicketPackage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost")
@RequestMapping("/api/tickets")
@RestController
class TicketController {

    private final TicketService ticketService;

    TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping()
    List<Ticket> getTickets() {
        return ticketService.getTickets();
    }

    @GetMapping("/{email}")
    List<Ticket> getTicketsForUser(@PathVariable String email) {
        return ticketService.getTicketsForUser(email);
    }

    @GetMapping("/my/tickets")
    List<Ticket> getMyTickets(Authentication authentication) {
        return ticketService.getTicketsForUser(authentication.getName());
    }

    @GetMapping("/event/{eventId}")
    List<Ticket> getTicketsForEvent(@PathVariable Long eventId){
        return ticketService.getTicketsForEvent(eventId);
    }

    @PostMapping("/ticket")
    ResponseEntity<TicketResponse> reserveTicket(@RequestBody TicketRequest ticketRequest, Authentication authentication) {
        TicketResponse ticketResponse = ticketService.createTicket(ticketRequest, authentication.getName());
        if (ticketResponse == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(ticketResponse);
    }
}
