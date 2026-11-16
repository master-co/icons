"""Reproduce the documented Dcard trace. Optional tooling: Pillow, vtracer==0.6.12.

Run from the repository root. This writes only the intermediate reference SVG;
optical placement remains in packages/icons/src/brands.json.
"""
from pathlib import Path
import re
import xml.etree.ElementTree as ET
from PIL import Image
import vtracer

original = Image.open('references/brands-03/dcard-original.png').convert('RGBA')
# Preserve the blue field, including the long shadow; turn white into a knockout.
pixels = [(0, 0, 0, 255) if a >= 128 and b - r > 25 else (255, 255, 255, 255)
          for r, g, b, a in original.getdata()]
svg = vtracer.convert_pixels_to_svg(
    pixels, size=original.size, colormode='binary', mode='spline',
    filter_speckle=4, corner_threshold=60, length_threshold=4,
    max_iterations=10, splice_threshold=45, path_precision=4)
paths = []
for path in ET.fromstring(svg):
    tx, ty = map(float, re.search(r'translate\(([^)]+)\)', path.attrib['transform'])[1].split(','))
    def flatten(match):
        command = match[1]
        assert command in ('M', 'C', 'Z'), command
        values = map(float, re.findall(r'-?\d+(?:\.\d+)?', match[2]))
        return command + ' '.join(
            f'{(value + (tx if i % 2 == 0 else ty)) / 512 * 24:.5f}'.rstrip('0').rstrip('.')
            for i, value in enumerate(values))
    d = re.sub(r'([A-Za-z])([^A-Za-z]*)', flatten, path.attrib['d'])
    paths.append(f'<path d="{d}"/>')
Path('references/brands-03/dcard.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">'
    '<title>Dcard — monochrome trace of archived app mark</title>' + ''.join(paths) + '</svg>\n')
