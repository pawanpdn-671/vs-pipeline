import requests
import json

url = "http://127.0.0.1:8000/pipelines/parse"

def test_dag():
    payload = {
        "nodes": [{"id": "1"}, {"id": "2"}, {"id": "3"}],
        "edges": [{"source": "1", "target": "2"}, {"source": "2", "target": "3"}]
    }
    response = requests.post(url, json=payload)
    print("DAG Test Response:", response.json())
    assert response.json()["is_dag"] == True
    assert response.json()["num_nodes"] == 3
    assert response.json()["num_edges"] == 2

def test_cycle():
    payload = {
        "nodes": [{"id": "1"}, {"id": "2"}],
        "edges": [{"source": "1", "target": "2"}, {"source": "2", "target": "1"}]
    }
    response = requests.post(url, json=payload)
    print("Cycle Test Response:", response.json())
    assert response.json()["is_dag"] == False
    assert response.json()["num_nodes"] == 2
    assert response.json()["num_edges"] == 2

if __name__ == "__main__":
    try:
        test_dag()
        test_cycle()
        print("All backend tests passed!")
    except Exception as e:
        print(f"Test failed: {e}")
