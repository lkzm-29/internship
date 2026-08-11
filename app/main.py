import os

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

# static_folder points at app/static/, which is where the React build
# output (frontend/dist/*) gets copied to by the Dockerfile.
app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app)


@app.route("/api/hello")
def hello():
    return jsonify({"message": "Hello, World! - Melior DevSecOps Internship"})


# Catch-all: serve the built React app for "/" and any client-side route,
# but fall back to index.html for unknown paths (so React Router, if you
# add it later, still works on refresh).
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    target = os.path.join(app.static_folder, path)
    if path and os.path.isfile(target):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
