#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    int age;
    bool student;
    std::cout << "Возраст: ";
    std::cin >> age;
    std::cout << "Есть студенческий билет? (1/0): ";
    std::cin >> student;

    bool discount = (age >= 65) || (student && age < 25);

    if (discount) {
        std::cout << "Скидка положена\n";
    } else {
        std::cout << "Скидка не положена\n";
    }

    return 0;
}
