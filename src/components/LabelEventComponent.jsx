 // funcion para mover el label de email 
export const moveEmailLabel = () => {
    const label = document.getElementById("emailLabel");
    const email = document.getElementById("email")
    
    email.addEventListener('focus', () => {
        
        label.style.top = '0px'; 
        label.style.left = '0px'; 
        label.style.color = '#020617';
    })

    email.addEventListener('blur', () => {
        // Verifica si el input tiene algún valor
        if (!email.value) {
            label.style.top = '36px'; 
            label.style.left = '8px'; 
            label.style.color = 'rgb(107 114 128)';
            
            // Si no hay valor, mover la etiqueta
        }
    });
    
};

// funcion para mover el label del campo de contraseña
export const movePasswordLabel = () => {
    const label = document.getElementById("passwordLabel");
    const password = document.getElementById("password")
    
    password.addEventListener('focus', () => {
        
        label.style.top = '0px'; 
        label.style.left = '0px'; 
        label.style.color = '#020617';
    })
    
    password.addEventListener('blur', () => {
        // Verifica si el input tiene algún valor
        if (!password.value) {
            label.style.top = '36px'; 
            label.style.left = '8px'; 
            label.style.color = 'rgb(107 114 128)';
            // Si no hay valor, mover la etiqueta
        }
    });
    
};

// funcion para mover el label del campo de validacion de contraseña
export const movePasswordValidationLabel = () => {
    const label = document.getElementById("passwordValidationLabel");
    const password = document.getElementById("passwordValidation")
    
    password.addEventListener('focus', () => {
        
        label.style.top = '0px'; 
        label.style.left = '0px'; 
        label.style.color = '#020617';
    })

    password.addEventListener('blur', () => {
        // Verifica si el input tiene algún valor
        if (!password.value) {
            label.style.top = '36px'; 
            label.style.left = '8px'; 
            label.style.color = 'rgb(107 114 128)';
            // Si no hay valor, mover la etiqueta
        }
    });
};
