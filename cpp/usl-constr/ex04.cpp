#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    int score;
    std::cout << "Введите баллы (0-100): ";
    std::cin >> score;

    if (score < 0 || score > 100) {
        std::cout << "Некорректное количество баллов\n";
    } else if (score >= 90) {
        std::cout << "Оценка: A\n";
    } else if (score >= 80) {
        std::cout << "Оценка: B\n";
    } else if (score >= 70) {
        std::cout << "Оценка: C\n";
    } else if (score >= 60) {
        std::cout << "Оценка: D\n";
    } else {
        std::cout << "Оценка: F\n";
    }

    return 0;
}
