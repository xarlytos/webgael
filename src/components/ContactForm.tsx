import { useState } from 'react';
import { Send, Upload, User, Mail, Phone, MessageSquare, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  file: File | null;
  projectType: string;
  budget: string;
  timeline: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  file?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    file: null,
    projectType: '',
    budget: '',
    timeline: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    'Prototipo',
    'Pieza funcional',
    'Arte/Decoración',
    'Juguete/Figura',
    'Repuesto',
    'Otro'
  ];

  const budgetRanges = [
    'Menos de €50',
    '€50 - €100',
    '€100 - €200',
    '€200 - €500',
    'Más de €500'
  ];

  const timelineOptions = [
    'Urgente (1-2 días)',
    'Normal (3-5 días)',
    'Flexible (1-2 semanas)',
    'Sin prisa (más de 2 semanas)'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    if (formData.file && formData.file.size > 50 * 1024 * 1024) {
      newErrors.file = 'El archivo no puede ser mayor a 50MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleInputChange('file', file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        file: null,
        projectType: '',
        budget: '',
        timeline: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass rounded-3xl p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-display font-bold mb-4 text-green-500">
          ¡Mensaje enviado!
        </h3>
        <p className="text-[var(--text-secondary)] mb-6">
          Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en menos de 24 horas.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="btn-gradient px-6 py-3 rounded-full text-sm font-semibold text-[var(--bg)] focus-ring"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-[var(--bg)]" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold">Envíanos un mensaje</h2>
          <p className="text-sm text-[var(--text-secondary)]">Completa el formulario y te responderemos pronto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Nombre completo *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-[var(--surface)] border transition-colors focus:outline-none ${
                errors.name ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-[var(--brand)]'
              }`}
              placeholder="Tu nombre completo"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-[var(--surface)] border transition-colors focus:outline-none ${
                errors.email ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-[var(--brand)]'
              }`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Teléfono *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-[var(--surface)] border transition-colors focus:outline-none ${
                errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-[var(--brand)]'
              }`}
              placeholder="+34 600 000 000"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Asunto *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl bg-[var(--surface)] border transition-colors focus:outline-none ${
                errors.subject ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-[var(--brand)]'
              }`}
              placeholder="¿En qué podemos ayudarte?"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.subject}
              </p>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Tipo de proyecto
            </label>
            <select
              value={formData.projectType}
              onChange={(e) => handleInputChange('projectType', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 12px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px'
              }}
            >
              <option value="">Selecciona una opción</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Presupuesto estimado
            </label>
            <select
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 12px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px'
              }}
            >
              <option value="">Selecciona un rango</option>
              {budgetRanges.map((range) => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Tiempo de entrega
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] focus:border-[var(--brand)] focus:outline-none appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 12px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px'
              }}
            >
              <option value="">Selecciona una opción</option>
              {timelineOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            Mensaje *
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={5}
            className={`w-full px-4 py-3 rounded-xl bg-[var(--surface)] border transition-colors focus:outline-none resize-none ${
              errors.message ? 'border-red-500 focus:border-red-500' : 'border-[var(--border)] focus:border-[var(--brand)]'
            }`}
            placeholder="Cuéntanos más detalles sobre tu proyecto..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
            <Upload className="w-4 h-4 inline mr-2" />
            Archivo 3D (opcional)
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".stl,.obj,.ply,.3mf"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="border-2 border-dashed border-[var(--border)] rounded-xl p-6 text-center hover:border-[var(--brand)] transition-colors">
              <Upload className="w-8 h-8 mx-auto mb-2 text-[var(--brand)]" />
              <p className="text-sm text-[var(--text-secondary)]">
                {formData.file ? formData.file.name : 'Arrastra tu archivo aquí o haz clic para seleccionar'}
              </p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">
                Formatos: STL, OBJ, PLY, 3MF • Máximo 50MB
              </p>
            </div>
          </div>
          {errors.file && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.file}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-gradient px-8 py-4 rounded-full text-lg font-semibold text-[var(--bg)] flex items-center justify-center space-x-3 focus-ring disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-200"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-[var(--bg)] border-t-transparent rounded-full"></div>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Enviar mensaje</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
