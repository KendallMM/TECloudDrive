#include "bitstream.cpp"
#include<iostream>
#include <cstdint>
#include <cstdlib>
#include <string>


using namespace std;
namespace lzw
{

// ========================================================
// Encoding:
// ========================================================

void easyEncode(const uint8_t * uncompressed, int uncompressedSizeBytes, uint8_t ** compressed, int * compressedSizeBytes, int * compressedSizeBits);

// ========================================================
// Decoding:
// ========================================================

int easyDecode(const uint8_t * compressed, int compressedSizeBytes, int compressedSizeBits, uint8_t * uncompressed, int uncompressedSizeBytes);

}


