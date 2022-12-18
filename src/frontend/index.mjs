import Browser from "webextension-polyfill";
const searchInput = document.getElementById('input-el');
const buttonEl = document.getElementById('submit-btn');
const container = document.getElementById('content-El');
const xIcon = document.getElementById("x-icon")

async function run(question) { 
  // loading for port Message...
  container.innerHTML = '<p class="loading">Waiting for ChatGPT response...</p>'; 

  const port = Browser.runtime.connect(); 
  
  // port Listener
  port.onMessage.addListener(function (msg) {
    
    if (msg.answer) {
      console.log("answer: " + msg.answer) // <-- Console.Log 1

      container.innerHTML = '<p><span class="prefix">ChatGPT:</span><pre></pre></p>';
       // Answer Output
      container.querySelector("pre").textContent = msg.answer;

      // new

    } else {
      container.innerHTML = `
      <section class="hero-area">
        <div class="container">
            <div class="hero-inner-item">
                <h2>🖖 You are nearly ready!</h2>
                <p>You need to login into your openAI <br> Account first!</p>
                <a href="https://chat.openai.com/auth/login" target="_blank">Login</a>
            </div>
        </div>
    </section>
    `;
    }
  });
  port.postMessage({ question });

}

  // Eventlistener Button - Click
  buttonEl.addEventListener("click", () => {
    console.log("button clicked");
    if (searchInput && searchInput.value) {
      console.log("Input.Value:" + searchInput.value);
      run(searchInput.value);
    }
  });
  // Eventlistener keypress - Enter
  searchInput.addEventListener("keypress",(event)=>{
    if(event.key === "Enter"){
      if (searchInput && searchInput.value) {
        console.log("Input.Value:" + searchInput.value);
        run(searchInput.value);
      }
      event.preventDefault()
    }
  });

  xIcon.addEventListener("click",()=>{
    window.close();
  })
