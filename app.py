from flask import Flask,send_file,  jsonify     #render_template
import pyjokes

app = Flask(__name__)

@app.route('/')
def home():
    return send_file('index.html')

@app.route('/get_joke')
def get_joke():
    try:
        joke = pyjokes.get_joke()
        return jsonify({'status': 'success', 'joke': joke})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
