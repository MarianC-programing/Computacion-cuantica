"use strict";
/**
 * Q-LAB — Validación y persistencia del formulario de contacto.
 *
 * Los envíos válidos se guardan como un "archivo de datos":
 *  1) En localStorage, bajo la clave "qlab_envios", como historial local.
 */
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (!form)
        return;
    const status = document.getElementById("form-status");
    const reglas = {
        nombre: (valor) => {
            const limpio = valor.trim();
            if (limpio.length < 3)
                return "Ingresa al menos 3 caracteres.";
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(limpio))
                return "Usa solo letras y espacios.";
            return "";
        },
        correo: (valor) => {
            const limpio = valor.trim();
            const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!patron.test(limpio))
                return "Ingresa un correo electrónico válido.";
            return "";
        },
        telefono: (valor) => {
            const limpio = valor.trim();
            if (!/^[0-9]{4}-?[0-9]{4}$/.test(limpio))
                return "Formato esperado: 6000-0000.";
            return "";
        },
        mensaje: (valor) => {
            const limpio = valor.trim();
            if (limpio.length < 10)
                return "Cuéntanos un poco más (mínimo 10 caracteres).";
            if (limpio.length > 600)
                return "Máximo 600 caracteres.";
            return "";
        },
    };
    function mostrarError(campo, mensaje) {
        const span = form.querySelector(`[data-error-for="${campo}"]`);
        if (span)
            span.textContent = mensaje;
        const input = document.getElementById(campo);
        if (input)
            input.setAttribute("aria-invalid", mensaje ? "true" : "false");
    }
    function validarCampo(campo) {
        const input = document.getElementById(campo);
        if (!input)
            return true;
        const error = reglas[campo](input.value);
        mostrarError(campo, error);
        return error === "";
    }
    Object.keys(reglas).forEach((campo) => {
        const input = document.getElementById(campo);
        if (input) {
            input.addEventListener("blur", () => validarCampo(campo));
            input.addEventListener("input", () => {
                if (input.getAttribute("aria-invalid") === "true")
                    validarCampo(campo);
            });
        }
    });
    function guardarEnvio(envio) {
        const clave = "qlab_envios";
        const historialPrevio = localStorage.getItem(clave);
        const historial = historialPrevio ? JSON.parse(historialPrevio) : [];
        historial.push(envio);
        localStorage.setItem(clave, JSON.stringify(historial, null, 2));
        const blob = new Blob([JSON.stringify(historial, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = "envios.json";
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const campos = ["nombre", "correo", "telefono", "mensaje"];
        const resultados = campos.map((campo) => validarCampo(campo));
        const esValido = resultados.every((valido) => valido);
        if (!esValido) {
            if (status) {
                status.textContent = "Revisa los campos marcados en rojo.";
                status.className = "form-status err";
            }
            return;
        }
        const datos = new FormData(form);
        const envio = {
            nombre: String(datos.get("nombre") || "").trim(),
            correo: String(datos.get("correo") || "").trim(),
            telefono: String(datos.get("telefono") || "").trim(),
            asunto: String(datos.get("asunto") || ""),
            fecha: String(datos.get("fecha") || ""),
            mensaje: String(datos.get("mensaje") || "").trim(),
            enviadoEl: new Date().toISOString(),
        };
        guardarEnvio(envio);
        if (status) {
            status.textContent = "¡Mensaje guardado! Se descargó una copia en envios.json.";
            status.className = "form-status ok";
        }
        form.reset();
    });
});
