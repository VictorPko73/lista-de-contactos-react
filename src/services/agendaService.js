/**
 * Servicio para manejar la API de contactos de 4Geeks
 * Agenda: victormoreno
 */

const API_BASE_URL = 'https://playground.4geeks.com/contact';
const AGENDA_SLUG = 'victormoreno';

// Cache para evitar verificaciones múltiples
let agendaVerified = false;

const ensureAgendaExists = async () => {
  // Si ya verificamos que existe, no hacer nada
  if (agendaVerified) return true;
  
  try {
    // Primero intentar obtener la agenda
    const checkResponse = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}`);
    
    if (checkResponse.ok) {
      agendaVerified = true;
      return true;
    }
    
    // Si no existe (404), crearla
    if (checkResponse.status === 404) {
      const createResponse = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (createResponse.ok) {
        const data = await createResponse.json();
        console.log('✅ Agenda creada exitosamente');
        agendaVerified = true;
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('❌ Error verificando/creando agenda:', error);
    return false;
  }
};

/**
 * Crear la agenda personal si no existe (método legacy)
 * @returns {Promise} Respuesta de la API
 */
export const createAgenda = async () => {
  return await ensureAgendaExists();
};

/**
 * Obtener todos los contactos de la agenda
 * @returns {Promise<Array>} Lista de contactos
 */
export const getContacts = async () => {
  try {
    // Asegurar que la agenda existe antes de obtener contactos
    await ensureAgendaExists();
    
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${data.contacts?.length || 0} contactos obtenidos`);
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


export const createContact = async (contactData) => {
  try {
    // Asegurar que la agenda existe antes de crear contacto
    await ensureAgendaExists();
    
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Contacto creado exitosamente:', data);
      return data;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Error creando contacto:', error);
    throw error;
  }
};


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
      console.log('✅ Contacto actualizado exitosamente:', data);
      return data;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Error actualizando contacto:', error);
    throw error;
  }
};


export const deleteContact = async (contactId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      console.log('✅ Contacto eliminado exitosamente');
      return true;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Error eliminando contacto:', error);
    return false;
  }
};


export const getContactById = async (contactId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${contactId}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Contacto obtenido:', data);
      return data;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('❌ Error obteniendo contacto:', error);
    throw error;
  }
};