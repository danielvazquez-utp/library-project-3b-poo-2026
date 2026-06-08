// Clase Usuario

class Usuario {
    constructor(noUsuario, nombre, apellidos, email, telefono) {
        this._noUsuario = noUsuario;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._email = email;
        this._telefono = telefono;
    }

    get noUsuario() {
        return this._noUsuario;
    }

    get nombre() {
        return this._nombre;
    }

    get apellidos() {
        return this._apellidos;
    }

    get email() {
        return this._email;
    }

    get telefono() {
        return this._telefono;
    }

    set noUsuario(nuevoNoUsuario) {
        this._noUsuario = nuevoNoUsuario;
    }

    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }

    set apellidos(nuevosApellidos) {
        this._apellidos = nuevosApellidos;
    }

    set email(nuevoEmail) {
        this._email = nuevoEmail;
    }

    set telefono(nuevoTelefono) {
        this._telefono = nuevoTelefono;
    }
}

export default Usuario;