#include <stdio.h>
#include <time.h>
#include <stdlib.h>

struct Dummy
{
    int id;
};

int main()
{
    char s[1024];
    printf("Check Memory Now\n");
    scanf("%s", &s);
    printf("%s", s);

    clock_t begin = clock();

    int count = 10000000;

    struct Dummy *a = (struct Dummy *)malloc(count * sizeof(struct Dummy));

    for (int i = 0; i < count; i++)
    {
        a[i].id = i;
    }

    clock_t end = clock();
    double time_spent = (double)(end - begin) * 1000 / CLOCKS_PER_SEC;

    printf("\nDone. Took %lf milliseconds\n", time_spent);
    scanf("%s", &s);
    printf("%s", s);
}