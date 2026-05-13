package spa2.lundeborgsaunagus.ExceptionHandling;

public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }
}
