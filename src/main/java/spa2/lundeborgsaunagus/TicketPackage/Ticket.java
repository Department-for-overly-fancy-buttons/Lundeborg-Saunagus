package spa2.lundeborgsaunagus.TicketPackage;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import spa2.lundeborgsaunagus.EventManagementPackage.EventPackage.Event;
import spa2.lundeborgsaunagus.UserPackage.GusUser;

import java.time.LocalDateTime;

@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private GusUser user;
    @Column(nullable = false)
    private String ticketType;
    @Column(nullable = false)
    private boolean paid;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false)
    private LocalDateTime timeOfPurchase;
    @ManyToOne
    @JsonBackReference
    private Event event;

    public Ticket(GusUser user, String ticketType, boolean paid, double price, LocalDateTime timeOfPurchase,Event event) {
        this.user = user;
        this.ticketType = ticketType;
        this.paid = paid;
        this.price = price;
        this.timeOfPurchase = timeOfPurchase;
        this.event = event;
    }

    public Ticket() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public GusUser getUser() {
        return user;
    }

    public void setUser(GusUser user) {
        this.user = user;
    }

    public String getTicketType() {
        return ticketType;
    }

    public void setTicketType(String ticketType) {
        this.ticketType = ticketType;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDateTime getTimeOfPurchase() {
        return timeOfPurchase;
    }

    public void setTimeOfPurchase(LocalDateTime timeOfPurchase) {
        this.timeOfPurchase = timeOfPurchase;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
