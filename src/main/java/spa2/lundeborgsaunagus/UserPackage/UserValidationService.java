package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.ExceptionHandling.InvalidInputException;
import spa2.lundeborgsaunagus.securityPackage.InputValidationService;

import java.time.LocalDate;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserValidationService implements InputValidationService {

    private final Pattern emailPattern = Pattern.compile("^[a-zA-Z0-9_!#$%&’*+/=?`{}~^.-]+@[a-zA-Z0-9.-]+$");
    private final Pattern passwordPattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])");
    private final Pattern addressPattern = Pattern.compile("^[a-zA-Z0-9 .-]+;[a-zA-Z0-9 .-]+;[a-zA-Z0-9 .-]+$");
    private final Pattern namePattern = Pattern.compile("^[a-zA-ZæøåÆØÅ](?!.*--)(?!.*\\s{2})[a-zA-ZæøåÆØÅ\\s-]{0,98}[a-zA-ZæøåÆØÅ]$",Pattern.CASE_INSENSITIVE);
    private final Pattern digitsOnlyPattern = Pattern.compile("^.*\\d.*$");
    private final Short ageLowerLimit = 16;
    private final Short ageUpperLimit = 140;
    private final Short phoneNumberLength = 8;
    private final Short zipcodeLength = 4;

    public void validateUserInput(CreateGusUserRequest userRequest){
        checkInputNotNull(userRequest);
        checkForIllegalCharacters(userRequest);
        validateEmail(userRequest.username());
        validatePassword(userRequest.password());
        validateName(userRequest.firstname());
        validateName(userRequest.lastname());
        validatePhoneNumber(userRequest.phoneNumber());
        validateAddress(userRequest.address());
        validateBirthday(userRequest.birthday());
        validateGender(userRequest.gender());
        validateRole(userRequest.role());
    }

    private void checkInputNotNull(CreateGusUserRequest userRequest){
        if(userRequest.username() == null || userRequest.password() == null || userRequest.firstname() == null || userRequest.lastname() == null || userRequest.phoneNumber() == null ||userRequest.address() == null || userRequest.birthday() == null || userRequest.gender() == null) {
            System.out.println("Missing input");
            throw new InvalidInputException("Missing input");
        }
    }

    private void checkForIllegalCharacters(CreateGusUserRequest userRequest){
        System.out.println(userRequest.password());
        checkForSqlOperands(userRequest.username());
        checkForSqlOperands(userRequest.password());
        checkForSqlOperands(userRequest.firstname());
        checkForSqlOperands(userRequest.lastname());
        checkForSqlOperands(userRequest.address());
        checkForSqlOperands(userRequest.gender());
        if(userRequest.role() != null) {
            checkForSqlOperands(userRequest.role());
        }
    }

    private void validateEmail(String email){
        Matcher matcher = emailPattern.matcher(email);
        boolean matchFound = matcher.matches();
        if(!matchFound){
            System.out.println("Email not matching format");
            throw new InvalidInputException("Email not correct format");
        }
    }

    private void validatePassword(String password){
        Matcher passwordMatcher = passwordPattern.matcher(password);
        boolean passwordMatchFound = passwordMatcher.find();
        if(!passwordMatchFound){
            System.out.println("Password not matching format");
            throw new InvalidInputException("Password not correct format");
        }
    }
    
    private void validateName(String name){
        if (name == null || name.contains("--") || name.contains("  ")) {
            System.out.println("Name contains invalid characters (-- or double space)");
            throw new InvalidInputException("Name contains invalid characters (-- or double space)");
        }
        Matcher nameMatcher = namePattern.matcher(name);
        boolean nameMatchFound = nameMatcher.matches();
        if(!nameMatchFound){
            System.out.println("Name contains non alphabetic characters");
            throw new InvalidInputException("Name contains non alphabetic characters");
        }
    }

    private void validatePhoneNumber(String phonenumber){
        Matcher phonenumberMatcher = digitsOnlyPattern.matcher(phonenumber);
        boolean phonenumberMatchFound = phonenumberMatcher.matches();
        if(phonenumber.length() != (phoneNumberLength) || !phonenumberMatchFound){
            System.out.println("Phonenumber may have the wrong length (of 8) or contain non digit characters");
            throw new InvalidInputException("Phonenumber may have the wrong length (of 8) or contain non digit characters");
        }
    }

    private void validateAddress(String address){
        Matcher addressMatcher = addressPattern.matcher(address);
        boolean addressMatchFound = addressMatcher.matches();
        if(!addressMatchFound){
            System.out.println("Address not matching format (address,zipcode,city)");
            System.out.println(address);
            throw new InvalidInputException("Address not matching format (address,zipcode,city)");
        }

        Scanner scanner = new Scanner(address);
        scanner.useDelimiter(";");
        System.out.println(scanner.next());
        String zipcode = scanner.next();
        Matcher zipcodeMatcher = digitsOnlyPattern.matcher(zipcode);
        if(zipcode.length() != zipcodeLength || !zipcodeMatcher.matches()){
            System.out.println("Zipcode contains non digit characters");
            throw new InvalidInputException("Zipcode contains non digit characters");
        }
    }

    private void validateBirthday(LocalDate birthday) {
        if(birthday == null || birthday.isAfter(LocalDate.now().minusYears(ageLowerLimit)) || birthday.isBefore(LocalDate.now().minusYears(ageUpperLimit))){
            System.out.println("Birthday my be to long into the past or my place the user under 16 years of age");
            throw new InvalidInputException("Birthday my be to long into the past or my place the user under 16 years of age");
        }
    }

    private void validateGender(String gender){
        if(!gender.equals("male") && !gender.equals("female")){
            System.out.println("Gender does not match male or female");
            throw new InvalidInputException("Gender does not match male or female");
        }
    }

    private void validateRole(String role){
        if(role == null || role.isBlank() || role.equals("CUSTOMER") || role.equals("EMPLOYEE") || role.equals("ADMIN")){

        }else{
            System.out.println("Role does not match CUSTOMER, EMPLOYEE, ADMIN or is blank or is null");
            throw new InvalidInputException("Role does not match CUSTOMER, EMPLOYEE, ADMIN or is blank or is null");
        }
    }

}
