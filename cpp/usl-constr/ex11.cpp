#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    int day;
    std::cout << "Введите номер дня недели (1-7): ";
    std::cin >> day;

    switch (day) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            std::cout << "Рабочий день\n";
            break;
        case 6:
        case 7:
            std::cout << "Выходной\n";
            break;
        default:
            std::cout << "Некорректный номер дня\n";
    }

    return 0;
}
