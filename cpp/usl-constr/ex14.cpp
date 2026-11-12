#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    int n;
    std::cout << "Введите целое число: ";
    std::cin >> n;

    if (n == 0) {
        std::cout << "ноль\n";
    } else {
        std::cout << ((n > 0)
                         ? ((n % 2 == 0) ? "положительное чётное" : "положительное нечётное")
                         : ((n % 2 == 0) ? "отрицательное чётное" : "отрицательное нечётное"))
                  << "\n";
    }

    return 0;
}
