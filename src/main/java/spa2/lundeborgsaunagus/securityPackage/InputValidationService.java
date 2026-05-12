package spa2.lundeborgsaunagus.securityPackage;

public interface InputValidationService {



    default void checkForSqlOperands(String input){
        if(input.contains("|") || input.contains("'")){
            throw new RuntimeException("input contains illegal characters | or ' ");
        }
    }
}
