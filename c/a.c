#include<stdio.h>
#include<stdlib.h>

int main(){
    int *c = get_pointer();

    printf("%ld", c);
    printf("%d", *(c));
}

int get_pointer(){
    int c = 5;
    return &c;
}
