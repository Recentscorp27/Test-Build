from flask import Flask, request, render_template
from poetry_app import create_poem

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    poem = None
    if request.method == "POST":
        emotions = request.form.get("emotions", "")
        poem = create_poem(emotions.split(','))
    return render_template("index.html", poem=poem)

if __name__ == "__main__":
    app.run(debug=True)
