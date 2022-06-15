#include <iostream>
#include <cstdint>
#include <cstdlib>
#include <cstring>
#include <cassert>
using namespace std;

// ========================================================
// LZW Dictionary helper:
// ========================================================

constexpr int Nil            = -1;
constexpr int MaxDictBits    = 12;
constexpr int StartBits      = 9;
constexpr int FirstCode      = (1 << (StartBits - 1)); // 256
constexpr int MaxDictEntries = (1 << MaxDictBits);     // 4096

class Dictionary final
{
public:

    struct Entry
    {
        int code;
        int value;
    };

    int size;
    Entry entries[MaxDictEntries];

    Dictionary();
    int findIndex(int code, int value) const;
    bool add(int code, int value);
    bool flush(int & codeBitsWidth);
};
