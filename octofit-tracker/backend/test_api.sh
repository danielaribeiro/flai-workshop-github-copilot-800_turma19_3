#!/bin/bash

# Test script for OctoFit Tracker API endpoints
# Run this after starting the Django server

CODESPACE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
LOCAL_URL="http://localhost:8000"

echo "==================================="
echo "OctoFit Tracker API Test Script"
echo "==================================="
echo ""
echo "Codespace URL: $CODESPACE_URL"
echo "Local URL: $LOCAL_URL"
echo ""

# Function to test an endpoint
test_endpoint() {
    local name=$1
    local url=$2
    echo "Testing: $name"
    echo "URL: $url"
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" -eq 200 ]; then
        echo "✓ Status: $response (OK)"
        # Show first few lines of actual response
        curl -s "$url" | head -5
    else
        echo "✗ Status: $response (ERROR)"
    fi
    echo ""
}

# Test localhost endpoints
echo "========================================="
echo "Testing LOCAL API Endpoints (localhost)"
echo "========================================="
echo ""

test_endpoint "API Root" "$LOCAL_URL/api/"
test_endpoint "Teams" "$LOCAL_URL/api/teams/"
test_endpoint "Users" "$LOCAL_URL/api/users/"
test_endpoint "Activities" "$LOCAL_URL/api/activities/"
test_endpoint "Leaderboard" "$LOCAL_URL/api/leaderboard/"
test_endpoint "Workouts" "$LOCAL_URL/api/workouts/"

# Test codespace endpoints if CODESPACE_NAME is set
if [ -n "$CODESPACE_NAME" ]; then
    echo ""
    echo "========================================="
    echo "Testing CODESPACE API Endpoints"
    echo "========================================="
    echo ""
    
    test_endpoint "API Root (Codespace)" "$CODESPACE_URL/api/"
    test_endpoint "Teams (Codespace)" "$CODESPACE_URL/api/teams/"
    test_endpoint "Users (Codespace)" "$CODESPACE_URL/api/users/"
    test_endpoint "Activities (Codespace)" "$CODESPACE_URL/api/activities/"
    test_endpoint "Leaderboard (Codespace)" "$CODESPACE_URL/api/leaderboard/"
    test_endpoint "Workouts (Codespace)" "$CODESPACE_URL/api/workouts/"
else
    echo ""
    echo "⚠ CODESPACE_NAME not set - skipping codespace URL tests"
fi

echo ""
echo "========================================="
echo "Test Complete!"
echo "========================================="
