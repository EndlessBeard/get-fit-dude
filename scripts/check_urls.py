#!/usr/bin/env python3

import re
import requests
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

def extract_urls_from_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Find all YouTube URLs in the file
    pattern = r"videoUrl:\s*'(https://www\.youtube\.com/watch\?v=[^']+)'"
    urls = re.findall(pattern, content)
    
    # Associate each URL with its exercise name
    exercise_pattern = r"name:\s*'([^']+)'[^}]+videoUrl:\s*'([^']+)'"
    exercise_urls = re.findall(exercise_pattern, content)
    
    return exercise_urls

def check_url(exercise_info):
    exercise_name, url = exercise_info
    try:
        response = requests.head(url, allow_redirects=True, timeout=5)
        status = response.status_code
        needs_update = status != 200
        return {
            'exercise': exercise_name,
            'url': url,
            'status': status,
            'needs_update': needs_update,
            'error': None
        }
    except Exception as e:
        return {
            'exercise': exercise_name,
            'url': url,
            'status': None,
            'needs_update': True,
            'error': str(e)
        }

def main():
    # Get the exercise_notepad.ts file
    file_path = Path(__file__).parent.parent / 'exercise_notepad.ts'
    
    if not file_path.exists():
        print(f"Error: Could not find {file_path}")
        return
    
    # Extract URLs
    exercise_urls = extract_urls_from_file(file_path)
    print(f"\nFound {len(exercise_urls)} exercise videos to check...\n")
    
    # Check URLs in parallel
    results = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_url = {executor.submit(check_url, url_info): url_info for url_info in exercise_urls}
        for future in as_completed(future_to_url):
            result = future.result()
            results.append(result)
    
    # Group results
    needs_update = [r for r in results if r['needs_update']]
    working = [r for r in results if not r['needs_update']]
    
    # Print summary
    print("Summary:")
    print(f"✅ {len(working)} videos are working")
    print(f"❌ {len(needs_update)} videos need attention\n")
    
    if needs_update:
        print("Videos that need attention:")
        for r in needs_update:
            print(f"\nExercise: {r['exercise']}")
            print(f"URL: {r['url']}")
            if r['error']:
                print(f"Error: {r['error']}")
            else:
                print(f"Status: {r['status']}")

if __name__ == "__main__":
    main()
