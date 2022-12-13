import Browser from "webextension-polyfill";
const searchInput = document.getElementById('input-el');
const buttonEl = document.getElementById('submit-btn');
const container = document.getElementById('content-El');

async function run(question) { 
//  container.className = "chat-gpt-container"; 
  container.innerHTML = '<p class="loading">Waiting for ChatGPT response...</p>'; 

  const port = Browser.runtime.connect(); 
  
  port.onMessage.addListener(function (msg) {
    if (msg.answer) {
      console.log("answer: " + msg.answer) // <-- Console.Log 1

      container.innerHTML = '<p><span class="prefix">ChatGPT:</span><pre></pre></p>';
      container.querySelector("pre").textContent = msg.answer; 

      //container.innerHTML = '<p>Please Login at <a href="https://chat.openai.com" target="_blank">chat.openai.com</a> first</p>';
    } else {
      container.innerHTML = `
      <section class="hero-area">
        <div class="container">
            <div class="hero-inner-item">
                <h2>🖖 You are nearly ready!</h2>
                <p>You need to login into your openAI <br> Account first!</p>
                <a href="https://chat.openai.com/auth/login">Login</a>
            </div>
        </div>
    </section>
      
      
      `;
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
