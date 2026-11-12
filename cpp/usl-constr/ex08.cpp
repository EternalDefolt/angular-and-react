#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    int a, b, c;
    std::cout << "Введите три числа: ";
    std::cin >> a >> b >> c;

    int maxIf;
    if (a > b) {
        if (a > c) {
            maxIf = a;
        } else {
            maxIf = c;
        }
    } else {
        if (b > c) {
            maxIf = b;
        } else {
            maxIf = c;
        }
    }
    std::cout << "Максимум (вложенные if-else): " << maxIf << "\n";

    int maxTernary = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);
    std::cout << "Максимум (вложенные тернарные): " << maxTernary << "\n";

    return 0;
}
