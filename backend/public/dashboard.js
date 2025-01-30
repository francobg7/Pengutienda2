// Función útil para verificar la autenticación
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
    const token = verificarAutenticacion();
    if (!token) return;

    try {
        const response = await fetch('/admin/dashboard', {  // Corregida la ruta
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            localStorage.removeItem('token');
            throw new Error('Error de autenticación');
        }
        
        const data = await response.json();
        // Aquí puedes actualizar el contenido del dashboard si es necesario
        
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '/login';
    }
});

// Función para navegar con el token
async function navigateWithToken(url) {
    const token = verificarAutenticacion();
    if (!token) return;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Error de navegación');
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            // Manejar la respuesta JSON si es necesario
        } else {
            window.location.href = url;
        }
    } catch (error) {
        console.error(error);
        window.location.href = '/login';
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}