/**
 * Estado inicial de la aplicación de contactos
 * @returns {Object} Estado inicial con contactos vacíos y estados de carga
 */
export const initialStore = () => {
  return {
    // Lista de contactos obtenidos de la API
    contacts: [],
    
    // Estados de carga para mostrar spinners o mensajes
    isLoading: false,
    
    // Mensajes de error o éxito
    message: null,
    
    // Estado de la agenda (si existe o no)
    agendaExists: false
  }
}

/**
 * Reducer para manejar las acciones del estado global
 * @param {Object} store - Estado actual
 * @param {Object} action - Acción a ejecutar {type, payload}
 * @returns {Object} Nuevo estado
 */
export default function storeReducer(store, action = {}) {
  switch(action.type) {
    
    // Establecer estado de carga
    case 'SET_LOADING':
      return {
        ...store,
        isLoading: action.payload
      };
    
    // Cargar todos los contactos desde la API
    case 'LOAD_CONTACTS':
      return {
        ...store,
        contacts: action.payload,
        isLoading: false
      };
    
    // Agregar un nuevo contacto a la lista
    case 'ADD_CONTACT':
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
        message: 'Contacto agregado exitosamente'
      };
    
    // Eliminar un contacto de la lista
    case 'DELETE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload),
        message: 'Contacto eliminado exitosamente'
      };
    
    // Actualizar un contacto existente
    case 'UPDATE_CONTACT':
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        ),
        message: 'Contacto actualizado exitosamente'
      };
    
    // Establecer mensaje (éxito o error)
    case 'SET_MESSAGE':
      return {
        ...store,
        message: action.payload
      };
    
    // Limpiar mensaje
    case 'CLEAR_MESSAGE':
      return {
        ...store,
        message: null
      };
    
    // Establecer si la agenda existe
    case 'SET_AGENDA_EXISTS':
      return {
        ...store,
        agendaExists: action.payload
      };
    
    default:
      throw Error(`Acción desconocida: ${action.type}`);
  }    
}
