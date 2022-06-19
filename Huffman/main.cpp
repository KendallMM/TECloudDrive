#include "FrequencyCounter.h"
#include "Huffman.h"

int main()
{
    FrequencyCounter frequencyCounter ;
    Huffman huffman;
    string workingMode;
    cin >> workingMode;
    if(workingMode == "1")
    {
        frequencyCounter.readFile("Pruebas/texto.txt");
        huffman.huffer(frequencyCounter.getFrequencyMap());
        huffman.compressTofile("Pruebas/texto.txt","Pruebas/comprimido.zip");
    }
    else if(workingMode == "2")
    {
        huffman.deHuffer("Pruebas/comprimido.zip","Pruebas/texto2.txt");
    }
    return 0;
}