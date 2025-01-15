import requests

def call_api():
    try:
        response = requests.get("https://example.com/api")
        if response.status_code == 200:
            print(f"API called successfully: {response.json()}")
        else:
            print(f"Failed to call API. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
