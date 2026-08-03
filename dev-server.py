"""
Local dev server for previewing website/ during development.

Plain `python -m http.server` sends a Last-Modified header but no
Cache-Control header, which lets browsers heuristically cache files and
serve stale copies after an edit without revalidating. This wrapper just
disables caching entirely so local previews always reflect the latest
saved files. Not used in production — Vercel serves the deployed site.
"""
import functools
import http.server
import os

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

if __name__ == "__main__":
    website_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "website")
    handler = functools.partial(NoCacheHandler, directory=website_dir)
    http.server.test(HandlerClass=handler, port=4322, bind="127.0.0.1")
