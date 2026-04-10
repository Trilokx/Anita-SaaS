export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '31612345678';
export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/anita-elevate/consult';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export function openCalendly() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    window.open(CALENDLY_URL, '_blank');
  }
}

export function openWhatsApp(message = "Hi! I'm interested in Elevate's digital marketing services.") {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
}
