
// NOTA: Al final se encuentra el código sin comentarios//
/*
Requerimientos 
 
1. Implementar el Patrón Módulo mediante IIFE, en donde: 
 
● Se cree una función privada que reciba la url del video y el id de la etiqueta                                 
iframe, para así poder mostrar los videos en el documento HTML. Dato:                       
puedes utilizar la instrucción “setAttribute” para manipular el DOM. 
● Se retorne una función pública que reciba los parámetros (url, id), y realice el                           
llamado a la función interna (privada) para insertar los elementos recibidos. 
*/
// Patron Modulo, es un modulo donde se encapsula toda la logica de nuestra aplicacion o proyecto.
// Dentro de este módulo estarán declaradas todas las variables o funciones privadas.
// Podemos utilizar métodos publicos o privados como variables dentro de un obejto.

// a.- Dentro de patronModulo se declara una funcion AutoEjecutable.
let patronModulo = (() => {

    const funcionPrivada = (url, id) => {
       // setAttibute le da el valor de la url al atributo src
       // la id dependerá de lo elejido por el usuario en el HTML(musica, pelicula o serie)
       id.setAttribute("src", url)
       //id.style.display = "block"
    }
    console.log(funcionPrivada)

    return {
        funcionPublica: (url, id) => funcionPrivada(url, id)
        /* 
        //Otra sintaxis
        funcionPublica: (url, id) => {
            return funcionPrivada(url, id);
        }
        */        
    }
})()

/*
2. Establecer una clase padre denominada Multimedia para: 
● Recibir la propiedad url, ejemplo:         
“​https://www.youtube.com/embed/5PSNL1qE6VY​ ”, la cual será el atributo           
src que necesite la etiqueta iframe para poder mostrar el video. 
● Proteger el atributo de la clase implementado closures. 
● Agregar un método denominado “setInicio”, que retorne el siguiente mensaje:                   
“Este método es para realizar un cambio en la URL del video”. 
*/

// SUPERCLASE MULTIMEDIA
class Multimedia {
    //Implementar CLOSURES dentro del constructor de la class Multimedia.
    constructor(url) {
        
        // Se declara el atributo con let.
        // Se agrega "_" para identidicar que será un atributo privado.
        let _url = url;

        //Se crea función interna getUrl, la cual retorna directamente el valor de la variable privada _url.
        //Se le agrega a este METODO la palabra reservada this, para que sea accesible desde el exterior.
        this.getUrl = () => _url;

        // con estos pasos se logra que no se acceda directamente a la propiedad url.
    }
    // Metodo get a la propiedad url
    // Este apunta proteger a la función que retorna el valor del atributo url dentro del constructor.
    get url() {
        return this.getUrl();
    }
    setInicio() {
        console.log(`“Este método es para realizar un cambio en la URL del video”`);
    }
}
/*
3. Crear una clase “Reproductor”, siendo hija de la clase padre Multimedia para: 
● Recibir la propiedad id, la cual será el elemento del DOM que se necesita para                             
poder agregar la URL en la etiqueta iframe que corresponda. Por ejemplo: Si                         
se envía una URL para Música, el id debe ser el perteneciente a la etiqueta                             
iframe que se encuentra en la sección de música. 
● Crear un método denominado “playMultimedia”, que permita hacer el llamado                   
a la función pública de la IIFE, enviando los atributos url y id.  
● Agregar un método denominado “setInicio”, que reciba y agregue un tiempo                     
de inicio a la URL de la etiqueta iframe. Se puede utilizar el método                           
“setAttribute” para modificar la URL agregando al final de la misma lo                       
siguiente: “?start=${tiempo}”. Esto permitirá que cualquiera de los videos que                   
implemente el método inicie en el tiempo pasado como argumento al método                       
al ser invocado. 
*/
class Reproductor extends Multimedia {
     //Implementar CLOSURES dentro del constructor de la class Multimedia.
    constructor(url, id) {
        // se hereda el atributo url de la superclase Multimedia
        super(url);
        
        // Se declara el atributo con let.
        // Se agrega "_" para identidicar que será un atributo privado.
        let _id = id

        //Se crea función interna getId, la cual retorna directamente el valor de la variable privada _id.
        //Se le agrega a este METODO la palabra reservada this, para que sea accesible desde el exterior.
        this.getId = () => _id;
    }
    // Metodo playMultimedia haece el llamado a la funcionPublica que esta contenida y retorna de patronModulo
    // Le envía los atributos url e id
    playMultimedia() {
        patronModulo.funcionPublica(this.url, this.getId())
    }
    // Metodo setInicio
    setInicio(tiempo) {
        this.getId().setAttribute("src", `${this.url}?start=${tiempo}`)
        
    }
}

/*
4. Instanciar la clase hija pasando como argumento la URL y el id para cada etiqueta                             
iframe, por lo que se deben crear tres instancias, una para música, otra para película                             
y otra para serie, con sus respectivas URL. 
*/
let musicaReproductor = new Reproductor ("https://www.youtube.com/embed/jNo3zmhXE9Y", musica);
let peliculaReproductor = new Reproductor("https://www.youtube.com/embed/Pa_dOcZxDy8?autoplay=1&mute=1&enablejsapi=1", pelicula); //se agrega "?autoplay=1&mute=1&enablejsapi=1" para la reproduccion automatica en silencio.
let serieReproductor = new Reproductor ("https://www.youtube.com/embed/R3LY1-GZxDs?autoplay=1&mute=1&enablejsapi=1", serie);
//let serieReproductor = new Reproductor ("https://www.dailymotion.com/embed/video/x8458w9?autoplay=1", serie);

/*
5. Invocar al método “playMultimedia” para cada instancia creada, mostrando así los                     
videos en el documento HTML. 
*/
musicaReproductor.playMultimedia();
peliculaReproductor.playMultimedia();
serieReproductor.playMultimedia();

/*
6. Utiliza el método “setInicio” para modificar el tiempo de inicio en alguna de las                           
instancias creadas. 
*/
musicaReproductor.setInicio(100);

// 7.-PRUEBAS
console.log(patronModulo);
let pruebaMultimedia = new Multimedia() 
console.log(pruebaMultimedia.setInicio());


/*
// CODIGO SIN INSTRUCCIONES NI COMENTARIOS
let modulo = (() => {
    const funcionPrivada = (url, id) => {
        id.setAttribute("src", url)
    }
    return {
        funcionPublica: (url, id) => { funcionPrivada(url, id) }
    }
})()
class Multimedia {
    constructor(url) {
        let _url = url;
        this.getUrl = () => _url;
    }
    get url() {
        return this.getUrl();
    }
    setInicio() {
        console.log(`“Este método es para realizar un cambio en la URL del video”`);
    }
}
class Reproductor extends Multimedia {
    constructor(url, id) {
        super(url);
        let _id = id
        this.getId = () => _id;
    }
    playMultimedia() {
        modulo.funcionPublica(this.url, this._id())
    }
    setInicio(tiempo) {
        this.getId().setAttribute("src", `${this.url}?start=${tiempo}`)  
    }
}
let musicaReproductor = new Reproductor ("https://www.youtube.com/embed/jNo3zmhXE9Y", musica);
let peliculaReproductor = new Reproductor("https://www.youtube.com/embed/Pa_dOcZxDy8?autoplay=1&mute=1&enablejsapi=1", pelicula);
let serieReproductor = new Reproductor ("https://www.youtube.com/embed/R3LY1-GZxDs?autoplay=1&mute=1&enablejsapi=1", serie);
musicaReproductor.playMultimedia();
peliculaReproductor.playMultimedia();
serieReproductor.playMultimedia();
musicaReproductor.setInicio(100);
console.log(patronModulo);
let pruebaMultimedia = new Multimedia() 
console.log(pruebaMultimedia.setInicio());
*/