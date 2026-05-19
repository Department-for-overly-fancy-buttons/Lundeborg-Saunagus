package spa2.lundeborgsaunagus.TicketPackage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.EventResponse;

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
    List<TicketResponse> getTickets() {
        return ticketService.getTickets();
    }

    @GetMapping("/{email}")
    List<TicketResponse> getTicketsForUser(@PathVariable String email) {
        return ticketService.getTicketsForUser(email);
    }

    @GetMapping("/get/{id}")
    TicketResponse getEvent(@PathVariable Long id) {
        return ticketService.getTicket(id);
    }

    @GetMapping("/my/tickets")
    List<TicketResponse> getMyTickets(Authentication authentication) {
        return ticketService.getTicketsForUser(authentication.getName());
    }

    @GetMapping("/event/{eventId}")
    List<TicketResponse> getTicketsForEvent(@PathVariable Long eventId) {
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

    @PostMapping("/paid/status")
    ResponseEntity<TicketResponse> setPaidStatus(@RequestBody TicketRequest ticketRequest, Authentication authentication) {
        if (!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            System.out.println(authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN")));
            return null;
        }
        TicketResponse ticket = ticketService.setTicketPaidStatus(ticketRequest);
        return ResponseEntity.ok(ticket);
    }

}
