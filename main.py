import logging
from flask import Flask, render_template
# from gunicorn.app.base import BaseApplication

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='static')

@app.route("/")
def home_route():
    return render_template("home.html")

# class StandaloneApplication(BaseApplication):
#     def __init__(self, app, options=None):
#         self.application = app
#         self.options = options or {}
#         super().__init__()
# 
#     def load_config(self):
#         # Apply configuration to Gunicorn
#         for key, value in self.options.items():
#             if key in self.cfg.settings and value is not None:
#                 self.cfg.set(key.lower(), value)
# 
#     def load(self):
#         return self.application

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)