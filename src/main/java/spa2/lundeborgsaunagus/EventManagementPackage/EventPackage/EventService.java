package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.UserPackage.GusUser;
import spa2.lundeborgsaunagus.UserPackage.GusUserResponse;
import spa2.lundeborgsaunagus.UserPackage.UserService;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final UserService userService;

    public EventService(EventRepository eventRepository, UserService userService) {
        this.eventRepository = eventRepository;
        this.userService = userService;
    }

    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.getReferenceById(id);
    }

    public EventResponse createEvent(CreateEventRequest event) {
        GusUser saunaMaster = userService.getUserById(event.saunaMasterId());
        if (saunaMaster == null) {
            return null;
        }
        Event addedEvent = eventRepository.save(new Event(event.date(), event.startTime(), event.endTime(),
                saunaMaster, event.address(), event.capacity()));

        return new EventResponse(addedEvent.getDate(), addedEvent.getStartTime(), addedEvent.getEndTime(),
                new GusUserResponse(saunaMaster.getId(), saunaMaster.getUsername(),
                        saunaMaster.getFirstname(), saunaMaster.getLastname(), saunaMaster.getPhoneNumber(), saunaMaster.getAddress(), saunaMaster.getBirthday(),
                        saunaMaster.getGender(), saunaMaster.getRole()), addedEvent.getAddress(), addedEvent.getCapacity(), addedEvent.ticketsLeft());
    }

}
