#include <iostream>
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

    double maxTernary = (a > b) ? a : b;
    std::cout << "Большее (тернарный оператор): " << maxTernary << "\n";

    double maxIf;
    if (a > b) {
        maxIf = a;
    } else {
        maxIf = b;
    }
    std::cout << "Большее (if-else): " << maxIf << "\n";

    if (a == b) {
        std::cout << "Числа равны\n";
    }

    return 0;
}
