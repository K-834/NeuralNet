const chatbotToggle = document.getElementById("chatbot-toggle");
const chatPanel = document.getElementById("chat-panel");
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendMessageButton = document.getElementById("send-message");

// Respuestas del chatbot según palabras clave
const chatbotResponses = {
    "hola": "¡Hola! ¿Cómo te encuentras hoy? ¿En qué puedo ayudarte?",
    "ayuda": "Claro, estoy aquí para asistirte. ¿Qué necesitas?",
    "búsqueda": "Puedes realizar una búsqueda escribiendo palabras clave en el cuadro.",
    "gracias": "¡De nada! Siempre estoy para ayudarte.",
    "adiós": "¡Hasta luego! Que tengas un buen día.",
};

// Respuestas secuenciales
const sequentialResponses = [
    "En que tipo de herramienta quieres el informe?",
    "Este es el informe con el power BI, espero que te sirva: LINK"
    // "Puedes buscar información sobre cualquier tema relacionado.",
    // "Si tienes alguna pregunta, no dudes en preguntar.",
    // "Recuerda, siempre estoy aquí para ayudarte, ¡no dudes en preguntar!"
];

let currentSequentialIndex = 0; // Controlador de la secuencia de respuestas

// Respuesta predeterminada
const defaultResponse = "No estoy seguro de cómo responder a eso. ¿Podrías darme más detalles?";

// Alternar la visibilidad del chatbot
chatbotToggle.addEventListener("click", () => {
    chatPanel.classList.toggle("hidden");
});

// Manejar el envío de mensajes
function handleSendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Mostrar el mensaje del usuario
    const userBubble = document.createElement("div");
    userBubble.className = "self-end bg-gray-300 p-3 rounded-lg shadow";
    userBubble.textContent = userMessage;
    chatBox.appendChild(userBubble);

    // Procesar y mostrar la respuesta del chatbot
    setTimeout(() => {
        const botBubble = document.createElement("div");
        botBubble.className = "self-start bg-blue-100 p-3 rounded-lg shadow";

        // Buscar respuesta basada en palabras clave
        const response = Object.keys(chatbotResponses).find(key =>
            userMessage.toLowerCase().includes(key)
        );

        if (response) {
            // Si hay una palabra clave, devolver la respuesta personalizada
            botBubble.textContent = chatbotResponses[response];
        } else {
            // Si no hay palabra clave, responder con la secuencia
            if (currentSequentialIndex < sequentialResponses.length) {
                botBubble.textContent = sequentialResponses[currentSequentialIndex];
                currentSequentialIndex++; // Incrementar el índice para la próxima respuesta
            } else {
                // Si ya pasaron todas las respuestas secuenciales, damos una respuesta final
                botBubble.textContent = defaultResponse;
            }
        }

        chatBox.appendChild(botBubble);

        // Desplazar hacia abajo para ver el último mensaje
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    // Limpiar el campo de entrada
    chatInput.value = "";
}

// Enviar mensaje cuando se hace clic en el botón
sendMessageButton.addEventListener("click", handleSendMessage);

// Enviar mensaje cuando se presiona Enter
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSendMessage();
});