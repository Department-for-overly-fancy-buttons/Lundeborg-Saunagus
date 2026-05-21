package spa2.lundeborgsaunagus.ExceptionHandling;

public class ProfileNotFoundException extends RuntimeException {
    public ProfileNotFoundException(String message) {
        super(message);
    }
}
