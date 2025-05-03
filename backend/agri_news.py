import requests

# Replace with your API key from APITube
API_KEY = 'api_live_1YQWckfPTmil9DkbuXbBJxbF62hAWyGjZLrv6NsuXHDatSdQTDB0uSak'

# Base URL for everything endpoint
url = "https://api.apitube.io/v1/news/category/iab-qag/IAB3-2"

# Parameters for the request
params = {
    "per_page": 10,
    # "page": 1,
    "api_key": API_KEY
}

# Headers
headers = {
    "Authorization": f"Bearer {API_KEY}"
}

print("Making request to:", url)
print("With parameters:", params)

# Make the request
response = requests.get(url, headers=headers, params=params)

# Parse and print response
if response.status_code == 200:
    data = response.json()
    print("\nResponse data structure:", data)  # Print the structure of the response
    
    # Check if 'results' key exists in the response
    articles = data.get('results', [])
    if not articles:
        print("No articles found in the response")
    else:
        print(f"\nFound {len(articles)} articles:")
        for article in articles:
            print(f"\nTitle: {article}")
else:
    print("Error:", response.status_code)
    print("Response text:", response.text)
