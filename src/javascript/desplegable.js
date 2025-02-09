document.addEventListener("DOMContentLoaded", function() {
    const comunidades = {
        "Madrid": ["Madrid", "Alcalá de Henares", "Leganés", "Getafe"],
        "Cataluña": ["Barcelona", "Girona", "Tarragona", "Lleida"],
        "Andalucía": ["Sevilla", "Málaga", "Granada", "Córdoba"],
        "Valencia": ["Valencia", "Alicante", "Castellón"],
        "País Vasco": ["Bilbao", "San Sebastián", "Vitoria"],
        "Galicia": ["Santiago de Compostela", "A Coruña", "Vigo", "Lugo"],
        "Castilla y León": ["Valladolid", "León", "Salamanca", "Burgos"],
        "Castilla-La Mancha": ["Toledo", "Ciudad Real", "Cuenca", "Albacete"],
        "Extremadura": ["Mérida", "Cáceres", "Badajoz"],
        "Aragón": ["Zaragoza", "Huesca", "Teruel"],
        "Asturias": ["Oviedo", "Gijón", "Avilés"],
        "Cantabria": ["Santander"],
        "Murcia": ["Murcia"],
        "Navarra": ["Pamplona"],
        "La Rioja": ["Logroño"],
        "Baleares": ["Palma", "Ibiza", "Mahón"],
        "Canarias": ["Las Palmas", "Tenerife", "Santa Cruz de Tenerife"],
        "Ceuta y Melilla": ["Ceuta", "Melilla"]
    };

    const comunidadSelect = document.getElementById("comunidad");
    const provinciaSelect = document.getElementById("provincia");

    comunidadSelect.addEventListener("change", function() {
        const comunidadSeleccionada = comunidadSelect.value;
        provinciaSelect.innerHTML = "<option value=''>Selecciona una provincia</option>";

        if (comunidades[comunidadSeleccionada]) {
            comunidades[comunidadSeleccionada].forEach(provincia => {
                const option = document.createElement("option");
                option.value = provincia.toLowerCase().replace(/\\s+/g, '-'); //convierte a minúsculas y reemplaza espacios por guiones
                option.textContent = provincia;
                provinciaSelect.appendChild(option);
            });
        }
    });

    document.getElementById("UserForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe si hay errores

        // Obtener los campos obligatorios
        const fields = [
            { name: "name", placeholder: "Nombre" },
            { name: "lastname", placeholder: "Apellidos" },
            { name: "id", placeholder: "DNI/NIE" },
            { name: "email", placeholder: "Correo Electrónico" }
        ];

        let isValid = true;

        fields.forEach(field => {
            const input = document.querySelector(`input[name="${field.name}"]`);
            let errorMessage = input.nextElementSibling;

            // Si el mensaje de error no existe, crearlo
            if (!errorMessage || !errorMessage.classList.contains("error-message")) {
                errorMessage = document.createElement("span");
                errorMessage.classList.add("error-message");
                errorMessage.style.color = "red";
                input.parentNode.insertBefore(errorMessage, input.nextSibling);
            }

            if (input.value.trim() === "") {
                errorMessage.textContent = "Campo obligatorio vacío";
                isValid = false;
            } else {
                errorMessage.textContent = ""; // Borra el mensaje si el campo está completo
            }
        });

        const email = document.querySelector('input[name="email"]'); //validación de email
        const emailValue = email.value.trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@comillas.edu$/;

        if (!emailPattern.test(emailValue)) {
            const errorMessage = email.nextElementSibling;
            errorMessage.textContent = "Correo electrónico no válido";
            isValid = false;
        }

        if (isValid) {
            this.submit(); // Si todo está correcto, envía el formulario
        }
    });

    
});
