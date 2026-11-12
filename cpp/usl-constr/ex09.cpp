#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    int a, b;
    std::cout << "Введите a и b: ";
    std::cin >> a >> b;

    if (b != 0 && a % b == 0) {
        std::cout << a << " делится на " << b << " нацело\n";
    } else if (b == 0) {
        std::cout << "На ноль делить нельзя\n";
    } else {
        std::cout << a << " не делится на " << b << " нацело, остаток " << a % b << "\n";
    }

    return 0;
}
