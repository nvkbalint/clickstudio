// Automatkus csomagválasztó az URL paraméter alapján (?csomag=pro)
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPackage = urlParams.get('csomag');

    if (selectedPackage) {
        const packageSelect = document.getElementById('package');
        if (packageSelect) {
            packageSelect.value = selectedPackage;
        }
    }
});