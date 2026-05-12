package spa2.lundeborgsaunagus.ConfigurationPackage;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.Event;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.EventRepository;
import spa2.lundeborgsaunagus.TicketPackage.Ticket;
import spa2.lundeborgsaunagus.TicketPackage.TicketRepository;
import spa2.lundeborgsaunagus.UserPackage.GusUser;
import spa2.lundeborgsaunagus.UserPackage.Role;
import spa2.lundeborgsaunagus.UserPackage.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Component
public class DBInit implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EventRepository eventRepository;
    private final TicketRepository ticketRepository;

    public DBInit(UserRepository userRepository, PasswordEncoder passwordEncoder, EventRepository eventRepository, TicketRepository ticketRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        GusUser user = new GusUser("Freja", passwordEncoder.encode("test"), "Freja", "Johannessen", "11111111", "vej 0 b", Role.CUSTOMER);
        GusUser user2 = new GusUser("Freja2", passwordEncoder.encode("test"), "Freja", "Johannessen", "11111112", "vej 0 b", Role.CUSTOMER);

        userRepository.save(user);
        userRepository.save(user2);
        Event event = new Event(LocalDate.now(), LocalTime.now(), LocalTime.of(10, 10), user, "fyn", 30);
        Ticket ticket = new Ticket(user2, "ticket", false, 50, LocalDateTime.now());
        Ticket ticket2 = new Ticket(user2, "ticket", true, 50, LocalDateTime.now());
        ticketRepository.save(ticket);
        ticketRepository.save(ticket2);

        event.setReservations(List.of(ticket, ticket2));
        eventRepository.save(event);
    }
}
