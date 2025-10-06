import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ContactForm } from '../components/ContactForm';
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen">
      <Navbar currentPath="/contacto" />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-2 bg-[var(--brand)]/10 px-4 py-2 rounded-full text-sm font-medium text-[var(--brand)] mb-6">
              <MessageSquare className="w-4 h-4" />
              <span>Contacto</span>
            </div>
            <h1 className="text-6xl sm:text-7xl font-display font-bold mb-8 leading-tight">
              Estamos aquí para <span className="gradient-text">ayudarte</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
              Tienes un proyecto en mente? Queremos escucharte. Completa el formulario o contáctanos directamente.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-tertiary)]">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Respuesta en 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Consulta gratuita</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Presupuesto sin compromiso</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="glass rounded-3xl p-8 border border-[var(--brand)]/10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-2)] flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-[var(--bg)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">Información de contacto</h2>
                    <p className="text-sm text-[var(--text-secondary)]">Múltiples formas de contactarnos</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="glass rounded-2xl p-6 hover:bg-[var(--brand)]/5 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Email</h3>
                        <a
                          href="mailto:info@hazloen3d.com"
                          className="text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors text-lg"
                        >
                          info@hazloen3d.com
                        </a>
                        <p className="text-sm text-[var(--text-tertiary)] mt-1">
                          Respuesta en 24 horas
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6 hover:bg-[var(--brand)]/5 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Teléfono / WhatsApp</h3>
                        <a
                          href="tel:+34600000000"
                          className="text-[var(--text-secondary)] hover:text-[var(--brand)] transition-colors text-lg"
                        >
                          +34 600 000 000
                        </a>
                        <p className="text-sm text-[var(--text-tertiary)] mt-1">
                          Lunes a Viernes 9:00-18:00
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6 hover:bg-[var(--brand)]/5 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Ubicación</h3>
                        <p className="text-[var(--text-secondary)] text-lg">
                          Valencia, España
                        </p>
                        <p className="text-sm text-[var(--text-tertiary)] mt-1">
                          Servicio en toda España
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-6 hover:bg-[var(--brand)]/5 transition-colors">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Horario</h3>
                        <p className="text-[var(--text-secondary)] text-lg">
                          Lunes - Viernes: 9:00 - 18:00<br />
                          Sábados: 10:00 - 14:00
                        </p>
                        <p className="text-sm text-[var(--text-tertiary)] mt-1">
                          Horario de atención al cliente
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="glass rounded-2xl p-6 border border-green-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                  </div>
                  <h3 className="font-display font-semibold text-green-500">Tiempo de respuesta</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-[var(--text-secondary)]">
                      <strong>Email:</strong> Menos de 24 horas
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-[var(--text-secondary)]">
                      <strong>WhatsApp:</strong> Respuesta inmediata
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-[var(--text-secondary)]">
                      <strong>Urgencias:</strong> Contacto directo
                    </span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="glass rounded-2xl overflow-hidden h-64 border border-[var(--brand)]/10 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12318.792347!2d-0.5447!3d39.5942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604f63d5a2f9f9%3A0xa4f3b5e2f1c8e5d6!2sLa%20Pobla%20de%20Vallbona%2C%20Valencia!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación - La Pobla de Vallbona, Valencia"
                  className="w-full h-full"
                />
                <div className="absolute top-4 left-4 z-10">
                  <div className="glass backdrop-blur-xl rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[var(--brand)]" />
                      <span className="text-sm font-medium text-[var(--text)]">
                        La Pobla de Vallbona, Valencia
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
