import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿Cuánto tiempo tarda la fabricación?',
    answer:
      'El tiempo de fabricación varía según la complejidad y tamaño de la pieza. En promedio, las piezas FDM tardan entre 12-48 horas, mientras que las piezas SLA tardan entre 8-24 horas. Una vez completada, el envío suele tardar 24-48 horas adicionales.',
  },
  {
    question: '¿Qué tolerancias puedo esperar?',
    answer:
      'Para FDM, las tolerancias típicas son de ±0.2mm a ±0.5mm dependiendo del material y geometría. Para SLA, ofrecemos tolerancias de ±0.05mm a ±0.15mm. Siempre revisamos tu diseño y te informamos si necesitas ajustes para cumplir requisitos específicos.',
  },
  {
    question: '¿Ofrecen postprocesado?',
    answer:
      'Sí, ofrecemos varios servicios de postprocesado incluyendo lijado, pintura, recubrimientos especiales y tratamientos químicos para mejorar el acabado superficial. Estos servicios se pueden agregar durante el proceso de cotización.',
  },
  {
    question: '¿Cómo debo preparar mi archivo STL?',
    answer:
      'Tu archivo STL debe estar libre de errores (manifold), con normales correctamente orientadas y sin geometrías superpuestas. Recomendamos usar software como Meshmixer o Netfabb para validar el archivo antes de subirlo. También ofrecemos revisión técnica gratuita.',
  },
  {
    question: '¿Puedo solicitar una muestra antes de un pedido grande?',
    answer:
      'Absolutamente. Recomendamos ordenar una pieza de muestra primero para validar material, acabado y dimensiones antes de comprometerte a un pedido de mayor volumen. Ofrecemos descuentos en pedidos posteriores cuando ordenas muestras.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Preguntas <span className="gradient-text">frecuentes</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            Todo lo que necesitas saber sobre nuestro servicio
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass rounded-2xl overflow-hidden transition-all">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus-ring"
              >
                <span className="font-display font-semibold text-lg pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--brand)] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <p className="text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[var(--text-secondary)] mb-4">¿No encuentras tu respuesta?</p>
          <a
            href="/contacto"
            className="inline-flex items-center space-x-2 text-[var(--brand)] hover:text-[var(--brand-dark)] transition-colors font-medium focus-ring rounded"
          >
            <span>Contáctanos directamente</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
