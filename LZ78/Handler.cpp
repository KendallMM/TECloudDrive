//
// Created by carlos on 16/06/22.
//

#include "Handler.h"
#include "LZ78.h"

Handler *Handler::instance = nullptr;

Handler* Handler::getInstance() {
    if (instance == nullptr){
        instance = new Handler;
    }
    return instance;
}

bool Handler::compress(char fileRute[100], char outputRute[100]) {
    int action = COMPRESS;
    int method = 3;
    FileInfo myFile;

    BMP bitMap = generateBitMap(fileRute, &myFile);
    myFile.method = method;
    compressLZ78(fileRute, &myFile, outputRute);

    return true;
}

bool Handler::decompress(char fileRute[100], char outputRute[100]) {
    int action = COMPRESS;
    int method = 3;
    FileInfo myFile;

    std::ifstream FileIn(fileRute, std::ifstream::in | std::ifstream::binary);
    FileIn.read((char*) &myFile, sizeof(FileInfo));
    FileIn.close();
    decompressLZ78(fileRute, &myFile, outputRute);

    return true;
}