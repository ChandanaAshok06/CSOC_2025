import java.util.*;
public class Prime_numbers {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("enter the value of N:");
        int n = input.nextInt();
        System.out.println("prime numbers till N");
        for(int i = 2; i <= n; i++){
            if(prime(i) == true)
                System.out.print(i + " ");
        }
        input.close();
    }

    public static boolean prime(int num){
        for(int i = 2; i < num; i++){
            if(num % i == 0)
                return false;
        }
        return true;
    }
}
