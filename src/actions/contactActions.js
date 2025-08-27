/**
 * Action Creators para la aplicación de contactos
 * Estas funciones crean objetos de action estandarizados
 */

// Actions de carga
export const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  payload: isLoading
});

export const setInitialized = (isInitialized) => ({
  type: 'SET_INITIALIZED',
  payload: isInitialized
});

// Actions de contactos
export const loadContacts = (contacts) => ({
  type: 'LOAD_CONTACTS',
  payload: contacts
});

export const addContact = (contact) => ({
  type: 'ADD_CONTACT',
  payload: contact
});

export const updateContact = (contact) => ({
  type: 'UPDATE_CONTACT',
  payload: contact
});

export const deleteContact = (contactId) => ({
  type: 'DELETE_CONTACT',
  payload: contactId
});

// Actions de mensajes
export const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  payload: message
});

export const clearMessage = () => ({
  type: 'CLEAR_MESSAGE'
});

// Constantes para evitar errores de tipeo
export const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_INITIALIZED: 'SET_INITIALIZED',
  LOAD_CONTACTS: 'LOAD_CONTACTS',
  ADD_CONTACT: 'ADD_CONTACT',
  UPDATE_CONTACT: 'UPDATE_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  SET_MESSAGE: 'SET_MESSAGE',
  CLEAR_MESSAGE: 'CLEAR_MESSAGE'
};