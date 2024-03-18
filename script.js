const chatLog = document.getElementById("chat-log"),
  userInput = document.getElementById("user-input"),
  sendButton = document.getElementById("send-button"),
  buttonIcon = document.getElementById("button-icon"),
  info = document.querySelector(".info");

function handleInput(event) {
  if (
    event.type === "click" ||
    (event.type === "keydown" && event.key === "Enter")
  ) {
    sendMessage();
  }
}

sendButton.addEventListener("click", handleInput);
userInput.addEventListener("keydown", handleInput);

async function sendMessage() {
  const message = userInput.value.trim();
  // const isValidMessage = /^[A-Za-z0-9 ]{1,400}$/.test(message);
  const isValidMessage = /^[A-Za-z0-9 !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,400}$/.test(message);

  if (!isValidMessage) {
    alert("Message should only contain English letters, numbers, and be less than 400 characters.");
    return;
  }

  if (message === "") return;

  switchActives(false);
  userInput.value = "";
  appendMessage("user", message);
  
  if (message === "developer") {
    setTimeout(() => {
      appendMessage("bot", "VLR - Iraclion TG: @VLR_Iraclion");
      switchActives(true);
    }, 1000);
    return;
  }

  const url = "https://robomatic-ai.p.rapidapi.com/api";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "dec142f56cmsh3b57075872d7cd6p1bac47jsn4ad75d3b9c8b",
      "X-RapidAPI-Host": "robomatic-ai.p.rapidapi.com",
    },
    body: new URLSearchParams({
      in: message,
      op: "in",
      cbot: "1",
      SessionID: "RapidAPI1",
      cbid: "1",
      key: "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP",
      ChatSource: "RapidAPI",
      duration: "1",
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const botMessage = data.out || "Sorry, I can't process your request.";
    appendMessage("bot", botMessage);
  } catch (error) {
    console.error(error);
    appendMessage("bot", "An error occurred while processing your request.");
  } finally {
    switchActives(true);
  }
}

function appendMessage(sender, message) {
  info.style.display = "none";

  const messageElement = document.createElement("div");
  const iconElement = document.createElement("div");
  const chatElement = document.createElement("div");
  const icon = document.createElement("i");

  chatElement.classList.add("chat-box");
  iconElement.classList.add("icon");
  messageElement.classList.add(sender);
  messageElement.innerText = message;

  if (sender === "user") {
    icon.classList.add("fa-regular", "fa-user");
    iconElement.setAttribute("id", "user-icon");
  } else {
    icon.classList.add("fa-solid", "fa-robot");
    iconElement.setAttribute("id", "bot-icon");
  }

  iconElement.appendChild(icon);
  chatElement.appendChild(iconElement);
  chatElement.appendChild(messageElement);
  chatLog.appendChild(chatElement);
  chatLog.scrollTo = chatLog.scrollHeight;
}

function switchActives(isActive) {
  userInput.disabled = !isActive;
  sendButton.disabled = !isActive;

  buttonIcon.classList.toggle("fa-solid", isActive);
  buttonIcon.classList.toggle("fa-paper-plane", isActive);
  buttonIcon.classList.toggle("fas", !isActive);
  buttonIcon.classList.toggle("fa-spinner", !isActive);
  buttonIcon.classList.toggle("fa-pulse", !isActive);
}
