#include <iostream>
#ifdef _WIN32
#include <windows.h>
#endif

int main() {
#ifdef _WIN32
    SetConsoleCP(CP_UTF8);
    SetConsoleOutputCP(CP_UTF8);
#endif

    char c;
    std::cout << "Введите символ: ";
    std::cin >> c;

    switch (c) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
        case 'A': case 'E': case 'I': case 'O': case 'U':
            std::cout << "Гласная\n";
            break;
        default:
            if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
                std::cout << "Согласная\n";
            } else {
                std::cout << "Не буква\n";
            }
    }

    return 0;
}
