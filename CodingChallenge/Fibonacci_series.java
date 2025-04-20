import java.util.Scanner;
public class Fibonacci_series{
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("enter the number of elements to be printed in fibonacci series");
        int key = input.nextInt();
        for(int i = 1; i <= key; i++){
            System.out.print(fibonacci(i) + " ");
        }
        input.close();
    }
    
    public static int fibonacci(int key){
        if(key == 1)
            return 0;
        if(key == 2)
            return 1;
        return fibonacci(key - 1) + fibonacci(key - 2);
    }
    
}
