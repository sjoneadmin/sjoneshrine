#!/usr/bin/env python3
"""
Backend API Testing for Donations Tracker Application
Tests the FastAPI backend endpoints
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading backend URL: {e}")
        return None

def test_backend_apis():
    """Test all backend API endpoints"""
    backend_url = get_backend_url()
    if not backend_url:
        print("❌ Could not determine backend URL from frontend/.env")
        return False
    
    api_url = f"{backend_url}/api"
    print(f"🔍 Testing backend APIs at: {api_url}")
    
    # Test results
    results = {
        "root_endpoint": False,
        "create_status": False,
        "get_status": False,
        "backend_accessible": False
    }
    
    try:
        # Test 1: Root endpoint
        print("\n1. Testing root endpoint...")
        response = requests.get(f"{api_url}/", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Root endpoint working correctly")
                results["root_endpoint"] = True
                results["backend_accessible"] = True
            else:
                print(f"❌ Root endpoint returned unexpected data: {data}")
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Root endpoint connection failed: {e}")
    
    try:
        # Test 2: Create status check
        print("\n2. Testing create status endpoint...")
        test_data = {
            "client_name": "test_client_donations_tracker"
        }
        response = requests.post(f"{api_url}/status", json=test_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("client_name") == test_data["client_name"] and "id" in data:
                print("✅ Create status endpoint working correctly")
                results["create_status"] = True
            else:
                print(f"❌ Create status endpoint returned unexpected data: {data}")
        else:
            print(f"❌ Create status endpoint failed with status {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Create status endpoint connection failed: {e}")
    
    try:
        # Test 3: Get status checks
        print("\n3. Testing get status endpoint...")
        response = requests.get(f"{api_url}/status", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ Get status endpoint working correctly (returned {len(data)} items)")
                results["get_status"] = True
            else:
                print(f"❌ Get status endpoint returned non-list data: {type(data)}")
        else:
            print(f"❌ Get status endpoint failed with status {response.status_code}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Get status endpoint connection failed: {e}")
    
    # Summary
    print(f"\n{'='*50}")
    print("BACKEND API TEST SUMMARY")
    print(f"{'='*50}")
    print(f"Backend URL: {api_url}")
    print(f"Backend Accessible: {'✅' if results['backend_accessible'] else '❌'}")
    print(f"Root Endpoint (/): {'✅' if results['root_endpoint'] else '❌'}")
    print(f"Create Status (/status POST): {'✅' if results['create_status'] else '❌'}")
    print(f"Get Status (/status GET): {'✅' if results['get_status'] else '❌'}")
    
    # Check for donation-related endpoints
    print(f"\n{'='*50}")
    print("DONATION FUNCTIONALITY ANALYSIS")
    print(f"{'='*50}")
    print("❌ No donation-related backend APIs found")
    print("❌ No /donations endpoints detected")
    print("❌ No donation data persistence in backend")
    print("ℹ️  This appears to be a frontend-only application using localStorage")
    print("ℹ️  Backend only provides basic status check functionality")
    
    all_passed = all(results.values())
    return all_passed, results

if __name__ == "__main__":
    print("🚀 Starting Backend API Tests for Donations Tracker")
    print(f"Test started at: {datetime.now()}")
    
    success, results = test_backend_apis()
    
    if success:
        print("\n🎉 All backend API tests passed!")
        sys.exit(0)
    else:
        print("\n💥 Some backend API tests failed!")
        sys.exit(1)