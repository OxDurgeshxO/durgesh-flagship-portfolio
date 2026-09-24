"""
Migrate hardcoded dark-only utilities to semantic theme tokens.

Why a script and not 500 hand-edits: the mapping is mechanical and auditable,
and hand-editing that many occurrences guarantees drift. The diff it produces is
reviewable (dry-run by default) and the counts are printed per file.

THE ONE RULE THAT MATTERS: `text-white` is NOT blindly replaced. On a filled
brand button (a violet/rose/emerald gradient or solid) white is correct in BOTH
modes — the fill carries the contrast. So `text-white` is only rewritten when
the same class list contains no brand-fill pattern.
"""
import os
import re
import sys

REPO = os.path.join('durgesh-portfolio-v6')

# class lists that carry their own fill -> white text stays white
BRAND_FILL = [
    'bg-gradient', 'from-purple-', 'from-rose-', 'from-emerald-', 'from-blue-',
    'from-[var(--gradient-start)]', 'from-[var(--gradient-end)]',
    'bg-primary', 'bg-secondary', 'bg-[#0A66C2]', 'bg-[#0a66c2]',
    'bg-emerald-5', 'bg-emerald-6', 'bg-purple-5', 'bg-purple-6',
    'bg-rose-5', 'bg-rose-6', 'bg-blue-5', 'bg-blue-6', 'bg-blue-7',
    'bg-slate-700', 'bg-slate-800', 'bg-red-5', 'bg-red-6', 'bg-[var(--accent',
]

MAPPING = [
    # --- status accents (mode-specific 300/400 vs 700 step) ----------------
    ('shadow-emerald-500/10', 'shadow-black/5'),
    ('bg-emerald-500/10', 'bg-[var(--accent-lab-bg)]'),
    ('boarder-emerald-500/30', 'border-[var(--accent-lab-border)]'),
    ('border-emerald-500/30', 'border-[var(--accent-lab-border)]'),
    ('border-emerald-500/40', 'border-[var(--accent-lab-border)]'),
    ('text-emerald-400', 'text-[var(--accent-lab)]'),
    ('text-emerald-300', 'text-[var(--accent-lab)]'),
    ('bg-blue-500/10', 'bg-[var(--accent-signal-bg)]'),
    ('border-blue-500/30', 'border-[var(--accent-signal-border)]'),
    ('border-blue-500/40', 'border-[var(--accent-signal-border)]'),
    ('text-blue-400', 'text-[var(--accent-signal)]'),
    ('text-blue-300', 'text-[var(--accent-signal)]'),
    ('text-sky-400', 'text-[var(--accent-signal)]'),
    ('text-sky-300', 'text-[var(--accent-signal)]'),
    ('text-amber-400', 'text-[var(--accent-warm)]'),
    ('text-amber-300', 'text-[var(--accent-warm)]'),
    ('text-red-400', 'text-[var(--accent-critical)]'),
    ('text-red-300', 'text-[var(--accent-critical)]'),
    # --- brand accents ----------------------------------------------------
    ('from-purple-600', 'from-[var(--gradient-start)]'),
    ('from-purple-500', 'from-[var(--gradient-start)]'),
    ('to-rose-500', 'to-[var(--gradient-end)]'),
    ('hover:border-purple-400/70', 'hover:border-primary/70'),
    ('hover:border-purple-400/50', 'hover:border-primary/70'),
    ('hover:border-purple-500/50', 'hover:border-primary/50'),
    ('border-purple-500/50', 'border-primary/40'),
    ('border-purple-500/40', 'border-primary/40'),
    ('border-purple-500/30', 'border-primary/40'),
    ('border-purple-500/20', 'border-primary/30'),
    ('bg-purple-500/20', 'bg-primary/10'),
    ('bg-purple-500/15', 'bg-primary/10'),
    ('bg-purple-500/10', 'bg-primary/10'),
    ('hover:bg-purple-500/15', 'hover:bg-primary/15'),
    ('hover:bg-purple-500/10', 'hover:bg-primary/15'),
    ('text-purple-400', 'text-primary'),
    ('text-purple-300', 'text-primary'),
    ('text-purple-200', 'text-primary'),
    ('bg-rose-500/20', 'bg-secondary/10'),
    ('bg-rose-500/10', 'bg-secondary/10'),
    ('text-rose-400', 'text-secondary'),
    ('text-rose-300', 'text-secondary'),
    ('shadow-purple-500/20', 'shadow-black/20'),
    ('shadow-purple-500/10', 'shadow-black/10'),
    ('shadow-rose-500/20', 'shadow-black/20'),
    # --- raw hex fills used inline ---------------------------------------
    ('bg-[#a855f7]/15', 'bg-primary/15'),
    ('bg-[#a855f7]/14', 'bg-primary/14'),
    ('bg-[#a855f7]/10', 'bg-primary/10'),
    ('bg-[#a855f7]', 'bg-primary'),
    ('text-[#a855f7]', 'text-primary'),
    ('bg-[#f43f5e]/15', 'bg-secondary/15'),
    ('bg-[#f43f5e]/18', 'bg-secondary/18'),
    ('bg-[#f43f5e]/12', 'bg-secondary/12'),
    ('bg-[#ec4899]/12', 'bg-secondary/12'),
    # --- surfaces: the big four ------------------------------------------
    ('hover:border-white/40', 'hover:border-border-strong'),
    ('hover:border-white/30', 'hover:border-border-strong'),
    ('hover:border-white/20', 'hover:border-border-strong'),
    ('border-white/30', 'border-border-strong'),
    ('border-white/20', 'border-border-strong'),
    ('border-white/10', 'border-border'),
    ('border-white/5', 'border-border/60'),
    ('hover:bg-white/15', 'hover:bg-accent'),
    ('hover:bg-white/10', 'hover:bg-accent'),
    ('hover:bg-white/5', 'hover:bg-muted'),
    ('bg-white/[0.02]', 'bg-muted/60'),
    ('bg-white/10', 'bg-accent'),
    ('bg-white/5', 'bg-muted'),
    ('bg-slate-950/40', 'bg-card/60'),
    ('bg-slate-950/60', 'bg-popover/80'),
    ('bg-slate-950/80', 'bg-popover/90'),
    ('bg-slate-950/95', 'bg-popover'),
    ('bg-slate-950', 'bg-popover'),
    ('bg-slate-900/80', 'bg-card/80'),
    ('bg-slate-900/70', 'bg-card/80'),
    ('bg-slate-900/60', 'bg-card/80'),
    ('bg-slate-900', 'bg-card'),
    ('bg-slate-800', 'bg-muted'),
    ('border-slate-700', 'border-border-strong'),
    ('border-slate-800', 'border-border'),
    ('border-slate-600', 'border-border-strong'),
    ('bg-black/80', 'bg-[var(--overlay-scrim)]'),
    ('bg-black/50', 'bg-[var(--overlay-scrim)]'),
    # --- text -------------------------------------------------------------
    ('hover:text-white', 'hover:text-ink'),
    ('text-slate-100', 'text-ink'),
    ('text-slate-200', 'text-ink'),
    ('text-slate-300', 'text-body'),
    ('text-slate-400', 'text-muted-foreground'),
    ('text-slate-500', 'text-muted-foreground'),
]

SEGMENT = re.compile(r'(["\'])((?:\\.|(?!\1).)*)\1', re.DOTALL)


def looks_like_classes(s: str) -> bool:
    if len(s) > 4000:
        return False
    # a class list contains a known utility token or a space-separated pair
    return bool(re.search(r'(text-|bg-|border-|from-|to-|shadow-|hover:|glass)', s))


def migrate_classlist(s: str):
    counts = {}
    for old, new in MAPPING:
        if old == 'boarder-emerald-500/30':  # guard against my own typo entry
            continue
        if old in s:
            n = s.count(old)
            s = s.replace(old, new)
            counts[new] = counts.get(new, 0) + n
    # text-white is context-sensitive
    if 'text-white' in s and not any(p in s for p in BRAND_FILL):
        n = s.count('text-white')
        s = s.replace('text-white', 'text-ink')
        counts['text-ink(white)'] = counts.get('text-ink(white)', 0) + n
    return s, counts


def process(path, apply=False):
    with open(path, 'r', encoding='utf-8') as f:
        src = f.read()
    total = {}
    out = []
    pos = 0
    for m in SEGMENT.finditer(src):
        content = m.group(2)
        if not looks_like_classes(content):
            continue
        new_content, counts = migrate_classlist(content)
        if counts:
            out.append((m.start(2), m.end(2), new_content))
            for k, v in counts.items():
                total[k] = total.get(k, 0) + v
    if not total:
        return {}
    if apply:
        for start, end, new_content in reversed(out):
            src = src[:start] + new_content + src[end:]
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(src)
    return total


def main():
    apply = '--apply' in sys.argv
    grand = {}
    files_changed = 0
    for root, dirs, files in os.walk(REPO):
        dirs[:] = [d for d in dirs if d not in ('node_modules', '.next', 'out', '.git')]
        for fn in files:
            if not fn.endswith(('.tsx', '.ts')):
                continue
            p = os.path.join(root, fname := fn) if False else os.path.join(root, fn)
            rel = os.path.relpath(p, REPO)
            counts = process(p, apply=apply)
            if counts:
                files_changed += 1
                rel_counts = ', '.join(f'{k}x{v}' for k, v in sorted(counts.items()))
                print(f'{rel:52s} {rel_counts}')
                for k, v in counts.items():
                    grand[k] = grand.get(k, 0) + v
    print()
    print(f'{"APPLIED" if apply else "DRY RUN"} — {files_changed} files, '
          f'{sum(grand.values())} replacements')
    for k, v in sorted(grand.items(), key=lambda kv: -kv[1]):
        print(f'  {v:4d}  {k}')


if __name__ == '__main__':
    main()
