document.addEventListener('DOMContentLoaded', () => {
    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(el => {
                el.classList.remove('active');
            });
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Toast Notification Logic
    const showToast = (message) => {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-msg');
        
        toastMsg.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    // vCard Generation
    const saveContactBtn = document.getElementById('save-contact');
    
    saveContactBtn.addEventListener('click', () => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
N:Sánchez Islas;Kenia;Andrea;;Lic.
FN:Lic. Kenia Andrea Sánchez Islas
ORG:Instituto de Capacitación y Certificación Ibérica
TITLE:Secretaría
TEL;TYPE=CELL,VOICE,PREF:+525561308252
TEL;TYPE=WORK,VOICE:+522221050550
EMAIL;TYPE=WORK,INTERNET:admin-ece@iberica.iscobusiness.edu.mx
URL;type=pref:https://iscobusiness.org
URL:https://iscobusiness.edu.mx
URL:https://iberica.iscobusiness.edu.mx
END:VCARD`;

        const blob = new Blob([vcard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Kenia_Sanchez_Iberica.vcf';
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('Contacto descargado correctamente');
    });

    // Web Share API
    const shareBtn = document.getElementById('share-card');
    
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Tarjeta Digital - Lic. Kenia Andrea Sánchez Islas',
            text: 'Secretaría - Instituto de Capacitación y Certificación Ibérica',
            url: window.location.href !== 'about:blank' ? window.location.href : 'https://iberica.iscobusiness.edu.mx'
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                showToast('Tarjeta compartida');
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(shareData.url);
                showToast('Enlace copiado al portapapeles');
            }
        } catch (err) {
            console.error('Error al compartir:', err);
        }
    });
});
