document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {  // Quitamos 'auth' para que coincida con tu ruta
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.mensaje || 'Error en el inicio de sesión');
        }

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
            console.log('Redirigiendo a:', data.redirectUrl); // Para debug
            window.location.href = data.redirectUrl;
        } else {
            throw new Error('No se recibió el token');
        }
    } catch (error) {
        console.error('Error de login:', error);
        alert(error.message); // Para mostrar el error al usuario
    }
});