// Clase Libro

class Libro {
    constructor(titulo, autor, editorial, isbn, disponible, noInventario) {
        this._titulo = titulo;
        this._autor = autor;
        this._editorial = editorial;
        this._isbn = isbn;
        this._disponible = disponible;
        this._noInventario = noInventario;
    }

    get titulo() {
        return this._titulo;
    }

    get autor() {
        return this._autor;
    }

    get editorial() {
        return this._editorial;
    }

    get isbn() {
        return this._isbn;
    }

    get noInventario() {
        return this._noInventario;
    }

    set titulo(nuevoTitulo) {
        this._titulo = nuevoTitulo;
    }

    get disponible() {
        return this._disponible;
    }

    set autor(nuevoAutor) {
        this._autor = nuevoAutor;
    }

    set isbn(nuevoIsbn) {
        this._isbn = nuevoIsbn;
    }

    set editorial(nuevaEditorial) {
        this._editorial = nuevaEditorial;
    }

    set disponible(nuevoDisponible) {
        this._disponible = nuevoDisponible;
    }

    set noInventario(nuevoNoInventario) {
        this._noInventario = nuevoNoInventario;
    }

    // Métodos

    prestar() {
        if (this._disponible) {
            this._disponible = false;
            return true;
        }
        return false;
    }

    devolver() {
        this._disponible = true;
    }
}

export default Libro;