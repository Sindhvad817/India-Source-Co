"""
Local dev server for previewing the built site (website/_site/).

Build first:  cd website && npm install && npm run build
Then run:     python dev-server.py   ->   http://127.0.0.1:4322

Plain `python -m http.server` sends a Last-Modified header but no
Cache-Control header, which lets browsers heuristically cache files and
serve stale copies after an edit without revalidating. This wrapper
disables caching so local previews always reflect the latest build, and
mimics Vercel's clean URLs (/page serves page.html) and custom 404 page.
Not used in production — Vercel serves the deployed site.
"""
import functools
import http.server
import os
import sys

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def translate_path(self, path):
        local = super().translate_path(path)
        if not os.path.exists(local) and os.path.isfile(local + ".html"):
            return local + ".html"
        return local

    def send_error(self, code, message=None, explain=None):
        page = os.path.join(self.directory, "404.html")
        if code == 404 and os.path.isfile(page):
            with open(page, "rb") as f:
                body = f.read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().send_error(code, message, explain)

if __name__ == "__main__":
    site_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "website", "_site")
    if not os.path.isdir(site_dir):
        sys.exit("website/_site/ not found. Build first: cd website && npm install && npm run build")
    handler = functools.partial(NoCacheHandler, directory=site_dir)
    http.server.test(HandlerClass=handler, port=4322, bind="127.0.0.1")
