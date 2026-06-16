from PIL import Image

img = Image.open("E:\GSAL Task\gsal-website\public\gsal-logo-transparent1.png").convert("RGBA")
new_data = []
for r, g, b, a in img.getdata():
    if r > 230 and g > 230 and b > 230:   # near-white pixel
        new_data.append((r, g, b, 0))      # make it transparent
    else:
        new_data.append((r, g, b, a))
img.putdata(new_data)
img.save("public/gsal-logo-transparent5.png")
print("Done! Saved as public/gsal-logo-transparent.png")