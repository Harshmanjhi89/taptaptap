from flask import Flask, send_from_directory, send_file

app = Flask(__name__)

# Route for the main HTML page
@app.route('/')
def index():
    return send_file('index.html')

@app.route('/play')  # Make sure this starts with a slash
def play():
    return send_from_directory('play', 'index.html')


if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
   
