package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import org.springframework.http.ResponseEntity;
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
    List<Event> getEvents() {
        List<Event> events = eventService.getEvents();
        System.out.println(events.getFirst().ticketsLeft());
        return events;
    }

    @PostMapping("/create")
    ResponseEntity<EventResponse> createEvent(@RequestBody CreateEventRequest eventRequest) {
        return ResponseEntity.ok(eventService.createEvent(eventRequest));
    }

}
