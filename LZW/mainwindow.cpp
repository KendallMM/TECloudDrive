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
    std::string nel=fileName.toStdString();
    stringstream input_stringstream(nel);
    cout<<nel<<endl;
    ifstream in(nel);
    if (in)
        {
            char c = in.get();
            while (!in.eof())
            {
                cout<<"Waiting..."<<endl;
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

        ofstream out("encoded.txt");
        for (int i = 0; i < compressedSizeBytes; i++)
        {
            out << compressedData[i];
        }
        out.close();
    //----------------------------------------------------------------------------------------------------------------------------------

        const int uncompressedSize = easyDecode(compressedData, compressedSizeBytes, compressedSizeBits, uncompressedBuffer.data(), uncompressedBuffer.size());				//Decoding

        ofstream out2("decoded.txt");
        for (int i = 0; i < uncompressedBuffer.size(); i++)
        {
            out2 << uncompressedBuffer[i];
        }

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

