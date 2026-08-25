import os
from PIL import Image
import glob

images = glob.glob('public/*.png')
target_images = [img for img in images if any(k in img for k in ['04', '0f', '30', '33', 'c9'])]

for path in sorted(target_images):
    img = Image.open(path).convert('RGBA')
    # Resize to 40x25 to display as ASCII
    img_small = img.resize((40, 25))
    
    print('='*50)
    print(os.path.basename(path))
    print('='*50)
    for y in range(img_small.height):
        line = ''
        for x in range(img_small.width):
            r, g, b, a = img_small.getpixel((x, y))
            # If transparent, print space, otherwise '#'
            line += '#' if a > 50 else ' '
        print(line)
    print('\n')
