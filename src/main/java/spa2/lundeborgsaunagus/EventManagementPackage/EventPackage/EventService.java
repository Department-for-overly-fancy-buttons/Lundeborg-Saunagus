package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.UserPackage.GusUser;
import spa2.lundeborgsaunagus.UserPackage.GusUserResponse;
import spa2.lundeborgsaunagus.UserPackage.UserService;

import java.time.LocalDate;
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
        //List<Event> events = eventRepository.findAllByDateAfterOrderByDate(LocalDate.now().minusDays(1));
        List<Event> events = eventRepository.findAll();
        return toEventResponseList(events);
    }

    public Event getEventById(Long id) {
        return eventRepository.getReferenceById(id);
    }

    public EventResponse getEventResponseById(Long id) {
        return toEventResponse(eventRepository.getReferenceById(id));
    }

    public EventResponse createEvent(CreateEventRequest event) {
        GusUser saunaMaster = userService.getUser(event.saunaMasterEmail());
        if (saunaMaster == null) {
            return null;
        }
        Event addEvent = new Event(event.date(), event.startTime(), event.endTime(),
                saunaMaster, event.address(), event.capacity(), event.title());
        if (!event.information().isEmpty()) {
            addEvent.setInformation(event.information());
        }
        Event addedEvent = eventRepository.save(addEvent);

        return new EventResponse(addedEvent.getId(), addedEvent.getDate(), addedEvent.getStartTime(),
                addedEvent.getEndTime(), new GusUserResponse(saunaMaster.getId(),saunaMaster.getUsername(),
                saunaMaster.getFirstname(), saunaMaster.getLastname(), saunaMaster.getPhoneNumber(), saunaMaster.getAddress(), saunaMaster.getBirthday(),
                saunaMaster.getGender(), saunaMaster.getRole(),saunaMaster.getMembershipStatus()), addedEvent.getAddress(), addedEvent.getCapacity(), addedEvent.ticketsLeft(), addedEvent.getTitle(), addedEvent.getInformation());
    }

    private EventResponse toEventResponse(Event event) {
        GusUser saunaMaster = event.getSaunaMaster();
        return new EventResponse(event.getId(), event.getDate(), event.getStartTime(), event.getEndTime(), new GusUserResponse(saunaMaster.getId(), saunaMaster.getUsername(),
                saunaMaster.getFirstname(), saunaMaster.getLastname(), saunaMaster.getPhoneNumber(), saunaMaster.getAddress(), saunaMaster.getBirthday(),
                saunaMaster.getGender(), saunaMaster.getRole(),saunaMaster.getMembershipStatus()), event.getAddress(), event.getCapacity(), event.ticketsLeft(), event.getTitle(), event.getInformation());
    }

    private List<EventResponse> toEventResponseList(List<Event> events) {
        List<EventResponse> eventResponses = new ArrayList<>();
        for (Event event : events) {
            eventResponses.add(toEventResponse(event));
        }
        return eventResponses;
    }

}
