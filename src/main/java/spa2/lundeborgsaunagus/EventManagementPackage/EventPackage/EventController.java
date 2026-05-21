package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost")
@RequestMapping("/api/events")
@RestController
class EventController {

    private final EventService eventService;

    EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping()
    List<EventResponse> getEvents() {
        return eventService.getEvents();
    }

    @PostMapping("/create")
    ResponseEntity<EventResponse> createEvent(@RequestBody CreateEventRequest eventRequest, Authentication authentication) {
        if (!authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            return null;
        }
        return ResponseEntity.ok(eventService.createEvent(eventRequest));
    }

    @GetMapping("/{id}")
    EventResponse getEvent(@PathVariable Long id) {
        return eventService.getEventResponseById(id);
    }

}
