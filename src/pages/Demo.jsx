import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact } from "../services/agendaService.js";

export const Demo = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Manejar cambios en los inputs del formulario
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Validar formulario antes de enviar
   */
  const validateForm = () => {
    const { name, email, phone, address } = formData;
    
    if (!name.trim()) {
      alert('Full Name is required');
      return false;
    }
    
    if (!email.trim()) {
      alert('Email is required');
      return false;
    }
    
    if (!phone.trim()) {
      alert('Phone is required');
      return false;
    }
    
    if (!address.trim()) {
      alert('Address is required');
      return false;
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  /**
   * Enviar formulario para crear contacto
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('📝 Creando nuevo contacto:', formData);
      
      // Crear contacto en la API
      const newContact = await createContact(formData);
      
      // Actualizar el estado global
      dispatch({ type: 'ADD_CONTACT', payload: newContact });
      
      console.log('✅ Contacto creado exitosamente:', newContact);
      
      // Redirigir a la lista de contactos
      navigate('/');
      
    } catch (error) {
      console.error('❌ Error creando contacto:', error);
      alert('Error creating contact. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          
          {/* Contenedor principal con fondo blanco */}
          <div className="bg-white rounded shadow-sm p-5">
            
            {/* Título */}
            <h1 className="text-center mb-4 fw-bold" style={{ fontSize: '2.5rem', color: '#333' }}>
              Add a new contact
            </h1>

            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone */}
              <div className="mb-3">
                <label htmlFor="phone" className="form-label fw-bold">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label htmlFor="address" className="form-label fw-bold">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="address"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>

              {/* Botón Save */}
              <div className="d-grid mb-3">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                  style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Saving...
                    </>
                  ) : (
                    'save'
                  )}
                </button>
              </div>

              {/* Link back to contacts */}
              <div className="text-center">
                <Link to="/" className="text-primary text-decoration-none">
                  or get back to contacts
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
