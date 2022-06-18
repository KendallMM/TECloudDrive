
import React,{Component} from "react";
import axios from 'axios';




class App extends Component{

    constructor(){
        super();
        this.Titulo = 'Clound computing'
        this.UsuarioSelecionado = false;
        this.nombreboton = ''
        this.state = {
            ruta: "",
            compresion:"",
            _id: "",
            archivos: [],
            propietario: '',
            selectedFile: [],
            singleProgress: 0,
            tipo_archivo: "",
            etiqueta:'',
            nombreboton:'Buscar'
        };
        this.handleChange = this.handleChange.bind(this);
        this.AgregarArchivo = this.AgregarArchivo.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        

    }
    onFileChange(e){
    
        // Update the state
        
        this.setState({ selectedFile: e.value });
        //this.setState({ruta: '', compresion:"",_id:''})
      
      };

    onFileUpload(){


        const f = new FormData();

        f.append("file",this.state.selectedFile);
        
        
        console.log(this.state.selectedFile);
        const apiUrl = 'http://localhost:3000/api/';



        axios.post(apiUrl + 'singleFile', f);
      
        // Request made to the backend api
        // Send formData object
        //axios.post("api/uploadfile", formData);
      };

    descargar(id){
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.compresion);
                /*this.setState({
                    
                    ruta: ruta2,
                    compresion: compresion2,
                    _id: id
                });*/
            });

        
    }
    logicabotonetiqueta(id){
        if((this.state.nombreboton === 'Actualizar')){
            
            this.editaretiqueta(id);
            
        }
        else{
            
            fetch(`/api/tasks/busqueda/${this.state.propietario}/${this.state.etiqueta}` )
            .then(res => res.json())
            .then(data => {
                this.setState({archivos:data.archivo});
                console.log(data.archivo);

            })

        }
            

        };
    editaretiqueta(id){
        fetch(`/api/tasks/editaretiqueta/${id}`,{
            method: 'PUT',
            body: JSON.stringify(this.state),
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }


        })
            .then(res => res.json())
            .then(data => {
                console.log(data.compresion);
                this.demelosArchivos(this.state.propietario);
                this.setState({
                    
                    nombreboton: 'Buscar',
                    _id: ''
                });
    
                
            });

        
    }

    eliminarArchivo(_id){
        if(confirm('Esta seguro que quiere el eliminar el archivo?')){
            fetch(`/api/tasks/${_id}` ,{
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
    
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html:'archivo borrado'});
                    this.obtenerArchivos();
    
                })

        }


        
    }

    AgregarArchivo(e){
        e.preventDefault();
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}` ,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }

    
            })
            .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html:'archivo editado'});
                    this.setState({ruta: '', compresion:"",_id:'',tipo_archivo:'',etiqueta:''})
                    this.demelosArchivos(this.state.propietario);
    
                })
                .catch(err => console.err(err));

        }else{
            console.log('are');
            fetch('/api/tasks',{
                
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
    
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html:'archivo comprimido'});
                    this.setState({ruta: '', compresion:"",tipo_archivo:'',etiqueta:''})
                    this.demelosArchivos(this.state.propietario);
    
                })
                .catch(err => console.err(err));
        }
        
    }

    componentDidMount(){
        //this.obtenerArchivos();
    }

    obtenerArchivos(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data =>{ 
                this.setState({archivos:data});
                console.log(this.state.archivos);
            
            });

    }


    handleChange(e){
        const {name,value }= e.target;
        this.setState({
            [name]: value
        });

    }

    demelosArchivos(propietario2){
        
        fetch(`/api/tasks/busqueda/${propietario2}` )
            .then(res => res.json())
            .then(data => {
                this.setState({archivos:data.archivo});
                console.log(data.archivo);

            })

    }
    cancelareventos(e){
        e.preventDefault();
    }

    render(){



        this.UsuarioSelecionado = true;
        console.log('hola');
        console.log('busav¡cando archivos');

                return(
                    <div>
        
                   
                    {/*navegacion*/}
                    
                    <nav className = "light-blue darken-4"> 
                        <div className="container">
                            <a className="brand-logo" href="/">
                                {this.Titulo}
                            </a>

                        </div>

                     </nav>
                    <div>
                    <form onSubmit={this.cancelareventos}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name= "propietario" onChange={this.handleChange} type= "text" placeholder = "Coloca tu usuario" value={this.state.propietario}/>
                            </div>
                        </div>
                        <button  className="btn light-blue darken-4" style= {{margin: '4px'}}  onClick = {() => this.demelosArchivos(this.state.propietario)}>
                                Mis Archivos
                        </button>
                        
                        
                        
                        </form>

                    </div>
                    
                    
                    <div className="container">
                        <div className="row">
                            <div className="col s5">
                                <div className="card">
                                    <div className="card-content">
                                        <form onSubmit={this.cancelareventos}>

                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name= "ruta" onChange={this.handleChange} type= "text" placeholder = "ruta de programa" value={this.state.ruta}/>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <input name= "tipo_archivo" onChange={this.handleChange} type= "text" placeholder = "tipo_archivo" value={this.state.tipo_archivo}/>
                                                </div>
                                            </div>

                                            

                                          
                                        
                                            
                                            
                                            <div className="row">
                                                <div className="input-field col s12">
                                                    <textarea name="compresion" onChange={this.handleChange}  placeholder="tipo de compresion(huffman-lz77-lz78-lzw)" className="materalize-textarea"  value={this.state.compresion}>
                                                    </textarea>
                                                </div>
                                            </div>
                                            <div>
                                                <button  className="btn light-blue darken-4" type="submit"  style= {{margin: '4px'}}  onClick = {() => {this.setState({compresion:'huffman'})}}>
                                                        Huffman
                                                </button>
                                                <button  className="btn light-blue darken-4" type="submit"  style= {{margin: '4px'}}  onClick = {() => {this.setState({compresion:'LZ77'})}}>
                                                        LZ77
                                                </button>
                                                <button  className="btn light-blue darken-4" type="submit"  style= {{margin: '4px'}}  onClick = {() => {this.setState({compresion:'LZ78'})}}>
                                                        LZ78
                                                </button>
                                                <button  className="btn light-blue darken-4" type="submit"  style= {{margin: '4px'}}  onClick = {() => {this.setState({compresion:'LZW'})}}>
                                                        LZW
                                                </button>

                                            </div>
                                            
                                            
                                            <button type = "submit" className="btn light-blue darken-4"  onClick ={this.AgregarArchivo} >
                                                Agregar
                                            </button>
                                        </form>
                                    </div>
                                </div>
        
                            </div>
                            <div className="col s7">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ruta</th>
                                            <th>Etiqueta</th>
                                            <th>Compresion</th>
                                        </tr>
                                        
        
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.archivos.map(Archivo =>{
                                                return (
                                                    <tr key={Archivo._id}>
                                                        <td>{Archivo.guardado}</td>
                                                        <td>{Archivo.etiqueta}
                                                        <button  className="btn light-blue darken-4"  onClick = {()=> this.setState({_id:Archivo._id,nombreboton:'Actualizar'})}>
                                                                <i className = 'material-icons'>edit</i>
                                                                
                                                        </button></td>
                                                        
                                                        <td>{Archivo.compresion}</td>
                                                        <td>
                                                            <button  className="btn light-blue darken-4" style= {{margin: '4px'}} onClick = {()=> this.eliminarArchivo(Archivo._id)}>
                                                                <i className = 'material-icons'>delete</i>
                                                                
                                                            </button>
                                                            <button  className="btn light-blue darken-4" style= {{margin: '4px'}}  onClick = {() => this.descargar(Archivo._id)}>
                                                            <i className = 'material-icons'>download</i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
        
                                            })
                                        }
        
        
                                    </tbody>
                                </table>
        
                            </div>
                            <div>
                            <form onSubmit={this.cancelareventos}>

                                
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input name= "etiqueta" onChange={this.handleChange} type= "text" placeholder = "etiqueta" value={this.state.etiqueta}/>
                                    </div>
                                </div>

                                <button type = "submit" className="btn light-blue darken-4"   onClick = {() => this.logicabotonetiqueta(this.state._id)} >
                                    {this.state.nombreboton}
                                </button>
                                </form>
                            </div>
        
                        </div>
        
                    </div>
                </div>)

    
    

                
                
                
      
    }
}

export default App;