#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    int x;
    unsigned int y;
    std::cout << "Введите int x и unsigned int y: ";
    std::cin >> x >> y;

    bool naive = x < y;
    bool correct = static_cast<long long>(x) < static_cast<long long>(y);

    // При x = -1, y = 1 наивное сравнение даёт false: в выражении x < y значение int
    // приводится к unsigned int, и -1 превращается в 4294967295, что больше 1.
    // После приведения обоих операндов к long long знак сохраняется, и -1 < 1 даёт true.

    std::cout << std::boolalpha;
    std::cout << "Наивное x < y: " << naive << "\n";
    std::cout << "Через static_cast<long long>: " << correct << "\n";

    if (naive != correct) {
        std::cout << "Результаты различаются из-за преобразования signed в unsigned\n";
    }

    return 0;
}
