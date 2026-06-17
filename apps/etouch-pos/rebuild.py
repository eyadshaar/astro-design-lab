import os

base = r'C:\Users\EDDY\astro-design-lab\apps\etouch-pos'
src = base + r'\src'

css = open(src + r'\styles\global.css').read()
print("CSS size:", len(css), "chars")
print("CSS exists:", os.path.exists(src + r'\styles\global.css'))
