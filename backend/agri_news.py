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
    url = " https://inshorts.com/api/en/search/trending_topics/agriculture&max_limit=10&include_card_data=true"

    # Parameters for the request
    # params = {
    #     "per_page": 10,
    #     "api_key": API_KEY,
    #     'topic.id': 'industry.agriculture_news'
    # }

    # Headers
    # headers = {
    #     "Authorization": f"Bearer {API_KEY}"
    # }

    try:
        # Make the request
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            return jsonify({
                'status': 'success',
                'count': len(data),
                'articles': data
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
    app.run(debug=True, port=4000, host='0.0.0.0')
