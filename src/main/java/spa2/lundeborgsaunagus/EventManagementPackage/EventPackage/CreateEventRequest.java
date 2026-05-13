package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateEventRequest(LocalDate date, LocalTime startTime, LocalTime endTime, Long gusUserId,
                                 String address, int capacity) {
}
