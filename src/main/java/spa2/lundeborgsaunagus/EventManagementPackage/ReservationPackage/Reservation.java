//package spa2.lundeborgsaunagus.EventManagementPackage.ReservationPackage;
//
//import jakarta.persistence.*;
//import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.Event;
//import spa2.lundeborgsaunagus.TicketPackage.Ticket;
//import spa2.lundeborgsaunagus.UserPackage.GusUser;
//
//@Entity
//public class Reservation {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    @Column(nullable = false)
//    private Long ticketId;
//    @Column(nullable = false)
//    private Long eventId;
//
//    public Reservation(Long ticketId, Long eventId) {
//        this.ticketId = ticketId;
//        this.eventId = eventId;
//    }
//
//    public Reservation(){}
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getTicketId() {
//        return ticketId;
//    }
//
//    public void setTicketId(Long ticketId) {
//        this.ticketId = ticketId;
//    }
//
//    public Long getEventId() {
//        return eventId;
//    }
//
//    public void setEventId(Long eventId) {
//        this.eventId = eventId;
//    }
//}
