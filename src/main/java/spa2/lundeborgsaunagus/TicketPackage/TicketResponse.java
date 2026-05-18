package spa2.lundeborgsaunagus.TicketPackage;

import java.time.LocalDateTime;

public record TicketResponse(Long userID,String email, String ticketType, boolean paid, double price, LocalDateTime timeOfPurchase,
                             Long eventId) {
}
