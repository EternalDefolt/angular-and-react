#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    int number;
    std::cout << "Введите целое число: ";
    std::cin >> number;

    if (number > 0) {
        std::cout << "Положительное\n";
    } else if (number < 0) {
        std::cout << "Отрицательное\n";
    } else {
        std::cout << "Ноль\n";
    }

    return 0;
}
