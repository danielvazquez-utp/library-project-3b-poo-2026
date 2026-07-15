
import React, { useState, useEffect } from 'react'


const Settings = () => {

    const [libro, setLibro] = useState([]);
    const [editoriales, setEditoriales] = useState([]);

    // Función para buscar un libro
    const getEditoriales = async () => {
        try {
            const url = "https://congenial-adventure-p9vvgjv6j4xf7ggp-8000.app.github.dev/api/libros/editoriales";
            const response = await fetch(url);
            const data = await response.json();
            return data.data;
        } catch (error) {
            alert('Error al obtener las editoriales. Por favor, inténtelo de nuevo más tarde.');
            return [];
        }
    }

    // Función para buscar un libro
    const buscarLibro = async (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const autor = document.getElementById("autor").value;
        const editorial = document.getElementById("editorial").value;
        const isbn = document.getElementById("isbn").value;
        // console.log(`Titulo: ${ titulo }, Autor: ${ autor }, Editorial: ${ editorial }, ISBN: ${ isbn }`);

        try {
            let url = `https://congenial-adventure-p9vvgjv6j4xf7ggp-8000.app.github.dev/api/libros?`;
            if (titulo) url += `titulo=${encodeURIComponent(titulo)}&`;
            if (autor) url += `autor=${encodeURIComponent(autor)}&`;
            if (editorial) url += `editorial=${encodeURIComponent(editorial)}&`;
            if (isbn) url += `isbn=${encodeURIComponent(isbn)}&`;

            // Eliminar el último '&' si existe
            if (url.endsWith('&')) {
                url = url.slice(0, -1);
            }

            // console.log(`URL: ${url}`);
            const response = await fetch(url);
            const data = await response.json();
            setLibro(data.data);
            // console.log(data.data);
        } catch (error) {
            // console.error('Error al buscar el libro:', error);
            alert('Error al buscar el libro. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    // Función para agregar un libro
    const agregarLibro = async (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo_add").value;
        const autor = document.getElementById("autor_add").value;
        const editorial = document.getElementById("editorial_add").value;
        const isbn = document.getElementById("isbn_add").value;

        //console.log(`Titulo: ${ titulo }, Autor: ${ autor }, Editorial: ${ editorial }, ISBN: ${ isbn }`);

        try {
            const url = "https://congenial-adventure-p9vvgjv6j4xf7ggp-8000.app.github.dev/api/libros";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "titulo": titulo,
                        "autor": autor,
                        "editorial": editorial,
                        "isbn": isbn,
                        "disponible": true
                    }
                ),
            });

            if (response.ok) {
                // Aquí podrías limpiar los campos del formulario
                document.getElementById("titulo_add").value = "";
                document.getElementById("autor_add").value = "";
                document.getElementById("editorial_add").value = "";
                document.getElementById("isbn_add").value = "";
                // Mostrar mensaje de éxito
                alert('Libro agregado exitosamente');
            } else {
                alert('Error al agregar el libro. Por favor, inténtelo de nuevo más tarde.');
            }
        } catch (error) {
            alert('Error al agregar el libro. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    // Función para borrar un libro (con confirmación)
    const borrarLibro = async (id) => {
        // Confirmar la acción
        const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar este libro?');
        if (!confirmacion) {
            return;
        }

        try {
            const url = `https://congenial-adventure-p9vvgjv6j4xf7ggp-8000.app.github.dev/api/libros/${id}`;
            const response = await fetch(url, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Actualizar la lista de libros después de eliminar uno
                setLibro(libro.filter(item => item.id !== id));
                alert('Libro eliminado exitosamente');
            } else {
                alert('Error al eliminar el libro. Por favor, inténtelo de nuevo más tarde.');
            }
        } catch (error) {
            alert('Error al eliminar el libro. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    // Función para editar un libro (con confirmación)
    const editarLibro = (id) => {
        // Recuperando los datos del libro a editar
        const libroAEditar = libro.find(item => item.id === id);
        if (!libroAEditar) {
            alert('Libro no encontrado');
            return;
        }

        // Rellenando los campos del modal con los datos del libro
        document.getElementById("titulo_edit").value = libroAEditar.titulo;
        document.getElementById("autor_edit").value = libroAEditar.autor;
        document.getElementById("editorial_edit").value = libroAEditar.editorial;
        document.getElementById("isbn_edit").value = libroAEditar.isbn;
        document.getElementById("id_edit").value = libroAEditar.id;
    }

    // Función para actualizar un libro (con confirmación)
    const actualizarLibro = async (e) => {
        e.preventDefault();
        const titulo = document.getElementById("titulo_edit").value;
        const autor = document.getElementById("autor_edit").value;
        const editorial = document.getElementById("editorial_edit").value;
        const isbn = document.getElementById("isbn_edit").value;
        const idLibroAEditar = document.getElementById("id_edit").value;

        if (!idLibroAEditar) {
            alert('No se pudo determinar el libro a actualizar. Por favor, inténtelo de nuevo.');
            return;
        }

        try {
            const url = `https://congenial-adventure-p9vvgjv6j4xf7ggp-8000.app.github.dev/api/libros/${idLibroAEditar}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "titulo": titulo,
                        "autor": autor,
                        "editorial": editorial,
                        "isbn": isbn,
                        "disponible": true
                    }
                ),
            });

            if (response.ok) {
                
                alert('Libro actualizado exitosamente');
                

            } else {
                alert('Error al actualizar el libro. Por favor, inténtelo de nuevo más tarde.');
            }
        } catch (error) {
            alert('Error al actualizar el libro. Por favor, inténtelo de nuevo más tarde.');
        }
    }

    useEffect( () => {
        const loadEditoriales = async () => {
            const editorialesData = await getEditoriales();
            setEditoriales(Array.isArray(editorialesData) ? editorialesData : []);
        }
        
        loadEditoriales();

    }, []);

    return (
        <>
            <main className="app-main" id="main" tabindex="-1">
                <div className="app-content-header">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-6">
                                <h3 className="mb-0">Librería</h3>
                            </div>
                            <div className="col-sm-6">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="app-content">
                    <div className="container-fluid">
                        <div className="row g-3">

                            <div className="col-md-3">
                                <div className="list-group list-group-flush nav nav-pills flex-column" id="settings-nav" role="tablist" aria-label="Navigation 18">
                                    <a href="#aservo" className="list-group-item list-group-item-action active" data-bs-toggle="pill" role="tab" aria-selected="true">
                                        <i className="bi bi-person me-2" aria-hidden="true"></i>Aservo
                                    </a>
                                    <a href="#libros" className="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab" aria-selected="false" tabindex="-1">
                                        <i className="bi bi-book me-2" aria-hidden="true"></i>Libros
                                    </a>
                                    <a href="#notifications" className="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab" aria-selected="false" tabindex="-1">
                                        <i className="bi bi-bell me-2" aria-hidden="true"></i>Notifications
                                    </a>
                                    <a href="#security" className="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab" aria-selected="false" tabindex="-1">
                                        <i className="bi bi-shield-lock me-2" aria-hidden="true"></i>Security
                                    </a>
                                    <a href="#billing" className="list-group-item list-group-item-action" data-bs-toggle="pill" role="tab" aria-selected="false" tabindex="-1">
                                        <i className="bi bi-credit-card me-2" aria-hidden="true"></i>Billing
                                    </a>
                                    <a href="#danger" className="list-group-item list-group-item-action text-danger" data-bs-toggle="pill" role="tab" aria-selected="false" tabindex="-1">
                                        <i className="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
                                        Danger zone
                                    </a>
                                </div>
                            </div>


                            <div className="col-md-9">
                                <div className="tab-content">

                                    <div className="tab-pane fade show active" id="aservo" role="tabpanel">
                                        {/* Buscar un libro */}
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Buscar un libro</h3>
                                            </div>
                                            <div className="card-body">
                                                <p>Encuentra el libro que buscas en nuestro aservo, introduce alguno de los siguientes campos</p>
                                                <form className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="titulo"> Título </label>
                                                        <input type="text" className="form-control" id="titulo" name="titulo" placeholder="Best seller" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="autor"> Autor </label>
                                                        <input type="text" className="form-control" id="autor" name="autor" placeholder="Jane Doe" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="editorial"> Editorial </label>
                                                        <select className="form-select" id="editorial" name="editorial">
                                                            <option value="">Seleccione una editorial</option>
                                                            {
                                                                editoriales.map((editorial, index) => (
                                                                    <option key={index} value={editorial}>{editorial}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="isbn"> ISBN </label>
                                                        <input type="text" className="form-control" id="isbn" name="isbn" placeholder="1234566" />
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary" onClick={(e) => buscarLibro(e)}>Buscar</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        {/* Resultados de la búsqueda */}
                                        <div className="card mt-3">
                                            <div className="card-header">
                                                <h3 className="card-title">Resultados de la búsqueda</h3>
                                            </div>
                                            <div className="card-body">
                                                {
                                                    libro.length > 0 ? (
                                                        <ul className="list-group">
                                                            {libro.map((item, index) => (
                                                                <li key={index} className="list-group-item">
                                                                    {/* Información del libro: */}
                                                                    <strong>Título:</strong> {item.titulo} <br />
                                                                    <strong>Autor:</strong> {item.autor} <br />
                                                                    <strong>Editorial:</strong> {item.editorial} <br />
                                                                    <strong>ISBN:</strong> {item.isbn}
                                                                    {/* Botones de edición y eliminación (puedes implementar la funcionalidad según tus necesidades) */}
                                                                    <div className="mt-2">
                                                                        <button className="btn btn-sm btn-primary me-2" data-bs-toggle="modal" data-bs-target="#editarLibroModal" onClick={() => editarLibro(item.id)}>Editar</button>
                                                                        <button className="btn btn-sm btn-danger" onClick={() => borrarLibro(item.id)}>Eliminar</button>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No se encontraron resultados.</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="libros" role="tabpanel">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Agregar nuevo libro</h3>
                                            </div>
                                            <div className="card-body">
                                                <form className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="titulo_add"> Título </label>
                                                        <input type="text" className="form-control" id="titulo_add" name="titulo_add" placeholder="Best seller" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="autor_add"> Autor </label>
                                                        <input type="text" className="form-control" id="autor_add" name="autor_add" placeholder="Jane Doe" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="editorial_add"> Editorial </label>
                                                        <input type="text" className="form-control" id="editorial_add" name="editorial_add" placeholder="Planet" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="isbn_add"> ISBN </label>
                                                        <input type="text" className="form-control" id="isbn_add" name="isbn_add" placeholder="1234566" />
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary" onClick={(e) => agregarLibro(e) }>Agregar Libro</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="tab-pane fade" id="notifications" role="tabpanel">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Notifications</h3>
                                            </div>
                                            <div className="card-body">
                                                <p className="text-secondary">Choose what to be notified about.</p>
                                                <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                    <div>
                                                        <p className="mb-0 fw-semibold">Product updates</p>
                                                        <small className="text-secondary">Major releases and changelogs</small>
                                                    </div>
                                                    <div className="form-check form-switch mb-0">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="notif-0" checked="" />
                                                        <label className="visually-hidden" for="notif-0">
                                                            Toggle Product updates
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                    <div>
                                                        <p className="mb-0 fw-semibold">Security alerts</p>
                                                        <small className="text-secondary">Sign-in attempts and account changes</small>
                                                    </div>
                                                    <div className="form-check form-switch mb-0">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="notif-1" checked="" />
                                                        <label className="visually-hidden" for="notif-1">
                                                            Toggle Security alerts
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                    <div>
                                                        <p className="mb-0 fw-semibold">Weekly digest</p>
                                                        <small className="text-secondary">A summary of activity in your workspace</small>
                                                    </div>
                                                    <div className="form-check form-switch mb-0">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="notif-2" />
                                                        <label className="visually-hidden" for="notif-2">
                                                            Toggle Weekly digest
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-start py-2 border-bottom">
                                                    <div>
                                                        <p className="mb-0 fw-semibold">Mentions</p>
                                                        <small className="text-secondary">When a teammate @mentions you</small>
                                                    </div>
                                                    <div className="form-check form-switch mb-0">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="notif-3" />
                                                        <label className="visually-hidden" for="notif-3">
                                                            Toggle Mentions
                                                        </label>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary mt-3">Save preferences</button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="tab-pane fade" id="security" role="tabpanel">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Password</h3>
                                            </div>
                                            <div className="card-body">
                                                <form className="row g-3">
                                                    <div className="col-md-12">
                                                        <label className="form-label" for="pwd-current"> Current password </label>
                                                        <input type="password" className="form-control" id="pwd-current" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="pwd-new"> New password </label>
                                                        <input type="password" className="form-control" id="pwd-new" />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label" for="pwd-confirm">
                                                            Confirm new password
                                                        </label>
                                                        <input type="password" className="form-control" id="pwd-confirm" />
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary">Update password</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="card mt-3">
                                            <div className="card-header">
                                                <h3 className="card-title">Two-factor authentication</h3>
                                            </div>
                                            <div className="card-body d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p className="mb-0 fw-semibold">Authenticator app</p>
                                                    <small className="text-secondary">
                                                        Use an authenticator app such as 1Password or Authy.
                                                    </small>
                                                </div>
                                                <button className="btn btn-outline-primary">Enable</button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="tab-pane fade" id="billing" role="tabpanel">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Current plan</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    <div>
                                                        <p className="mb-0 fw-semibold">Pro plan</p>
                                                        <small className="text-secondary">
                                                            $29 / month · Renews June 18, 2026
                                                        </small>
                                                    </div>
                                                    <a href="#" className="btn btn-outline-primary btn-sm"> Change plan </a>
                                                </div>
                                                <hr />
                                                <p className="fw-semibold mb-2">Payment method</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <i className="bi bi-credit-card-2-front me-2" aria-hidden="true"></i>
                                                        Visa ending in 4242
                                                    </div>
                                                    <a href="#" className="btn btn-link btn-sm">Update</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="tab-pane fade" id="danger" role="tabpanel">
                                        <div className="card border-danger">
                                            <div className="card-header bg-danger-subtle">
                                                <h3 className="card-title text-danger">Danger zone</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div>
                                                        <p className="mb-0 fw-semibold">Export account data</p>
                                                        <small className="text-secondary">
                                                            Download a copy of all your data as a ZIP archive.
                                                        </small>
                                                    </div>
                                                    <button className="btn btn-outline-secondary">Export</button>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div>
                                                        <p className="mb-0 fw-semibold text-danger">Delete account</p>
                                                        <small className="text-secondary">
                                                            This will permanently delete your account and all associated data.
                                                            This cannot be undone.
                                                        </small>
                                                    </div>
                                                    <button className="btn btn-danger">Delete account</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal para editar libro */}
                <div className="modal fade" id="editarLibroModal" tabIndex="-1" aria-labelledby="editarLibroModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editarLibroModalLabel">Editar Libro</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* Aquí puedes agregar un formulario para editar el libro */}
                                <form>
                                    {/* Identificador del libro */}
                                    <div className="mb-3">
                                        <label htmlFor="id_edit" className="form-label">No. de inventario</label>
                                        <input type="text" className="form-control" id="id_edit" name="id_edit" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="titulo_edit" className="form-label">Título</label>
                                        <input type="text" className="form-control" id="titulo_edit" name="titulo_edit" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="autor_edit" className="form-label">Autor</label>
                                        <input type="text" className="form-control" id="autor_edit" name="autor_edit" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editorial_edit" className="form-label">Editorial</label>
                                        <input type="text" className="form-control" id="editorial_edit" name="editorial_edit" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="isbn_edit" className="form-label">ISBN</label>
                                        <input type="text" className="form-control" id="isbn_edit" name="isbn_edit" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary" onClick={(e) => actualizarLibro(e)}>Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Settings
