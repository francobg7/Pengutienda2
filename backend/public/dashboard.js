// Mantener la función de verificación solo para rutas privadas
function verificarAutenticacion() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return null;
    }
    return token;
}

// Evento principal cuando carga el dashboard
document.addEventListener('DOMContentLoaded', async () => {
    // Verificamos si el usuario está autenticado solo para rutas privadas
    const token = verificarAutenticacion();
    if (!token) return;

    // Agregar event listener para el enlace de administrar productos (solo para rutas privadas)
    const adminProductsLink = document.querySelector('[href="/admin/products"]');
    if (adminProductsLink) {
        adminProductsLink.addEventListener('click', async (e) => {
            e.preventDefault();
            await navigateWithToken('/admin/products');
        });
    }
});

// Función modificada para navegar con el token solo en rutas privadas
async function navigateWithToken(url) {
    const token = verificarAutenticacion();
    if (!token) return;

    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'text/html'
            }
        });

        if (!response.ok) {
            throw new Error('Error de navegación');
        }

        window.location.href = url;
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '/login';
    }
}

// Mantener la función de cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}
