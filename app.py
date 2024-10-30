from flask import Flask, send_from_directory, redirect
import os

app = Flask(__name__)

# Route for the main HTML page
@app.route('/')
def index():
    return redirect('/play')  # Redirect to the game page

@app.route('/play')  # Make sure this starts with a slash
def play():
    return send_from_directory('play', 'index.html')

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
