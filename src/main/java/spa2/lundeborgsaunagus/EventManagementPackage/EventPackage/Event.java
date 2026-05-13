package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import spa2.lundeborgsaunagus.TicketPackage.Ticket;
import spa2.lundeborgsaunagus.UserPackage.GusUser;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private LocalTime startTime;
    @Column(nullable = false)
    private LocalTime endTime;
    @ManyToOne
    private GusUser saunaMaster;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private int capacity;
    @OneToMany(cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "reservation",
            joinColumns = @JoinColumn(name = "eventId"),
            inverseJoinColumns = @JoinColumn(name = "ticketId")
    )
    private List<Ticket> reservations = new ArrayList<>();
    @Column(nullable = false)
    private String title;
    @Column
    private String information;


    public Event(LocalDate date, LocalTime startTime, LocalTime endTime, GusUser saunaMaster, String address, int capacity, String title) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.saunaMaster = saunaMaster;
        this.address = address;
        this.capacity = capacity;
        this.title = title;
    }


    public Event() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public GusUser getSaunaMaster() {
        return saunaMaster;
    }

    public void setSaunaMaster(GusUser saunaMaster) {
        this.saunaMaster = saunaMaster;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public List<Ticket> getReservations() {
        return reservations;
    }

    public void setReservations(List<Ticket> reservations) {
        this.reservations = reservations;
    }

    public void addReservation(Ticket ticket) {
        this.reservations.add(ticket);
    }

    public void removeReservation(Ticket ticket) {
        this.reservations.remove(ticket);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    public int ticketsLeft() {
        return capacity - reservations.size();
    }

}
