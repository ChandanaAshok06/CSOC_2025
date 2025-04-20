import java.util.*;
public class Vowel_consonant_counter {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("enter the string: ");
        String str = input.nextLine();
        int vowels = 0, consonants = 0;
        for(int i = 0; i < str.length(); i++){
            char ch = str.charAt(i);
            if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')){
                if(isvowel(ch))
                    vowels++;
                else
                    consonants++;
            }
        }
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
        input.close();
    }
    public static boolean isvowel(char ch){
        return ch == 'a' || ch == 'A' || ch == 'e' ||ch == 'E' || ch == 'i' || ch == 'I' || ch == 'o' || ch == 'O' || ch == 'u' || ch == 'U' ;
    }
}
