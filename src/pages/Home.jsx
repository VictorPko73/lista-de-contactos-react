import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { createAgenda, getContacts, deleteContact } from "../services/agendaService.js";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  /**
   * Inicializar agenda y cargar contactos
   */
  useEffect(() => {
    const initializeAgenda = async () => {
      try {
        console.log('🚀 Inicializando agenda victormoreno...');
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Crear agenda si no existe
        await createAgenda();
        
        // Cargar contactos
        const contacts = await getContacts();
        dispatch({ type: 'LOAD_CONTACTS', payload: contacts });
        
        console.log(`✅ Agenda cargada con ${contacts.length} contactos`);
      } catch (error) {
        console.error('❌ Error inicializando agenda:', error);
      }
    };

    initializeAgenda();
  }, []);

  /**
   * Confirmar eliminación de contacto
   */
  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  /**
   * Eliminar contacto confirmado
   */
  const confirmDelete = async () => {
    if (contactToDelete) {
      try {
        console.log(`🗑️ Eliminando contacto: ${contactToDelete.name}`);
        const success = await deleteContact(contactToDelete.id);
        
        if (success) {
          dispatch({ type: 'DELETE_CONTACT', payload: contactToDelete.id });
          console.log('✅ Contacto eliminado exitosamente');
        }
      } catch (error) {
        console.error('❌ Error eliminando contacto:', error);
      }
    }
    
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  /**
   * Cancelar eliminación
   */
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          
          {/* Botón Add new contact - Esquina superior derecha */}
          <div className="d-flex justify-content-end mb-4">
            <Link to="/add-contact" className="btn btn-success px-4">
              Add new contact
            </Link>
          </div>

          {/* Contenedor principal con fondo blanco */}
          <div className="bg-white rounded shadow-sm">
            
            {/* Lista de contactos */}
            {store.contacts.map((contact, index) => (
              <div key={contact.id}>
                <div className="p-4">
                  <div className="row align-items-center">
                    
                    {/* Avatar */}
                    <div className="col-2">
                      <img
                        src={`https://picsum.photos/80/80?random=${contact.id}`}
                        alt={contact.name}
                        className="rounded-circle"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      />
                    </div>

                    {/* Información del contacto */}
                    <div className="col-8">
                      <div className="ms-3">
                        <h5 className="mb-2 fw-bold text-dark">{contact.name}</h5>
                        <div className="text-muted">
                          <div className="mb-1">
                            <i className="fas fa-map-marker-alt me-2" style={{ width: '16px' }}></i>
                            {contact.address}
                          </div>
                          <div className="mb-1">
                            <i className="fas fa-phone me-2" style={{ width: '16px' }}></i>
                            {contact.phone}
                          </div>
                          <div className="mb-0">
                            <i className="fas fa-envelope me-2" style={{ width: '16px' }}></i>
                            {contact.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="col-2">
                      <div className="d-flex justify-content-end">
                        {/* Botón editar */}
                        <Link 
                          to={`/edit-contact/${contact.id}`} 
                          className="btn btn-light btn-sm me-2 border"
                          style={{ width: '40px', height: '40px' }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </Link>
                        
                        {/* Botón eliminar */}
                        <button 
                          className="btn btn-light btn-sm border"
                          style={{ width: '40px', height: '40px' }}
                          onClick={() => handleDeleteClick(contact)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Línea separadora (excepto en el último elemento) */}
                {index < store.contacts.length - 1 && (
                  <hr className="m-0" style={{ borderColor: '#e9ecef' }} />
                )}
              </div>
            ))}

            {/* Mensaje cuando no hay contactos */}
            {store.contacts.length === 0 && !store.isLoading && (
              <div className="text-center py-5">
                <i className="fas fa-address-book fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">No contacts yet</h4>
                <p className="text-muted">Add your first contact to get started</p>
                <Link to="/add-contact" className="btn btn-success">
                  Add new contact
                </Link>
              </div>
            )}

            {/* Loading */}
            {store.isLoading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Are you sure?</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p className="mb-0">
                  If you delete this thing the entire universe will go down!
                </p>
              </div>
              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-primary px-4" 
                  onClick={cancelDelete}
                >
                  Oh no!
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary px-4" 
                  onClick={confirmDelete}
                >
                  Yes baby!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};