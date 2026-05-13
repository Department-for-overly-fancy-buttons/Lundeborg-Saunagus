package spa2.lundeborgsaunagus.ExceptionHandling;

public class DuplicateUserException extends RuntimeException {
    public DuplicateUserException(String message) {
        super(message);
    }
}
