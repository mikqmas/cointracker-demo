import pytest
from main import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_hello_world(client):
    response = client.get('/')
    data = response.get_json()
    
    assert response.status_code == 200
    assert data['message'] == 'Welcome to the CoinTracker-Demo!'
