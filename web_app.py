from flask import Flask, request, render_template_string
from poetry_app import create_poem

app = Flask(__name__)

FORM_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>Poetry Generator</title>
</head>
<body>
    <h1>Poetry Generator</h1>
    <form method="post">
        <label for="emotions">Enter emotions (comma separated):</label>
        <input type="text" id="emotions" name="emotions" />
        <button type="submit">Create Poem</button>
    </form>
    {% if poem %}
    <pre>{{ poem }}</pre>
    {% endif %}
</body>
</html>
"""

@app.route("/", methods=["GET", "POST"])
def index():
    poem = None
    if request.method == "POST":
        emotions = request.form.get("emotions", "")
        poem = create_poem(emotions.split(','))
    return render_template_string(FORM_TEMPLATE, poem=poem)

if __name__ == "__main__":
    app.run(debug=True)
