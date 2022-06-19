//
// Created by carlos on 16/06/22.
//

#include "PCRFile.h"
#include <stdlib.h>
#include <string.h>

#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <algorithm>
#include <fstream>

std::string getFileExtension (std::string fileName) {
    std::string fileExtension = "", word;
    std::stringstream stream(fileName);

    /* divide the file name on the dots */
    while (getline(stream, word, '.'));

    /* returns the last string separated by a dot */
    return word;
}

std::string getFileName (std::string fileName){
    std::string word, name;
    std::stringstream stream(fileName);

    while(getline(stream, word, '/'));

    name = word.erase(word.find("."));

    return name;
}


std::string changeFileExtension (std::string fileName, std::string newExtension) {
    std::string fileExtension = getFileExtension(fileName);
    /* Cut the extension of the original file and add the new extension in the end */
    std::string name = getFileName(fileName);
    return fileName.substr(0, fileName.size() - fileExtension.size()) + name + newExtension;
}

std::vector<std::pair<int, unsigned char> > generateBitMap (const char *fileName, FileInfo *myFile) {
    unsigned char byte;
    std::vector<std::pair<int, unsigned char> > data;
    int occur[256], i;

    /* Every char occurs 0 times */
    for (i = 0; i < 256; i++)
        occur[i] = 0;

    /* Open the file in binary mode */
    std::ifstream file(fileName, std::ifstream::in | std::ifstream::binary);
    if (!file.good()) return data;

    /* Get every byte on the file e increment the number of occurrences */
    while (file.good()) {
        byte = file.get();
        if (file.good())
            occur[byte]++;
    }

    file.close();

    /* Put every byte with more than 0 occurrences in the vector */
    for (i = 0; i < 256; i++)
        if (occur[i] > 0)
            data.push_back(std::make_pair(occur[i], i));

    /* Reversely sort the vector */
    std::sort(data.begin(), data.end());
    std::reverse(data.begin(), data.end());

    /* Save some information about the file */
    myFile->compressedChar = data[0].second;
    strcpy(myFile->fileExtension, getFileExtension(fileName).c_str());

    return data;
}