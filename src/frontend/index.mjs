import Browser from "webextension-polyfill";
const searchInput = document.getElementById('input-el');
const buttonEl = document.getElementById('submit-btn');
const container = document.getElementById('content-El');

async function run(question) { 
  container.className = "chat-gpt-container"; 
  container.innerHTML = '<p class="loading">Waiting for ChatGPT response...</p>'; 

 const port = Browser.runtime.connect(); 
  
  port.onMessage.addListener(function (msg) {
    if (msg.answer) {
      console.log("answer: " + msg.answer) // <-- Console.Log 1

      container.innerHTML = '<p><span class="prefix">ChatGPT:</span><pre></pre></p>';
      container.querySelector("pre").textContent = msg.answer; 

      //container.innerHTML = '<p>Please Login at <a href="https://chat.openai.com" target="_blank">chat.openai.com</a> first</p>';
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