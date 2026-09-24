"""
Compose per-theme screenshots into a labelled contact sheet.

Reviewing 12 palettes means 12 images; a contact sheet makes the comparison a
single glance and burns the palette + measured contrast floor into each tile so
the accessibility claim travels with the screenshot.

Usage:
  python make_contact_sheet.py --files a.png b.png ... --out sheet.png
                              --title "..." --cols 2 --scale 0.32 --labels "A|B|C"
"""
import argparse
import os

from PIL import Image, ImageDraw, ImageFont

CAPTION_BG = (24, 24, 27, 255)
CAPTION_FG = (244, 244, 245, 255)
SUBTITLE_FG = (161, 161, 170, 255)
PAGE_BG = (9, 9, 11, 255)
PAD = 14
CAPTION_H = 46
TITLE_H = 54


def font(size, bold=False):
    for name in (('segoeuib.ttf' if bold else 'segoeui.ttf'), 'arial.ttf'):
        try:
            return ImageFont.truetype(os.path.join(r'C:\Windows\Fonts', name), size)
        except Exception:
            continue
    return ImageFont.load_default()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--files', nargs='+', required=True)
    ap.add_argument('--labels', nargs='+', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--title', default='')
    ap.add_argument('--cols', type=int, default=2)
    ap.add_argument('--scale', type=float, default=0.32)
    args = ap.parse_args()

    if len(args.files) != len(args.labels):
        raise SystemExit('files and labels must be the same length')

    tiles = []
    for f in args.files:
        im = Image.open(f).convert('RGB')
        w = int(im.width * args.scale)
        h = int(im.height * args.scale)
        tiles.append(im.resize((w, h), Image.LANCZOS))
    tw, th = tiles[0].size
    cols = max(1, min(args.cols, len(tiles)))
    rows = (len(tiles) + cols - 1) // cols

    sheet_w = PAD + cols * (tw + PAD)
    sheet_h = PAD + (TITLE_H if args.title else 0) + rows * (th + CAPTION_H + PAD)
    sheet = Image.new('RGB', (sheet_w, sheet_h), PAGE_BG)
    d = ImageDraw.Draw(sheet)

    y = PAD
    if args.title:
        d.text((PAD, y + 10), args.title, font=font(24, True), fill=CAPTION_FG)
        y += TITLE_H

    f_main = font(15, True)
    f_sub = font(13, False)
    for i, (tile, label) in enumerate(zip(tiles, args.labels)):
        r, c = divmod(i, cols)
        x = PAD + c * (tw + PAD)
        ty = y + r * (th + CAPTION_H + PAD)
        sheet.paste(tile, (x, ty))
        d.rectangle([x, ty + th, x + tw, ty + th + CAPTION_H], fill=CAPTION_BG)
        d.text((x + 10, ty + th + 7), label, font=f_main, fill=CAPTION_FG)
        meta = label.split('|', 1)[1].strip() if '|' in label else ''
        if meta:
            d.text((x + 10, ty + th + 26), meta, font=f_sub, fill=SUBTITLE_FG)

    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    sheet.save(args.out, optimize=True)
    print(f'wrote {args.out}  ({sheet_w}x{sheet_h}, {len(tiles)} tiles)')


if __name__ == '__main__':
    main()
