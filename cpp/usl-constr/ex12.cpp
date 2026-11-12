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

    char op;
    double a, b;
    std::cout << "Введите операцию (+ - * /) и два числа: ";
    std::cin >> op >> a >> b;

    switch (op) {
        case '+':
            std::cout << a << " + " << b << " = " << a + b << "\n";
            break;
        case '-':
            std::cout << a << " - " << b << " = " << a - b << "\n";
            break;
        case '*':
            std::cout << a << " * " << b << " = " << a * b << "\n";
            break;
        case '/':
            if (std::fabs(b) < 1e-9) {
                std::cout << "Деление на ноль!\n";
            } else {
                std::cout << a << " / " << b << " = " << a / b << "\n";
            }
            break;
        default:
            std::cout << "Неизвестная операция\n";
    }

    return 0;
}
