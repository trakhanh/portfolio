import os
import sys
import threading
import time
import urllib.request
from http.server import SimpleHTTPRequestHandler, HTTPServer
import socketserver

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out")

PROJECT_SLUGS = [
    "computer-vision-inspection",
    "multi-task-learning",
    "finger-counting",
    "recruitment-chatbot",
    "internal-automation",
    "preorder-workshop-web",
    "hrm-application",
    "ai-creative-production",
]

PORT = 3333

class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=OUT_DIR, **kwargs)

    def log_message(self, format, *args):
        pass  # Quiet logging

def run_tests():
    print(f"=== Verifying Out Directory: {OUT_DIR} ===")
    assert os.path.exists(OUT_DIR), "out/ directory does not exist!"
    
    # Check essential root files
    root_files = ["CNAME", ".nojekyll", "index.html", "404.html"]
    for f in root_files:
        p = os.path.join(OUT_DIR, f)
        exists = os.path.exists(p)
        print(f"  [CHECK] {f}: {'OK' if exists else 'MISSING'}")
        assert exists, f"Missing essential root file: {f}"

    # Check CNAME content
    with open(os.path.join(OUT_DIR, "CNAME"), "r") as f:
        cname_content = f.read().strip()
        print(f"  [CHECK] CNAME content: '{cname_content}'")
        assert cname_content == "portfolio.khanhtra.io.vn", f"Invalid CNAME: {cname_content}"

    # Check all 8 project routes
    for slug in PROJECT_SLUGS:
        project_html = os.path.join(OUT_DIR, "projects", slug, "index.html")
        exists = os.path.exists(project_html)
        print(f"  [CHECK] Route /projects/{slug}/index.html: {'OK' if exists else 'MISSING'}")
        assert exists, f"Missing route for slug: {slug}"

    # Check assets
    assets = [
        "img/logo-gk.svg",
        "img/recommendation-letter-page-1-hd.jpg",
        "img/recommendation-letter-page-2-hd.jpg",
        "files/thu-gioi-thieu-tra-nguyen-gia-khanh.pdf",
    ]
    for asset in assets:
        p = os.path.join(OUT_DIR, asset)
        exists = os.path.exists(p)
        print(f"  [CHECK] Asset {asset}: {'OK' if exists else 'MISSING'}")
        assert exists, f"Missing asset: {asset}"

    # Test HTTP server endpoints
    print("\n=== Testing HTTP Server Responses ===")
    endpoints = [
        "/",
        "/CNAME",
        "/img/logo-gk.svg",
        "/files/thu-gioi-thieu-tra-nguyen-gia-khanh.pdf",
        "/projects/computer-vision-inspection/",
        "/projects/ai-creative-production/",
        "/projects/hrm-application/",
        "/projects/internal-automation/",
        "/projects/multi-task-learning/",
        "/projects/finger-counting/",
        "/projects/recruitment-chatbot/",
        "/projects/preorder-workshop-web/",
    ]

    for ep in endpoints:
        url = f"http://127.0.0.1:{PORT}{ep}"
        req = urllib.request.Request(url)
        try:
            with urllib.request.urlopen(req) as resp:
                status = resp.status
                content_len = len(resp.read())
                print(f"  [HTTP 200] {ep} ({content_len:,} bytes)")
                assert status == 200
        except Exception as e:
            print(f"  [FAIL] {ep}: {e}")
            raise e

    print("\n>>> ALL TESTS PASSED SUCCESSFULLY (100% HEALTHY STATIC EXPORT) <<<")

def main():
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), QuietHandler)
    server_thread = threading.Thread(target=httpd.serve_forever)
    server_thread.daemon = True
    server_thread.start()

    time.sleep(0.5)

    try:
        run_tests()
    finally:
        httpd.shutdown()
        server_thread.join(timeout=1)

if __name__ == "__main__":
    main()
