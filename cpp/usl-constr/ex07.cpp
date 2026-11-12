#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    int year;
    std::cout << "Введите год: ";
    std::cin >> year;

    bool leap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);

    if (leap) {
        std::cout << year << " — високосный\n";
    } else {
        std::cout << year << " — не високосный\n";
    }

    return 0;
}
