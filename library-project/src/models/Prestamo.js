// Clase Prestamo

class Prestamo {
    constructor(libro, usuario, fechaPrestamo, fechaDevolucion) {
        this._libro = libro;
        this._usuario = usuario;
        this._fechaPrestamo = fechaPrestamo;
        this._fechaDevolucion = fechaDevolucion;
    }

    get libro() {
        return this._libro;
    }

    get usuario() {
        return this._usuario;
    }

    get fechaPrestamo() {
        return this._fechaPrestamo;
    }

    get fechaDevolucion() {
        return this._fechaDevolucion;
    }

    set libro(nuevoLibro) {
        this._libro = nuevoLibro;
    }

    set usuario(nuevoUsuario) {
        this._usuario = nuevoUsuario;
    }

    set fechaPrestamo(nuevaFechaPrestamo) {
        this._fechaPrestamo = nuevaFechaPrestamo;
    }

    set fechaDevolucion(nuevaFechaDevolucion) {
        this._fechaDevolucion = nuevaFechaDevolucion;
    }

    // Método para calcular la duración del préstamo en días
    registrarPrestamo() {
        console.log(`Préstamo registrado: ${this._libro.titulo} prestado a ${this._usuario.nombre} el ${this._fechaPrestamo}. Devolución prevista para el ${this._fechaDevolucion}.`);  
    }
    
    registrarDevolucion() {
        console.log(`Devolución registrada: ${this._libro.titulo} devuelto por ${this._usuario.nombre} el ${this._fechaDevolucion}.`);  
    }
}

export default Prestamo;