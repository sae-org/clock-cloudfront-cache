from flask import Flask, jsonify, send_from_directory
from datetime import datetime

app = Flask(__name__, static_folder='static')

@app.route('/')
def home():
    return send_from_directory('static', 'index.html')

@app.route('/api/time')
def api_time():
    return jsonify({
        'endpoint': 'time',
        'timestamp': datetime.now().isoformat(),
        'message': 'This should NOT be cached'
    }), 200, {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    }

@app.route('/api/user/<user_id>')
def api_user(user_id):
    return jsonify({
        'endpoint': 'user',
        'user_id': user_id,
        'timestamp': datetime.now().isoformat(),
        'message': 'This should NOT be cached'
    }), 200, {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    }

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    # For local dev only. In containers use gunicorn (see Dockerfile).
    app.run(host='0.0.0.0', port=80)
