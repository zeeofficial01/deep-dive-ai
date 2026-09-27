from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Deep-Dive AI Backend is running",
        "status": "success"
    })


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "service": "Deep-Dive AI",
        "status": "healthy"
    })


@app.route("/api/analyze", methods=["POST"])
def analyze_video():
    data = request.get_json()

    youtube_url = data.get("youtube_url")

    if not youtube_url:
        return jsonify({
            "error": "YouTube URL is required"
        }), 400

    return jsonify({
        "message": "Video received successfully",
        "youtube_url": youtube_url,
        "status": "ready_for_analysis"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)