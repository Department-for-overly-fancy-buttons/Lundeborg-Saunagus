package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateEventRequest(LocalDate date, LocalTime startTime, LocalTime endTime, Long saunaMasterId,
                                 String address, int capacity) {
}
