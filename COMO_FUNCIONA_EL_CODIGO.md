# 🔍 Cómo Funciona Cada Parte del Código

## 📋 Índice
1. [Servicios API](#servicios-api)
2. [Estado Global (Store)](#estado-global)
3. [Rutas](#rutas)
4. [Componentes](#componentes)
5. [Páginas](#páginas)

---

## 🔌 Servicios API

### `src/services/agendaService.js`

Este archivo maneja toda la comunicación con la API externa.

#### Variables de configuración:
```javascript
const API_BASE_URL = 'https://playground.4geeks.com/contact';
const AGENDA_SLUG = 'victormoreno';
```
- **API_BASE_URL**: La URL base de la API de contactos
- **AGENDA_SLUG**: Identificador único de tu agenda personal

#### Función `createAgenda()`:
```javascript
export const createAgenda = async () => {
  // Hace una petición POST para crear una agenda
  // Si ya existe (error 400), no hace nada
  // Si se crea exitosamente (status 201), confirma la creación
}
```
**¿Qué hace?** Crea tu agenda personal en el servidor si no existe.

#### Función `getContacts()`:
```javascript
export const getContacts = async () => {
  // Hace una petición GET para obtener todos los contactos
  // Devuelve un array de contactos o array vacío si hay error
}
```
**¿Qué hace?** Obtiene todos tus contactos del servidor.

#### Función `createContact(contactData)`:
```javascript
export const createContact = async (contactData) => {
  // Hace una petición POST con los datos del nuevo contacto
  // Devuelve el contacto creado con su ID asignado
}
```
**¿Qué hace?** Envía un nuevo contacto al servidor y lo guarda.

#### Función `updateContact(id, contactData)`:
```javascript
export const updateContact = async (id, contactData) => {
  // Hace una petición PUT para actualizar un contacto específico
  // Devuelve el contacto actualizado
}
```
**¿Qué hace?** Actualiza un contacto existente en el servidor.

#### Función `deleteContact(id)`:
```javascript
export const deleteContact = async (id) => {
  // Hace una petición DELETE para eliminar un contacto
  // Devuelve true si se eliminó correctamente
}
```
**¿Qué hace?** Elimina un contacto del servidor.

---

## 🗃️ Estado Global

### `src/store.js`

Este archivo maneja el estado global de la aplicación usando React Context.

#### Estado inicial:
```javascript
const initialState = {
  contacts: [],        // Lista de todos los contactos
  isLoading: false,   // Si la app está cargando datos
  message: null       // Mensajes de éxito o error
};
```

#### Reducer - Cómo se actualiza el estado:

**`SET_LOADING`**: Activa/desactiva el indicador de carga
```javascript
case 'SET_LOADING':
  return { ...store, isLoading: action.payload };
```

**`LOAD_CONTACTS`**: Carga todos los contactos y quita el loading
```javascript
case 'LOAD_CONTACTS':
  return { 
    ...store, 
    contacts: action.payload, 
    isLoading: false 
  };
```

**`ADD_CONTACT`**: Agrega un nuevo contacto a la lista
```javascript
case 'ADD_CONTACT':
  return { 
    ...store, 
    contacts: [...store.contacts, action.payload],
    message: 'Contacto agregado exitosamente'
  };
```

**`DELETE_CONTACT`**: Elimina un contacto de la lista
```javascript
case 'DELETE_CONTACT':
  return { 
    ...store, 
    contacts: store.contacts.filter(contact => contact.id !== action.payload),
    message: 'Contacto eliminado exitosamente'
  };
```

**`UPDATE_CONTACT`**: Actualiza un contacto existente
```javascript
case 'UPDATE_CONTACT':
  return { 
    ...store, 
    contacts: store.contacts.map(contact => 
      contact.id === action.payload.id ? action.payload : contact
    ),
    message: 'Contacto actualizado exitosamente'
  };
```

#### Context Provider:
```javascript
export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(contactReducer, initialState);
  
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
```
**¿Qué hace?** Envuelve toda la aplicación para que cualquier componente pueda acceder al estado global.

---

## 🛣️ Rutas

### `src/routes.jsx`

Define todas las rutas de la aplicación.

```javascript
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route path= "/" element={<ListaContacto />} />
      <Route path="/add-contact" element={<FormulariAgregar />} />
      <Route path="/edit-contact/:contactId" element={ <FormularioEditar />} />
    </Route>
  )
);
```

**¿Cómo funciona?**
- **`/`** → Muestra la lista de contactos
- **`/add-contact`** → Muestra el formulario para agregar contacto
- **`/edit-contact/123`** → Muestra el formulario para editar el contacto con ID 123
- **Layout** → Es el contenedor que envuelve todas las páginas (incluye el Navbar)

---

## 🧩 Componentes

### `src/components/Navbar.jsx`

La barra de navegación superior.

#### Estructura:
```javascript
export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* Brand/Logo */}
      <Link to="/">Contact Agenda</Link>
      
      {/* Botón para agregar contacto */}
      <Link to="/add-contact">Add new contact</Link>
    </nav>
  );
};
```

**¿Qué hace?**
- Muestra el título "Contact Agenda" que lleva a la página principal
- Muestra un botón "Add new contact" que lleva al formulario de agregar
- Es responsive: en móviles muestra texto más corto

**Responsive:**
- Desktop: "Contact Agenda" y "Add new contact"
- Mobile: "Contacts" y "Add"

---

## 📄 Páginas

### `src/pages/ListaContacto.jsx`

La página principal que muestra todos los contactos.

#### ¿Qué hace al cargar?
```javascript
useEffect(() => {
  const initializeAgenda = async () => {
    // 1. Activa el loading
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // 2. Crea la agenda si no existe
    await createAgenda();
    
    // 3. Obtiene todos los contactos
    const contacts = await getContacts();
    
    // 4. Guarda los contactos en el estado global
    dispatch({ type: 'LOAD_CONTACTS', payload: contacts });
  };
  
  initializeAgenda();
}, [dispatch]);
```

#### ¿Cómo muestra cada contacto?
```javascript
{store.contacts.map((contact, index) => (
  <div key={contact.id}>
    {/* Avatar circular */}
    <img src={`https://picsum.photos/80/80?random=${contact.id}`} />
    
    {/* Información del contacto */}
    <div>
      <h5>{contact.name}</h5>
      <div>📍 {contact.address}</div>
      <div>📞 {contact.phone}</div>
      <div>✉️ {contact.email}</div>
    </div>
    
    {/* Botones de acción */}
    <div>
      <Link to={`/edit-contact/${contact.id}`}>✏️ Editar</Link>
      <button onClick={() => handleDeleteClick(contact)}>🗑️ Eliminar</button>
    </div>
  </div>
))}
```

#### ¿Cómo funciona la eliminación?
```javascript
// 1. Usuario hace clic en eliminar
const handleDeleteClick = (contact) => {
  setContactToDelete(contact);  // Guarda qué contacto eliminar
  setShowDeleteModal(true);     // Muestra el modal de confirmación
};

// 2. Usuario confirma en el modal
const confirmDelete = async () => {
  // Elimina del servidor
  const success = await deleteContact(contactToDelete.id);
  
  if (success) {
    // Elimina del estado global
    dispatch({ type: 'DELETE_CONTACT', payload: contactToDelete.id });
  }
  
  // Cierra el modal
  setShowDeleteModal(false);
};
```

#### Estados que maneja:
- **Loading**: Muestra spinner mientras carga
- **Empty**: Muestra mensaje cuando no hay contactos
- **Modal**: Muestra confirmación antes de eliminar

---

### `src/pages/FormulariAgregar.jsx`

Formulario para crear nuevos contactos.

#### Estado del formulario:
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  address: ''
});
```

#### ¿Cómo maneja los cambios en los inputs?
```javascript
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value  // Actualiza solo el campo que cambió
  }));
};
```

#### ¿Cómo valida el formulario?
```javascript
const validateForm = () => {
  // Verifica que todos los campos tengan contenido
  if (!formData.name.trim()) {
    alert('Full Name is required');
    return false;
  }
  
  // Verifica formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address');
    return false;
  }
  
  return true;
};
```

#### ¿Qué pasa al enviar el formulario?
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();  // Evita que la página se recargue
  
  // 1. Valida los datos
  if (!validateForm()) return;
  
  // 2. Activa estado de "enviando"
  setIsSubmitting(true);
  
  try {
    // 3. Envía al servidor
    const newContact = await createContact(formData);
    
    // 4. Agrega al estado global
    dispatch({ type: 'ADD_CONTACT', payload: newContact });
    
    // 5. Regresa a la lista
    navigate('/');
    
  } catch (error) {
    alert('Error creating contact. Please try again.');
  } finally {
    setIsSubmitting(false);  // Desactiva estado de "enviando"
  }
};
```

---

### `src/pages/FormularioEditar.jsx`

Formulario para editar contactos existentes.

#### ¿Cómo obtiene el contacto a editar?
```javascript
const { contactId } = useParams();  // Obtiene el ID de la URL

useEffect(() => {
  // Busca el contacto en el estado global
  const contact = store.contacts.find(c => c.id === parseInt(contactId));
  
  if (contact) {
    // Pre-llena el formulario con los datos existentes
    setFormData({
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      address: contact.address || ''
    });
  }
}, [contactId, store.contacts]);
```

#### ¿Qué pasa al enviar la actualización?
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsSubmitting(true);
  
  try {
    // 1. Actualiza en el servidor
    const updatedContact = await updateContact(parseInt(contactId), formData);
    
    // 2. Actualiza en el estado global
    dispatch({ type: 'UPDATE_CONTACT', payload: updatedContact });
    
    // 3. Regresa a la lista
    navigate('/');
    
  } catch (error) {
    alert('Error updating contact. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### `src/pages/Home.jsx` y `src/pages/Single.jsx`

Estos son archivos de compatibilidad que re-exportan los componentes nuevos:

```javascript
// Home.jsx
export { ListaContacto as Home } from './ListaContacto';

// Single.jsx  
export { FormularioEditar as Single } from './FormularioEditar';
```

**¿Por qué existen?** Para mantener compatibilidad con código anterior que importaba `Home` o `Single`.

---

## 🔄 Flujo Completo de la Aplicación

### Al iniciar la aplicación:
1. **main.jsx** envuelve la app con `StoreProvider`
2. **Router** carga la ruta `/` que muestra `ListaContacto`
3. **ListaContacto** ejecuta `useEffect` que:
   - Activa loading
   - Crea agenda en el servidor
   - Obtiene contactos del servidor
   - Guarda contactos en el estado global
   - Desactiva loading
4. **Componente** se re-renderiza mostrando los contactos

### Al agregar un contacto:
1. Usuario hace clic en "Add new contact"
2. **Router** navega a `/add-contact`
3. **FormulariAgregar** se monta con formulario vacío
4. Usuario llena los campos
5. Usuario hace clic en "Save"
6. **Formulario** valida los datos
7. **API** recibe el nuevo contacto y lo guarda
8. **Estado global** se actualiza con el nuevo contacto
9. **Router** navega de vuelta a `/`
10. **ListaContacto** muestra el nuevo contacto

### Al editar un contacto:
1. Usuario hace clic en el botón editar (lápiz)
2. **Router** navega a `/edit-contact/123`
3. **FormularioEditar** busca el contacto con ID 123
4. **Formulario** se pre-llena con los datos existentes
5. Usuario modifica los campos necesarios
6. Usuario hace clic en "Save"
7. **API** actualiza el contacto en el servidor
8. **Estado global** se actualiza con los nuevos datos
9. **Router** navega de vuelta a `/`
10. **ListaContacto** muestra el contacto actualizado

### Al eliminar un contacto:
1. Usuario hace clic en el botón eliminar (basura)
2. **Modal** se abre pidiendo confirmación
3. Usuario hace clic en "Yes baby!"
4. **API** elimina el contacto del servidor
5. **Estado global** remueve el contacto de la lista
6. **ListaContacto** se re-renderiza sin el contacto eliminado
7. **Modal** se cierra

---

## 🎯 Puntos Clave del Código

### 1. **Estado Centralizado**
- Todo el estado se maneja en un solo lugar (`store.js`)
- Los componentes solo leen y actualizan el estado, no lo almacenan

### 2. **Separación de Responsabilidades**
- **Servicios**: Solo manejan comunicación con API
- **Store**: Solo maneja estado global
- **Componentes**: Solo manejan UI y interacciones
- **Páginas**: Solo manejan lógica específica de cada vista

### 3. **Manejo de Errores**
- Cada llamada a la API está envuelta en try/catch
- Se muestran mensajes de error al usuario
- La aplicación no se rompe si falla una operación

### 4. **Loading States**
- Se muestra feedback visual mientras se cargan datos
- Los botones se deshabilitan mientras se envían formularios
- El usuario siempre sabe qué está pasando

### 5. **Validación**
- Los formularios validan datos antes de enviar
- Se previenen envíos con datos inválidos
- Se da feedback inmediato al usuario

Este código está diseñado para ser **mantenible**, **escalable** y **fácil de entender**.