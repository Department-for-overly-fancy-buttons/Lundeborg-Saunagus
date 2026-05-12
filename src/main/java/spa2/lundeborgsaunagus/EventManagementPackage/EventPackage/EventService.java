package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public List<Event> getEvent(){
        return eventRepository.findAll();
    }
}
