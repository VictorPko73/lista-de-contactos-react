/**
 * Servicio para manejar la API de contactos de 4Geeks
 * Agenda: victormoreno
 */

const API_BASE_URL = 'https://playground.4geeks.com/contact';
const AGENDA_SLUG = 'victormoreno';

/**
 * Crear la agenda personal si no existe
 * @returns {Promise} Respuesta de la API
 */
export const createAgenda = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Agenda creada exitosamente:', data);
      return data;
    } else {
      console.log('ℹ️ La agenda ya existe o hubo un error');
      return null;
    }
  } catch (error) {
    console.error('❌ Error creando agenda:', error);
    throw error;
  }
};

/**
 * Obtener todos los contactos de la agenda
 * @returns {Promise<Array>} Lista de contactos
 */
export const getContacts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Contactos obtenidos:', data);
      return data.contacts || [];
    } else {
      console.error('❌ Error obteniendo contactos:', response.status);
      return [];
    }
  } catch (error) {
    console.error('❌ Error en getContacts:', error);
    return [];
  }
};

/**
 * Crear un nuevo contacto
 * @param {Object} contactData - Datos del contacto {name, phone, email, address}
 * @returns {Promise<Object>} Contacto creado
 */
export const createContact = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Contacto creado:', data);
      return data;
    } else {
      console.error('❌ Error creando contacto:', response.status);
      throw new Error('Error creando contacto');
    }
  } catch (error) {
    console.error('❌ Error en createContact:', error);
    throw error;
  }
};

/**
 * Eliminar un contacto
 * @param {number} contactId - ID del contacto a eliminar
 * @returns {Promise<boolean>} True si se eliminó correctamente
 */
export const deleteContact = async (contactId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      console.log('✅ Contacto eliminado:', contactId);
      return true;
    } else {
      console.error('❌ Error eliminando contacto:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Error en deleteContact:', error);
    return false;
  }
};

/**
 * Actualizar un contacto existente
 * @param {number} contactId - ID del contacto
 * @param {Object} contactData - Nuevos datos del contacto
 * @returns {Promise<Object>} Contacto actualizado
 */
export const updateContact = async (contactId, contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Contacto actualizado:', data);
      return data;
    } else {
      console.error('❌ Error actualizando contacto:', response.status);
      throw new Error('Error actualizando contacto');
    }
  } catch (error) {
    console.error('❌ Error en updateContact:', error);
    throw error;
  }
};