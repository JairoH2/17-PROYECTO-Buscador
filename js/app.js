//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para resultados
const resultado = document.querySelector('#resultado');

const max =new Date().getFullYear();
const min= max-10;

//Generar un objeto de la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos); //Muestra los autos al cargar

    //Llena las opciones de años
    llenarSelect();
})

//Event Listenner para los select de busqueda
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})

year.addEventListener('change', e =>{
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo= e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
})

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})


//Funciones
function mostrarAutos(automovil){

    limpiarHTML();//Elimina el HTML Actual

    automovil.forEach(auto => {

        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        //Insertar en el HTML
        resultado.appendChild(autoHTML);
    });
}

//Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Geenera los años del Select
function llenarSelect(){

    for(let i = max; i>=min; i--){
        const opcion = document.createElement('option');
        opcion.value = i; //Al momento de seleccionar esta opcion pdamos acceder desde el value del select
        opcion.textContent = i;
        year.appendChild(opcion); //Agrega los años al select
    }
}


//Función que filtra con base a la búsqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
    }
    
}

function noResultado(){

    limpiarHTML(); //Limpiar HTML existente

    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay Resultados, intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);

}

//---Funcion de alto nivel para los filtrados
function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){
        return auto.marca === marca;
    }
    return auto; //Al no ejecutarse el otro return, permite que la ejcución hasta este return continue. En caso de no seleccionar ningun auto, se hace obvio que todos los autos son filtrados. 
}

function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){
        return auto.year === parseInt(year); //Nota: Contemplar que en las comparaciones se tengan el mismo tipo de dato. 
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda;
    if(minimo){
        return auto.precio >= parseInt(minimo); //Nota: Contemplar que al ser precio minimo debe retornar los autos que tengan un precio mayor al minimo. En este caso al no poder hacer este tipo de comparaciones con operador esctricto, el parseInt es opcional.
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda;
    if(maximo){
        return auto.precio <= parseInt(maximo); 
    }
    return auto;
}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    console.log(typeof auto.puertas)
    if(puertas){
        return auto.puertas === parseInt(puertas); 
    }
    return auto;
}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){
        return auto.transmision === transmision; 
    }
    return auto;
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){
        return auto.color === color; 
    }
    return auto;
}