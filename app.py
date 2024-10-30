from flask import Flask, render_template

app = Flask(__name__, template_folder='play')  # Set the templates folder to 'play'

@app.route('/')
def home():
    return render_template('index.html')  # It will look for 'play/index.html'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
