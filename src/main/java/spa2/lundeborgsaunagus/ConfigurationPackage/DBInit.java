package spa2.lundeborgsaunagus.ConfigurationPackage;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.Event;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.EventRepository;
import spa2.lundeborgsaunagus.TicketPackage.Ticket;
import spa2.lundeborgsaunagus.TicketPackage.TicketRepository;
import spa2.lundeborgsaunagus.UserPackage.Gender;
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
        GusUser user = new GusUser("Freja", passwordEncoder.encode("test"), "Freja", "Johannessen", "11111111", "vej 0 b", LocalDate.of(2000, 2, 2), Gender.FEMALE, Role.CUSTOMER);
        GusUser user2 = new GusUser("Freja2", passwordEncoder.encode("test"), "Freja", "Johannessen", "11111112", "vej 0 b", LocalDate.of(1902, 1, 1), Gender.FEMALE, Role.EMPLOYEE);
        GusUser user3 = new GusUser("Freja3", passwordEncoder.encode("test"), "Freja", "Johannessensen", "11111113", "vej 0 b", LocalDate.of(1992, 10, 10), Gender.FEMALE, Role.ADMIN);

        userRepository.save(user);
        userRepository.save(user2);
        userRepository.save(user3);
        Event event = new Event(LocalDate.now(), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna");
        event.setInformation("kun for over 90");
        Event event2 = new Event(LocalDate.now().plusDays(10), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna2");
        Event event3 = new Event(LocalDate.now().plusDays(20), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna3");
        Event event4 = new Event(LocalDate.now().plusDays(30), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna4");
        Event event5 = new Event(LocalDate.now().plusDays(54), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna5");
        Event event6 = new Event(LocalDate.now().plusDays(8), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna6");
        Event event7 = new Event(LocalDate.now().plusDays(103), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna7");
        Event event8 = new Event(LocalDate.now().plusDays(100), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna8");
        Event event9 = new Event(LocalDate.now().plusDays(19), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna9");
        Event event10 = new Event(LocalDate.now().plusDays(33), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Saun12");
        Event event11 = new Event(LocalDate.now().plusDays(44), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna22");
        Event event12 = new Event(LocalDate.now().plusDays(40), LocalTime.now(), LocalTime.now().plusHours(2), user, "fyn", 30, "Sauna42");


        Ticket ticket = new Ticket(user2, "ticket", false, 50, LocalDateTime.now(), event);
        Ticket ticket2 = new Ticket(user, "ticket", true, 50, LocalDateTime.now(), event);
        Ticket ticket3 = new Ticket(user3, "ticket", false, 500, LocalDateTime.now(), event);
        eventRepository.saveAll(List.of(event, event2, event3, event4, event5, event6, event7, event8, event9, event10, event11, event12));
        ticketRepository.save(ticket);
        ticketRepository.save(ticket2);
        ticketRepository.save(ticket3);
    }
}
