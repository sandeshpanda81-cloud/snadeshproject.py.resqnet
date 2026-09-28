from flask import Flask, render_template, jsonify
import random
from datetime import datetime

app = Flask(__name__)

state = {
    "incidents": 47,
    "critical": 12,
    "ambulances": 12,
    "teams": 8,
    "medical_kits": 35,
    "shelter_capacity": 420,
    "risk": "HIGH",
    "event_active": False
}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/dashboard")
def dashboard():
    return jsonify(state)

@app.route("/api/simulate", methods=["POST"])
def simulate():
    state["event_active"] = True
    state["incidents"] = random.randint(42, 58)
    state["critical"] = random.randint(10, 16)
    state["ambulances"] = random.randint(8, 12)
    state["teams"] = random.randint(6, 8)
    state["medical_kits"] = random.randint(25, 40)
    state["shelter_capacity"] = random.randint(350, 500)
    state["risk"] = random.choice(["HIGH", "CRITICAL"])
    return jsonify({
        **state,
        "timestamp": datetime.now().strftime("%d %b %Y, %I:%M %p"),
        "message": "AI disaster analysis completed successfully."
    })

@app.route("/api/reset", methods=["POST"])
def reset():
    state.update({
        "incidents": 47,
        "critical": 12,
        "ambulances": 12,
        "teams": 8,
        "medical_kits": 35,
        "shelter_capacity": 420,
        "risk": "HIGH",
        "event_active": False
    })
    return jsonify(state)

if __name__ == "__main__":
    app.run(debug=True)
