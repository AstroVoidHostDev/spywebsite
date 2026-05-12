from flask import Flask, send_from_directory
from dotenv import load_dotenv
import os
import json

# Load .env file
load_dotenv()

app = Flask(__name__, static_folder="static")

# Generate config.js dynamically from .env
def generate_config_js():
    config = {
        "siteName": os.getenv("SITE_NAME", "Spy Hosting"),
        "siteDescription": os.getenv("SITE_DESCRIPTION", "Premium Hosting Solutions"),
        "siteLogo": os.getenv("SITE_LOGO", "🚀"),
        "defaultBgVideo": {
            "index": os.getenv("DEFAULT_BG_VIDEO_INDEX", "https://motionbgs.com/media/9472/calm-blue-lake.960x540.mp4"),
            "plans": os.getenv("DEFAULT_BG_VIDEO_PLANS", "https://motionbgs.com/media/3228/cherry-leaves.960x540.mp4"),
        },
        "customPanel": {
            "name": os.getenv("PANEL_NAME", "Game Panel"),
            "url": os.getenv("PANEL_URL", "#"),
        },
        "social": {
            "discord": os.getenv("DISCORD_INVITE", "#"),
            "twitter": os.getenv("TWITTER_URL", "#"),
            "telegram": os.getenv("TELEGRAM_URL", "#"),
        },
        "plans": {
            "vps": json.loads(os.getenv("VPS_PLANS", "[]")),
            "minecraft": json.loads(os.getenv("MINECRAFT_PLANS", "[]")),
            "discord": json.loads(os.getenv("DISCORD_PLANS", "[]")),
        }
    }
    return f"const SITE_CONFIG = {json.dumps(config, indent=2)};"

# Serve static files
@app.route("/")
def home():
    return send_from_directory("static", "index.html")

@app.route("/config.js")
def config_js():
    return generate_config_js(), 200, {"Content-Type": "application/javascript"}

@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory("static", path)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001, debug=True)
