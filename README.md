# 🤖 MuzamilBot — AI Chat Assistant

Built by **Muzamil Ahmad Mir** | Python · Flask · Groq · Llama 3.1

---

## 📁 Project Structure

```
project/
├── python_backend/
│   ├── app.py              ← Flask backend (main server)
│   ├── requirements.txt    ← Python dependencies
│   └── templates/
│       └── index.html      ← HTML frontend (copy from below)
└── src/                    ← React frontend (Figma Make)
```

---

## ⚙️ Setup & Run

### 1. Install Dependencies
```bash
cd python_backend
pip install -r requirements.txt
```

### 2. Add Your Groq API Key
Open `app.py` and replace:
```python
client = Groq(api_key="YOUR_GROQ_API_KEY_HERE")
```
Get your free key from: https://console.groq.com

### 3. Run the Server
```bash
python app.py
```
Server starts at: `http://localhost:5000`

---

## 🌐 HTML Template — `templates/index.html`

Create the file `python_backend/templates/index.html` and paste this code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MuzamilBot — AI Chat Assistant</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0f0f1a; color: #e2e8f0;
      height: 100vh; display: flex; overflow: hidden;
    }
    .sidebar {
      width: 270px; background: #1a1a2e;
      border-right: 1px solid #2d2d4e;
      display: flex; flex-direction: column;
      padding: 24px 20px; gap: 20px; flex-shrink: 0;
    }
    .dev-avatar {
      width: 52px; height: 52px; border-radius: 14px;
      background: linear-gradient(135deg, #7c3aed, #a855f7, #d946ef);
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; font-weight: 700; color: white;
      box-shadow: 0 4px 20px rgba(124,58,237,0.35);
    }
    .dev-name { font-size: 15px; font-weight: 600; color: #f1f5f9; }
    .dev-role { font-size: 12px; color: #a78bfa; margin-top: 2px; }
    .divider { border: none; border-top: 1px solid #2d2d4e; }
    .stack-title { font-size:10px; text-transform:uppercase; letter-spacing:.1em; color:#64748b; margin-bottom:10px; }
    .stack-item { display:flex; justify-content:space-between; font-size:12px; padding:4px 0; }
    .stack-item span:first-child { color:#64748b; }
    .val { font-weight:500; }
    .violet{color:#a78bfa;} .green{color:#34d399;} .amber{color:#fbbf24;} .sky{color:#38bdf8;}
    .status-badge {
      display:flex; align-items:center; gap:8px;
      background:rgba(52,211,153,0.08); border:1px solid rgba(52,211,153,0.2);
      border-radius:12px; padding:10px 14px; font-size:12px; color:#34d399; font-weight:500; margin-top:auto;
    }
    .dot { width:8px; height:8px; border-radius:50%; background:#34d399; animation:pulse 1.5s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .main { flex:1; display:flex; flex-direction:column; min-width:0; }
    .header {
      background:rgba(26,26,46,0.6); backdrop-filter:blur(12px);
      border-bottom:1px solid #2d2d4e; padding:16px 24px;
      display:flex; align-items:center; justify-content:space-between;
    }
    .header-left { display:flex; align-items:center; gap:12px; }
    .bot-avatar {
      width:38px; height:38px; border-radius:12px;
      background:linear-gradient(135deg,#7c3aed,#9333ea);
      display:flex; align-items:center; justify-content:center; font-size:18px;
      box-shadow:0 4px 12px rgba(124,58,237,0.3);
    }
    .bot-name { font-size:14px; font-weight:600; color:#f1f5f9; }
    .bot-status { font-size:12px; color:#64748b; display:flex; align-items:center; gap:5px; }
    .dot-sm { width:6px; height:6px; border-radius:50%; background:#34d399; }
    #messages {
      flex:1; overflow-y:auto; padding:24px;
      display:flex; flex-direction:column; gap:18px; scroll-behavior:smooth;
    }
    #messages::-webkit-scrollbar{width:5px;}
    #messages::-webkit-scrollbar-track{background:transparent;}
    #messages::-webkit-scrollbar-thumb{background:#2d2d4e;border-radius:10px;}
    .message { display:flex; gap:10px; animation:slideUp 0.25s ease; }
    .message.user { flex-direction:row-reverse; }
    @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
    .avatar {
      width:36px; height:36px; border-radius:10px; flex-shrink:0;
      display:flex; align-items:center; justify-content:center; font-size:16px;
    }
    .bot-av { background:linear-gradient(135deg,#1e293b,#0f172a); border:1px solid #334155; }
    .user-av { background:linear-gradient(135deg,#7c3aed,#9333ea); }
    .bubble-wrap { display:flex; flex-direction:column; gap:4px; max-width:72%; }
    .message.user .bubble-wrap { align-items:flex-end; }
    .bubble { padding:12px 16px; border-radius:18px; font-size:14px; line-height:1.6; white-space:pre-wrap; }
    .bubble.bot { background:#1e293b; border:1px solid #334155; border-top-left-radius:4px; color:#e2e8f0; }
    .bubble.user { background:linear-gradient(135deg,#7c3aed,#9333ea); border-top-right-radius:4px; color:white; }
    .time { font-size:11px; color:#475569; padding:0 4px; }
    .typing { display:flex; align-items:center; gap:5px; padding:12px 16px; }
    .typing span {
      width:8px; height:8px; border-radius:50%; background:#a78bfa;
      animation:bounce 0.6s infinite alternate;
    }
    .typing span:nth-child(2){animation-delay:0.15s;}
    .typing span:nth-child(3){animation-delay:0.3s;}
    @keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-8px)}}
    #suggestions { padding:0 24px 8px; display:flex; flex-wrap:wrap; gap:8px; }
    .suggestion {
      font-size:12px; color:#94a3b8; background:#1e293b;
      border:1px solid #334155; border-radius:999px;
      padding:6px 14px; cursor:pointer; transition:all 0.2s;
    }
    .suggestion:hover { color:white; border-color:rgba(124,58,237,0.5); background:#2d2d4e; }
    .input-area { padding:12px 24px 20px; }
    .input-box {
      display:flex; align-items:flex-end; gap:10px;
      background:#1e293b; border:1px solid #334155;
      border-radius:18px; padding:12px 16px; transition:border-color 0.2s;
    }
    .input-box:focus-within { border-color:rgba(124,58,237,0.5); }
    #user-input {
      flex:1; background:transparent; border:none; outline:none;
      color:#e2e8f0; font-size:14px; resize:none; font-family:inherit;
      line-height:1.5; max-height:120px; overflow-y:auto;
    }
    #user-input::placeholder { color:#475569; }
    #send-btn {
      width:36px; height:36px; border-radius:10px;
      background:linear-gradient(135deg,#7c3aed,#9333ea);
      border:none; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0; transition:all 0.2s;
      box-shadow:0 4px 12px rgba(124,58,237,0.3);
    }
    #send-btn:hover { transform:scale(1.05); box-shadow:0 4px 18px rgba(124,58,237,0.5); }
    #send-btn:disabled { opacity:0.4; cursor:default; transform:none; }
    #send-btn svg { width:16px; height:16px; fill:white; }
    .footer-text { text-align:center; font-size:11px; color:#334155; margin-top:8px; }
    .footer-text span { color:#7c3aed; }
  </style>
</head>
<body>
  <aside class="sidebar">
    <div style="display:flex;align-items:center;gap:12px">
      <div class="dev-avatar">M</div>
      <div>
        <div class="dev-name">Muzamil Ahmad Mir</div>
        <div class="dev-role">AI &amp; Python Developer</div>
      </div>
    </div>
    <hr class="divider" />
    <div>
      <div class="stack-title">Powered By</div>
      <div class="stack-item"><span>Model</span>   <span class="val violet">Llama 3.1-8B</span></div>
      <div class="stack-item"><span>API</span>     <span class="val green">Groq Cloud</span></div>
      <div class="stack-item"><span>Backend</span> <span class="val amber">Flask (Python)</span></div>
      <div class="stack-item"><span>Frontend</span><span class="val sky">HTML / CSS / JS</span></div>
    </div>
    <div class="status-badge" style="margin-top:auto">
      <div class="dot"></div> AI is Online
    </div>
  </aside>

  <main class="main">
    <header class="header">
      <div class="header-left">
        <div class="bot-avatar">🤖</div>
        <div>
          <div class="bot-name">MuzamilBot</div>
          <div class="bot-status"><div class="dot-sm"></div> Always ready to help</div>
        </div>
      </div>
      <div style="font-size:12px;color:#64748b">✨ Llama 3.1 · Groq</div>
    </header>

    <div id="messages"></div>

    <div id="suggestions">
      <button class="suggestion" onclick="useSuggestion(this)">What can you do?</button>
      <button class="suggestion" onclick="useSuggestion(this)">Tumhe kisne banaya?</button>
      <button class="suggestion" onclick="useSuggestion(this)">Tell me a fun fact</button>
      <button class="suggestion" onclick="useSuggestion(this)">Explain AI simply</button>
    </div>

    <div class="input-area">
      <div class="input-box">
        <textarea id="user-input" rows="1" placeholder="Type your message... (Enter to send)"></textarea>
        <button id="send-btn" onclick="sendMessage()">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div class="footer-text">
        Built by <span>Muzamil Ahmad Mir</span> · Powered by Groq &amp; Llama 3.1
      </div>
    </div>
  </main>

  <script>
    const messagesEl = document.getElementById("messages");
    const inputEl = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const suggestionsEl = document.getElementById("suggestions");

    inputEl.addEventListener("input", () => {
      inputEl.style.height = "auto";
      inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + "px";
    });

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    function now() {
      return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    function appendMessage(role, text) {
      const wrap = document.createElement("div");
      wrap.className = "message " + role;
      const avatar = document.createElement("div");
      avatar.className = "avatar " + (role === "bot" ? "bot-av" : "user-av");
      avatar.textContent = role === "bot" ? "🤖" : "👤";
      const bw = document.createElement("div");
      bw.className = "bubble-wrap";
      const bubble = document.createElement("div");
      bubble.className = "bubble " + role;
      bubble.textContent = text;
      const time = document.createElement("div");
      time.className = "time";
      time.textContent = now();
      bw.appendChild(bubble); bw.appendChild(time);
      wrap.appendChild(avatar); wrap.appendChild(bw);
      messagesEl.appendChild(wrap);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function appendTyping() {
      const wrap = document.createElement("div");
      wrap.className = "message bot"; wrap.id = "typing-indicator";
      const avatar = document.createElement("div");
      avatar.className = "avatar bot-av"; avatar.textContent = "🤖";
      const bw = document.createElement("div"); bw.className = "bubble-wrap";
      const bubble = document.createElement("div"); bubble.className = "bubble bot";
      bubble.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
      bw.appendChild(bubble); wrap.appendChild(avatar); wrap.appendChild(bw);
      messagesEl.appendChild(wrap);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function removeTyping() {
      const el = document.getElementById("typing-indicator");
      if (el) el.remove();
    }

    function useSuggestion(btn) {
      inputEl.value = btn.textContent;
      suggestionsEl.style.display = "none";
      sendMessage();
    }

    async function sendMessage() {
      const text = inputEl.value.trim();
      if (!text || sendBtn.disabled) return;
      suggestionsEl.style.display = "none";
      inputEl.value = ""; inputEl.style.height = "auto";
      sendBtn.disabled = true;
      appendMessage("user", text);
      appendTyping();
      try {
        const res = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        removeTyping();
        appendMessage("bot", data.reply || "Sorry, no response.");
      } catch {
        removeTyping();
        appendMessage("bot", "⚠️ Could not connect. Make sure Flask is running on port 5000.");
      }
      sendBtn.disabled = false;
      inputEl.focus();
    }

    window.addEventListener("load", () => {
      appendMessage("bot", "Assalam o Alaikum! I'm your AI assistant powered by Muzamil Ahmad Mir 🚀\nAsk me anything — I'm here to help!");
    });
  </script>
</body>
</html>
```

---

## 🔑 Get Groq API Key (Free)

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up / Log in
3. Click **API Keys** → **Create API Key**
4. Copy and paste it into `app.py`

---

## 🧠 Features

| Feature | Details |
|---|---|
| **AI Model** | Llama 3.1-8B (via Groq) |
| **Creator Answer** | Always replies "Muzamil Ahmad Mir" in any language |
| **Welcome Message** | Assalam o Alaikum greeting on load |
| **Backend** | Python Flask with CORS support |
| **Frontend** | Pure HTML/CSS/JS + React version |

---

## 👨‍💻 Developer

**Muzamil Ahmad Mir**  
Python · Flask · AI/ML · Groq · Llama

---
