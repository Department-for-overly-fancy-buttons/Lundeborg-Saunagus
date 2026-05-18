package spa2.lundeborgsaunagus.TicketPackage;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TicketResponse(Long userID,String email, String ticketType, boolean paid, double price, LocalDateTime timeOfPurchase,
                             Long eventId, String eventTitle, LocalDate date) {
}
