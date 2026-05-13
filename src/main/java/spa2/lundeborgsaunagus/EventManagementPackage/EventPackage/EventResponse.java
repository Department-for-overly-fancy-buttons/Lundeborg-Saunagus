package spa2.lundeborgsaunagus.EventManagementPackage.EventPackage;

import spa2.lundeborgsaunagus.UserPackage.GusUserResponse;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

public record EventResponse(LocalDate date, LocalTime startTime, LocalTime endTime, GusUserResponse gusUserResponse,
                            String address, int capacity,int ticketsLeft) implements Serializable {
}
