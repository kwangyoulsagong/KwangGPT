const chat = document.querySelector(".kwangGPT");
const inputText = chat.querySelector("input[type='text']");
const button = chat.querySelector("button");
const chatBody = chat.querySelector(".kwangGPT-body");

button.addEventListener("click", sendMessage);
inputText.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const message = inputText.value;
  inputText.value = "";
  chatBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
  chatBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
  scrollToBottom();
  window.dotsGoingUp = true;
    var dots = window.setInterval( function() {
        var wait = document.getElementById("loading");
        if ( window.dotsGoingUp ) 
            wait.innerHTML += ".";
        else {
            wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);

        if ( wait.innerHTML.length < 2)
            window.dotsGoingUp = true;
        }
        if ( wait.innerHTML.length > 3 )
            window.dotsGoingUp = false;
        }, 250);
  fetch('https://kwanggpt.onrender.com/messages', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message})
  }).then(response => {
    return response.json();
  }).then(data => {
    document.getElementById("loading").remove();
    chatBody.innerHTML += `<div class="response"><p>${data.message}</p></div>`;
    scrollToBottom();
  })
}

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}