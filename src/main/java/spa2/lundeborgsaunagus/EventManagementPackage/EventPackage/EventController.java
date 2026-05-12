package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost")
@RequestMapping("/api/events")
@RestController
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping()
    public List<Event> getEvents() {
        List<Event> events= eventService.getEvents();
        System.out.println(events.getFirst().ticketsLeft());
        return events;
    }

}
