from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

load_dotenv()

client = Groq(api_key=os.getenv("API_KEY"))

SYSTEM_PROMPT = """You are MuzamilBot..."""

@app.route("/")
def home():
    return jsonify({"message": "Backend is running"})

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
