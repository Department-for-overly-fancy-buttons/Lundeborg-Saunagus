package spa2.lundeborgsaunagus.UserPackage;

import org.springframework.stereotype.Service;
import spa2.lundeborgsaunagus.securityPackage.InputValidationService;

import java.time.LocalDate;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserValidationService implements InputValidationService {

    private final Pattern emailPattern = Pattern.compile("^[a-zA-Z0-9_!#$%&’*+/=?`{}~^.-]+@[a-zA-Z0-9.-]+$");
    private final Pattern passwordPattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])");
    private final Pattern addressPattern = Pattern.compile("^[a-zA-Z0-9 .-]+,[a-zA-Z0-9 .-]+,[a-zA-Z0-9 .-]+$");
    private final Pattern alphabeticOnlyPattern = Pattern.compile("^\\p{L}+$");
    private final Pattern digitsOnlyPattern = Pattern.compile("^.*\\d.*+$");
    private final Short ageLowerLimit = 16;
    private final Short ageUpperLimit = 140;
    private final Short phoneNumberLength = 8;
    private final Short zipcodeLength = 4;

    public void validateUserInput(CreateGusUserRequest userRequest){
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

    private void checkForIllegalCharacters(CreateGusUserRequest userRequest){
        checkForSqlOperands(userRequest.username());
        checkForSqlOperands(userRequest.password());
        checkForSqlOperands(userRequest.firstname());
        checkForSqlOperands(userRequest.lastname());
        checkForSqlOperands(userRequest.address());
        checkForSqlOperands(userRequest.gender());
    }

    private void validateEmail(String email){
        Matcher matcher = emailPattern.matcher(email);
        boolean matchFound = matcher.matches();
        if(!matchFound){
            System.out.println("Email not matching format");
            throw new RuntimeException("Email not correct format");
        }
    }

    private void validatePassword(String password){
        Matcher passwordMatcher = passwordPattern.matcher(password);
        boolean passwordMatchFound = passwordMatcher.find();
        if(!passwordMatchFound){
            System.out.println("Password not matching format");
            throw new RuntimeException("Password not correct format");
        }
    }
    
    private void validateName(String name){
        Matcher nameMatcher = alphabeticOnlyPattern.matcher(name);
        boolean nameMatchFound = nameMatcher.matches();
        if(!nameMatchFound){
            System.out.println("Name contains non alphabetic characters");
            throw new RuntimeException("Name contains non alphabetic characters");
        }
    }

    private void validatePhoneNumber(String phonenumber){
        Matcher phonenumberMatcher = digitsOnlyPattern.matcher(phonenumber);
        boolean phonenumberMatchFound = phonenumberMatcher.matches();
        if(phonenumber.length() != (phoneNumberLength) || !phonenumberMatchFound){
            System.out.println("Phonenumber may have the wrong length (of 8) or contain non digit characters");
            throw new RuntimeException("Phonenumber may have the wrong length (of 8) or contain non digit characters");
        }
    }

    private void validateAddress(String address){
        Matcher addressMatcher = addressPattern.matcher(address);
        boolean addressMatchFound = addressMatcher.matches();
        if(!addressMatchFound){
            System.out.println("Address not matching format (address,zipcode,city)");
            System.out.println(address);
            throw new RuntimeException("Address not matching format (address,zipcode,city)");
        }

        Scanner scanner = new Scanner(address);
        scanner.useDelimiter(",");
        System.out.println(scanner.next());
        String zipcode = scanner.next();
        Matcher zipcodeMatcher = digitsOnlyPattern.matcher(zipcode);
        if(zipcode.length() != zipcodeLength || !zipcodeMatcher.matches()){
            System.out.println("Zipcode contains non digit characters");
            throw new RuntimeException("Zipcode contains non digit characters");
        }
    }

    private void validateBirthday(LocalDate birthday) {
        if(birthday == null || birthday.isAfter(LocalDate.now().minusYears(ageLowerLimit)) || birthday.isBefore(LocalDate.now().minusYears(ageUpperLimit))){
            System.out.println("Birthday my be to long into the past or my place the user under 16 years of age");
            throw new RuntimeException("Birthday my be to long into the past or my place the user under 16 years of age");
        }
    }

    private void validateGender(String gender){
        if(!gender.equals("male") && !gender.equals("female")){
            System.out.println("Gender does not match male or female");
            throw new RuntimeException("Gender does not match male or female");
        }
    }

    private void validateRole(String role){
        if(role == null || role.isBlank() || role.equals("CUSTOMER") || role.equals("EMPLOYEE") || role.equals("ADMIN")){

        }else{
            System.out.println("Role does not match CUSTOMER, EMPLOYEE, ADMIN or is blank or is null");
            throw new RuntimeException("Role does not match CUSTOMER, EMPLOYEE, ADMIN or is blank or is null");
        }
    }

}
