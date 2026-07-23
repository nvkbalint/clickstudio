document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBIL HAMBURGER MENÜ NYITÁS / ZÁRÁS
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Automatikus bezárás ha átkattintanak egy linkre
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Automatikus csomagválasztó az URL paraméter alapján (?csomag=pro)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPackage = urlParams.get('csomag');

    const packageMap = {
        'start': 'Start weboldal csomag',
        'pro': 'Pro weboldal csomag',
        'egyedi': 'Egyedi weboldal csomag',
        'wordpress': 'Egyedi WordPress szolgáltatás'
    };

    if (selectedPackage && packageMap[selectedPackage]) {
        const packageSelect = document.getElementById('package');
        if (packageSelect) {
            packageSelect.value = packageMap[selectedPackage];
        }
    }

    // 3. Magyar nyelvű űrlap beküldés
    const contactForm = document.querySelector('form[action*="web3forms"]');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.innerText = 'Küldés folyamatban...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    contactForm.parentElement.innerHTML = `
                        <div style="text-align: center; padding: 20px 10px;">
                            <h3 style="font-size: 1.8rem; margin-bottom: 12px; color: var(--text-main);">Köszönjük az üzeneted!</h3>
                            <p style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.6; max-width: 450px; margin: 0 auto;">
                                Sikeresen megkaptuk az ajánlatkérésedet. 24 órán belül felvesszük veled a kapcsolatot!
                            </p>
                        </div>
                    `;
                } else {
                    alert('Hiba történt az üzenet küldése során. Kérjük próbáld újra!');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                alert('Hálózati hiba történt. Kérjük próbáld újra!');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
