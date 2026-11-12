#include <iostream>
#include <cmath>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    double a, b;
    std::cout << "Введите два числа a и b: ";
    std::cin >> a >> b;

    if (std::fabs(a - b) < 1e-9) {
        std::cout << "Числа равны\n";
    } else if (a > b) {
        std::cout << "a больше b\n";
    } else {
        std::cout << "b больше a\n";
    }

    return 0;
}
