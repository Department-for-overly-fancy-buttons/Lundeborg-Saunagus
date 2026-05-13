package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.UserPackage.GusUser;
import spa2.lundeborgsaunagus.UserPackage.GusUserResponse;
import spa2.lundeborgsaunagus.UserPackage.UserService;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserService userService;

    public EventService(EventRepository eventRepository, UserService userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    public List<EventResponse> getEvents() {
        List<EventResponse> eventResponses = new ArrayList<>();
        List<Event> events = eventRepository.findAll();
        for (Event event : events) {
            GusUser saunaMaster = event.getSaunaMaster();
            eventResponses.add(new EventResponse(event.getDate(), event.getStartTime(), event.getEndTime(),
                    new GusUserResponse(saunaMaster.getUsername(),
                            saunaMaster.getFirstname(), saunaMaster.getLastname(), saunaMaster.getPhoneNumber(), saunaMaster.getAddress(), saunaMaster.getBirthday(),
                            saunaMaster.getGender(), saunaMaster.getRole()), event.getAddress(), event.getCapacity(), event.ticketsLeft()));

        }
        return eventResponses;
    }

    public Event getEventById(Long id) {
        return eventRepository.getReferenceById(id);
    }

    public EventResponse createEvent(CreateEventRequest event) {
        GusUser saunaMaster = userService.getUser(event.saunaMasterEmail());
        if (saunaMaster == null) {
            return null;
        }
        Event addedEvent = eventRepository.save(new Event(event.date(), event.startTime(), event.endTime(),
                saunaMaster, event.address(), event.capacity()));

        return new EventResponse(addedEvent.getDate(), addedEvent.getStartTime(), addedEvent.getEndTime(),
                new GusUserResponse(saunaMaster.getUsername(),
                        saunaMaster.getFirstname(), saunaMaster.getLastname(), saunaMaster.getPhoneNumber(), saunaMaster.getAddress(), saunaMaster.getBirthday(),
                        saunaMaster.getGender(), saunaMaster.getRole()), addedEvent.getAddress(), addedEvent.getCapacity(), addedEvent.ticketsLeft());
    }

}
