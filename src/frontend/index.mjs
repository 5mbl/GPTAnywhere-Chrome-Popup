import Browser from "webextension-polyfill";
const searchInput = document.getElementById('input-el');
const buttonEl = document.getElementById('submit-btn');
const answerEl = document.getElementById('answer-el');

async function run(question) { 
  const container = document.getElementById('content-El');
  container.className = "chat-gpt-container"; 
  container.innerHTML = '<p class="loading">Waiting for ChatGPT response...</p>'; 

 const port = Browser.runtime.connect(); 
  
  port.onMessage.addListener(function (msg) {
    if (msg.answer) {
      console.log("message: " + msg ); // <-- Console.Log
      container.innerHTML = '<p><span class="prefix">ChatGPT:</span><pre></pre></p>';
      answerEl.textContent = msg.answer; 
      container.innerHTML =
        '<p>Einloggen bei <a href="https://chat.openai.com" target="_blank">chat.openai.com</a> first</p>';
    } else {
      container.innerHTML = "<p>Failed to load response from ChatGPT</p>";
    }
  });
  port.postMessage({ question });

}

buttonEl.addEventListener("click",()=>{
  console.log("button clicked");
    if (searchInput && searchInput.value){
      console.log("Input.Value:" + searchInput.value);
        run(searchInput.value);
    }
})

// DEEL
/*
// INPUT VALUE = QUESTION for ChatGPT
const searchInput = document.getElementsByName("q")[0];
if (searchInput && searchInput.value) {
  // only run on first page
  const startParam = new URL(location.href).searchParams.get("start") || "0";
  if (startParam === "0") {
    run(searchInput.value);
  }
}*/