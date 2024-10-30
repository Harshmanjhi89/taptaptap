from flask import Flask, render_template

app = Flask(__name__)

# Route for the main HTML page
@app.route('/')
def home():
    return render_template('index.html')

# Route for the first play HTML page
@app.route('/play')
def play1():
    return render_template('play/index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
