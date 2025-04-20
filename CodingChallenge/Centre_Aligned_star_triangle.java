import java.util.*;
public class Centre_Aligned_star_triangle {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.println("enter the numbre of rows: ");
        int rows = input.nextInt();
        Star_triangle(rows);
        input.close();
    }
    public static void Star_triangle(int n){
        for (int i = 1; i <= n; i++) {
            int spaces = n - i;
            int stars = 2 * i - 1;
            for (int j = 0; j < spaces; j++) {
                System.out.print(" ");
            }
            for (int k = 0; k < stars; k++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
    
}
