import requests
import json

URL = "http://localhost:3003/api/rsvp"

def test_rsvp_success():
    payload = {
        "name": "Test User",
        "nim": "12345678",
        "major": "Informatics",
        "organization": "Student Union",
        "email": "test@student.ciputra.ac.id"
    }
    response = requests.post(URL, json=payload)
    print(f"Success Test: {response.status_code}")
    print(response.json())

def test_rsvp_invalid_email():
    payload = {
        "name": "Test User",
        "nim": "12345679",
        "major": "Informatics",
        "organization": "Student Union",
        "email": "test@gmail.com"
    }
    response = requests.post(URL, json=payload)
    print(f"Invalid Email Test: {response.status_code}")
    print(response.json())

def test_rsvp_missing_fields():
    payload = {
        "name": "Test User"
    }
    response = requests.post(URL, json=payload)
    print(f"Missing Fields Test: {response.status_code}")
    print(response.json())

if __name__ == "__main__":
    try:
        test_rsvp_success()
        test_rsvp_invalid_email()
        test_rsvp_missing_fields()
    except Exception as e:
        print(f"Error: {e}")
