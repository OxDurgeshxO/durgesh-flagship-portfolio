"""
Minimal static server for the exported site.

`npx serve` was used first (it is the repo's own preview command) but the npx
process exited part-way through a screenshot run. This does the same job with no
external lifecycle: it resolves extensionless routes the way Next's static
export expects (`/theme-lab` -> `theme-lab.html`, `/work/x` -> `work/x.html`).
"""
import functools
import http.server
import os
import socketserver
import sys
from urllib.parse import unquote

ROOT = os.path.abspath(os.path.join('durgesh-portfolio-v6', 'out'))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3000

MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.webmanifest': 'application/manifest+json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.pdf': 'application/pdf',
}


class Handler(http.server.SimpleHTTPRequestHandler):
    def guess_type(self, path):
        ext = os.path.splitext(path)[1].lower()
        return MIME.get(ext, super().guess_type(path))

    def translate_path(self, path):
        # URL-decode first. Dynamic-route chunks live in directories whose names
        # contain literal brackets — /work/[slug]/page-*.js — and arrive
        # percent-encoded as %5Bslug%5D. Without unquoting, every case-study
        # chunk 404s (this was a real defect in the first version of this file).
        raw = unquote(path.split('?', 1)[0].split('#', 1)[0])
        fs = os.path.normpath(os.path.join(ROOT, raw.lstrip('/\\')))
        # Containment check: never serve outside ROOT. ROOT is absolute, so this
        # compares absolute-to-absolute (a relative ROOT here would reject every
        # request, since a normalised relative path never starts with an
        # absolute one).
        if not fs.startswith(ROOT):
            return os.path.join(ROOT, '__forbidden__')
        if os.path.isdir(fs):
            fs = os.path.join(fs, 'index.html')
        if not os.path.splitext(fs)[1] and not os.path.exists(fs):
            if os.path.exists(fs + '.html'):
                fs = fs + '.html'
            elif os.path.exists(os.path.join(fs, 'index.html')):
                fs = os.path.join(fs, 'index.html')
        return fs

    def log_message(self, fmt, *args):
        # keep the console quiet; only errors are interesting here
        if '404' in (fmt % args):
            sys.stderr.write('%s - %s\n' % (self.address_string(), fmt % args))


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == '__main__':
    if not os.path.isdir(ROOT):
        raise SystemExit(f'{ROOT} not found — run `npm run build` first')
    handler = functools.partial(Handler, directory=ROOT)
    with Server(('127.0.0.1', PORT), handler) as httpd:
        print(f'serving {ROOT} on http://127.0.0.1:{PORT}', flush=True)
        httpd.serve_forever()
