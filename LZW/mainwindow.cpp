#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <iostream>
#include <sstream>
#include <QFileDialog>
#include "lzw.cpp"
#include <cstdint>
#include <cstring>
#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <chrono>

using namespace std;
using namespace lzw;

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::Compress(){
    string str;
    QString fileName = QFileDialog::getOpenFileName(this,
    tr("File to compress"), "/home/kendall/Escritorio/",NULL);
    if(!fileName.isEmpty()){
    std::string archivo=fileName.toStdString();
    std::string fileExtension = "", word;
    std::stringstream stream(archivo);
    /* Divide el nombre del archivo por puntos hasta obtener el ultimo string */
    while (getline(stream, formato, '.'));
    cout<<formato;
    ifstream in(archivo, ifstream::binary);
    if (in)
        {
            char c = in.get();
            cout<<"Wait..."<<endl;
            while (!in.eof())
            {
                str += c;
                c = in.get();
            }
            in.close();
        }


        cout << "Bytes read from file = " << str.size() << endl;


        vector<uint8_t> myVector(str.begin(), str.end());
        static const uint8_t* str0 = &myVector[0];

        LZW(str0, str.size());
    }
}
void MainWindow::LZW(const uint8_t * sampleData, const int sampleSize){
    int compressedSizeBytes = 0;
    int compressedSizeBits  = 0;
    uint8_t * compressedData = nullptr;
    vector<uint8_t> uncompressedBuffer(sampleSize, 0);


//----------------------------------------------------------------------------------------------------------------------------------
    easyEncode(sampleData, sampleSize, &compressedData,&compressedSizeBytes, &compressedSizeBits);			//Encoding

    cout << "LZW uncompressed size bytes = " << sampleSize << "\n";
    cout << "LZW compressed size bytes   = " << compressedSizeBytes << "\n\n";
    std::string rutaGuardado = ui->lineEdit->text().toStdString();
    ofstream out(rutaGuardado+"Comprimido.txt", ifstream::binary);
    for (int i = 0; i < compressedSizeBytes; i++)
    {
        out << compressedData[i];
    }
    cout<<"Encoded!"<<endl;
    out.close();
//----------------------------------------------------------------------------------------------------------------------------------
    const int uncompressedSize = easyDecode(compressedData, compressedSizeBytes, compressedSizeBits, uncompressedBuffer.data(), uncompressedBuffer.size());				//Decoding
    std::string rutaGuardado2 = ui->lineEdit->text().toStdString();
    ofstream out2(rutaGuardado2+"Descomprimido."+formato);
    for (int i = 0; i < uncompressedBuffer.size(); i++)
    {
        out2 << uncompressedBuffer[i];
    }
    cout<<"Decoded!"<<endl;
    out2.close();

    cout << "LZW decompressed size bytes   = " << uncompressedBuffer.size() << "\n\n";
//----------------------------------------------------------------------------------------------------------------------------------
    bool successful = true;
    if (uncompressedSize != sampleSize)					// comparing sizes
    {
        cout << "LZW COMPRESSION ERROR! Size mismatch!\n";
        successful = false;
    }
//----------------------------------------------------------------------------------------------------------------------------------
    if (memcmp(uncompressedBuffer.data(), sampleData, sampleSize) != 0)				//Comparing data
    {
        cout << "The files are not same. Data has been corrupted!\n";
        successful = false;
    }

    if (successful)
    {
        cout << "LZW compression successful!\n";
    }

    free(compressedData);
}

void MainWindow::on_pushButton_clicked()
{
    Compress();
}

