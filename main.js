const messageBox = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

let messages = [];

// Load messages from localStorage
function loadMessages() {
  const stored = JSON.parse(localStorage.getItem("messages")) || [];
  messages = stored;
  renderMessages();
}

// Display messages in the chat
function renderMessages() {
  messageBox.innerHTML = "";
  messages.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = msg;
    messageBox.appendChild(div);
  });
  messageBox.scrollTop = messageBox.scrollHeight;
}

// Add new message
function sendMessage() {
  const text = messageInput.value.trim();
  if (text) {
    messages.push(text);
    localStorage.setItem("messages", JSON.stringify(messages));
    messageInput.value = "";
    renderMessages();
  }
}

// Sync messages across tabs every second
setInterval(() => {
  const stored = JSON.parse(localStorage.getItem("messages")) || [];
  if (stored.length !== messages.length) {
    messages = stored;
    renderMessages();
  }
}, 1000);

// Initialize
window.onload = loadMessages;
