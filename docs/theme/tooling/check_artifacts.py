from PIL import Image, ImageStat
import os
for f in ['proposed-graphite-light-resume.png','proposed-aurora-light-mobile.png','proposed-ember-dark-mobile.png']:
    p = os.path.join('previews', f)
    im = Image.open(p).convert('L')
    st = ImageStat.Stat(im)
    print(f'{f:38s} {im.width}x{im.height:<6d} mean={st.mean[0]:6.1f} stddev={st.stddev[0]:5.1f} '
          + ('content' if st.stddev[0] > 8 else 'BLANK'))
