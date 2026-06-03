from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

# 🔐 API key from .env file
client = Groq(api_key=os.getenv("API_KEY"))

SYSTEM_PROMPT = """You are MuzamilBot, an intelligent AI assistant created and developed by Muzamil Ahmad Mir.
If anyone asks who made you, always say Muzamil Ahmad Mir built you using Flask, Groq API, and Llama model.
Be helpful, friendly, and clear.
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
