const express = require('express')
const morgan = require('morgan')
const path = require('path')
const fileRoutes = require('./routes/file-upload-routes')

const {mongoose} = require('./database');

const app = express();

//configuraciones
app.set('port', process.env.PORT || 3000)

//funciones antes de las rutas
app.use(morgan('dev'));
app.use(express.json());
//rutas

app.use('/api/tasks',require('./routes/task.routes'));
app.use('/api/usuarios',require('./routes/Usuario.rutas'));
app.use('/api',fileRoutes.routes);
//archivos estaticos
app.use(express.static(path.join(__dirname,'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//iniciando seervidor
app.listen(app.get('port'),()=>{
    console.log(`Server en el puerto ${app.get('port')}`);
})
