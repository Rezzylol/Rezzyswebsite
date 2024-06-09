from flask import request
import logging
from flask import Flask, render_template, url_for
# from gunicorn.app.base import BaseApplication

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='static')

@app.before_request
def before_request():
    request.user_ip = request.headers.get('cf-connecting-ip')

@app.route("/")
def home_route():
    return render_template("home.html", user_ip=request.user_ip)
@app.route("/ip")
def show_ip():
    return f"Your IP address is: {request.user_ip}"  # This route is no longer used

@app.route("/about")
def about_route():
    return render_template("about.html", user_ip=request.user_ip)

@app.route("/silly")
def silly_route():
    return render_template("silly.html", user_ip=request.user_ip)

@app.route("/yip_box", methods=["GET", "POST"])
def yip_box_route():
    if request.method == "POST":
        username = request.form.get("username")
        message = request.form.get("message")
        if username and message:
            key_value_storage("store", "yip_box", username, message)
    messages = key_value_storage("retrieve", "yip_box", "", "")
    if messages.get("upstream_service_result_code") != 200:
        messages = {"kv_pairs": []}
    return render_template("yip_box.html", user_ip=request.user_ip, messages=messages.get("kv_pairs", []))


import random

@app.context_processor
def inject_visitor_number():
    visitor_number = random.randint(2000, 50000)
    return dict(visitor_number=visitor_number)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)