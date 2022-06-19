
#include <fstream>

#include "Handler.h"

#define COMPRESS   1
#define DECOMPRESS 0


int main(int argc, char *argv[]) {

    //Handler::getInstance()->compress("/home/carlos/Escritorio/homero.gif", "/home/carlos/Documentos/");

    Handler::getInstance()->decompress("/home/carlos/Documentos/pu.lz78", "/home/carlos/Escritorio/");

    /*std::string nombre, extesion;

    nombre = getFileName("/home/carlos/Escritorio/UbuntuWallpaper.bmp");

    extesion = getFileExtension("/home/carlos/Escritorio/UbuntuWallpaper.bmp");

    std::cout << nombre + "." + extesion << std::endl;*/

    return 0;
}

