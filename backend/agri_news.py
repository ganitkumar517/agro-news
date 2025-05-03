from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Replace with your API key from APITube
API_KEY = 'api_live_1YQWckfPTmil9DkbuXbBJxbF62hAWyGjZLrv6NsuXHDatSdQTDB0uSak'

@app.route('/api/news', methods=['GET'])
def get_news():
    # Base URL for everything endpoint
    url = "https://api.apitube.io/v1/news/everything"

    # Parameters for the request
    params = {
        "per_page": 10,
        "api_key": API_KEY,
        'topic.id': 'industry.agriculture_news'
    }

    # Headers
    headers = {
        "Authorization": f"Bearer {API_KEY}"
    }

    try:
        # Make the request
        response = requests.get(url, headers=headers, params=params)
        
        if response.status_code == 200:
            data = response.json()
            articles = data.get('results', [])
            return jsonify({
                'status': 'success',
                'count': len(articles),
                'articles': articles
            })
        else:
            return jsonify({
                'status': 'error',
                'message': f'Error fetching news: {response.status_code}',
                'details': response.text
            }), response.status_code
            
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=4000)
