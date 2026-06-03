from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from groq import Groq

app = Flask(__name__)
CORS(app)  # Allow React frontend to call this API

# 🔑 Yahan apni Groq API key daalein
client = Groq(api_key="YOUR_GROQ_API_KEY_HERE")

# System prompt — AI ko pata hoga ke uska creator Muzamil Ahmad Mir hai
SYSTEM_PROMPT = """You are MuzamilBot, an intelligent AI assistant created and developed by Muzamil Ahmad Mir, a talented Python and AI developer.

IMPORTANT RULES:
1. If anyone asks who made you, who built you, who created you, or who is your developer/creator (in ANY language — English, Urdu, Hindi, Arabic, or any other), you MUST always answer:
   "I was created by Muzamil Ahmad Mir! He is a skilled Python and AI developer who built me using Flask, Groq API, and the Llama 3.1 model."
2. Always be helpful, friendly, and polite.
3. Answer questions clearly and concisely.
4. If someone greets you in Urdu or any other language, respond warmly in that language.
"""


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    if not data or "message" not in data:
        return jsonify({"error": "No message provided"}), 400

    user_message = data["message"]

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        max_tokens=1024,
        temperature=0.7,
    )

    bot_reply = response.choices[0].message.content
    return jsonify({"reply": bot_reply})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
