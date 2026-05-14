//package spa2.lundeborgsaunagus.EventManagementPackage.ReservationPackage;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.Event;
//import spa2.lundeborgsaunagus.TicketPackage.Ticket;
//import spa2.lundeborgsaunagus.UserPackage.GusUser;
//
//public class Reservation {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @Column(nullable = false)
//    private Ticket ticket;
//    @Column(nullable = false)
//    private Event event;
//
//    public Reservation(Long id, Ticket ticket, Event event) {
//        this.id = id;
//        this.ticket = ticket;
//        this.event = event;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Ticket getTicket() {
//        return ticket;
//    }
//
//    public void setTicket(Ticket ticket) {
//        this.ticket = ticket;
//    }
//
//    public Event getEvent() {
//        return event;
//    }
//
//    public void setEvent(Event event) {
//        this.event = event;
//    }
//}
