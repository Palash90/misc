#include <stdio.h>
#include <stdlib.h>

int *smallest(int *a, int *b)
{
    printf("Smallest function got two values - %d, %d\n", *a, *b);
    if (*a < *b)
    {
        return a;
    }
    else
    {
        return b;
    }
}

int main()
{
    int *ptr = (int *)malloc(sizeof(int));
    if (ptr == NULL)
    {
        printf("Memory allocation failed for first integer\n");
        return 1;
    }
    *ptr = 42;

    int *small;

    {
        int *ptr1 = (int *)malloc(sizeof(int));
        if (ptr1 == NULL)
        {
            printf("Memory allocation failed for second integer\n");
            return 1;
        }
        *ptr1 = 40;

        printf("Given Values: %d, %d\n", *ptr, *ptr1);

        small = smallest(ptr, ptr1);

        //free(ptr1);
    }

    printf("Smallest Value: %d\n", *small);
    
    free(ptr);
    return 0;
}
