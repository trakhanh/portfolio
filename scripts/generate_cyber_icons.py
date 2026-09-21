import os
from PIL import Image, ImageDraw

def create_cyberpunk_icon(size):
    # Render at 4x for supersampling / crisp anti-aliasing
    canvas_size = 1024
    img = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Center and radius
    cx, cy = canvas_size / 2, canvas_size / 2
    
    # Outer Hexagon coordinates (relative to 1024)
    # Hexagon points
    pts = [
        (cx, 40),
        (canvas_size - 90, 260),
        (canvas_size - 90, canvas_size - 260),
        (cx, canvas_size - 40),
        (90, canvas_size - 260),
        (90, 260)
    ]

    # Draw dark cyberpunk background plate
    draw.polygon(pts, fill=(10, 14, 26, 255))

    # Glow layers for the hexagon border
    # Outer neon green / cyan glow
    glow_colors = [
        ((0, 255, 136, 40), 28),
        ((0, 240, 255, 80), 20),
        ((0, 255, 136, 180), 14),
        ((0, 240, 255, 255), 8)
    ]
    for color, width in glow_colors:
        draw.polygon(pts, outline=color, width=width)

    # Inner circuit accent line
    inner_pts = [
        (cx, 100),
        (canvas_size - 145, 290),
        (canvas_size - 145, canvas_size - 290),
        (cx, canvas_size - 100),
        (145, canvas_size - 290),
        (145, 290)
    ]
    draw.polygon(inner_pts, outline=(0, 240, 255, 90), width=4)

    # Corner sensors
    sensor_pts = [
        (cx, 40),
        (canvas_size - 90, 260),
        (canvas_size - 90, canvas_size - 260),
        (cx, canvas_size - 40),
        (90, canvas_size - 260),
        (90, 260)
    ]
    for i, (sx, sy) in enumerate(sensor_pts):
        scolor = (0, 255, 136, 255) if i % 2 == 0 else (0, 240, 255, 255)
        draw.ellipse([sx - 16, sy - 16, sx + 16, sy + 16], fill=scolor)
        draw.ellipse([sx - 8, sy - 8, sx + 8, sy + 8], fill=(255, 255, 255, 255))

    # Monogram G (Left cyber glyph)
    # Path: M45,28 L30,28 L23,35 L23,65 L30,72 L46,72 L50,68 L50,52 L36,52
    scale = 10.24
    g_points = [
        (460, 290),
        (310, 290),
        (235, 365),
        (235, 660),
        (310, 735),
        (470, 735),
        (510, 695),
        (510, 530),
        (370, 530)
    ]
    # Draw G with glow
    for width, alpha in [(44, 60), (32, 140), (22, 255)]:
        draw.line(g_points, fill=(0, 240, 255, alpha), width=width, joint="round")
    # G inner core line
    draw.line(g_points, fill=(255, 255, 255, 220), width=8, joint="round")

    # Monogram K (Right cyber glyph)
    # Vertical spine
    k_spine = [(580, 290), (580, 735)]
    for width, alpha in [(44, 60), (32, 140), (22, 255)]:
        draw.line(k_spine, fill=(0, 255, 136, alpha), width=width, joint="round")
    draw.line(k_spine, fill=(255, 255, 255, 220), width=8, joint="round")

    # Top diagonal branch
    k_top = [(590, 512), (730, 330), (790, 330)]
    for width, alpha in [(44, 60), (32, 140), (22, 255)]:
        draw.line(k_top, fill=(0, 255, 136, alpha), width=width, joint="round")
    draw.line(k_top, fill=(255, 255, 255, 220), width=8, joint="round")

    # Bottom diagonal branch
    k_bot = [(590, 512), (740, 695), (790, 695)]
    for width, alpha in [(44, 60), (32, 140), (22, 255)]:
        draw.line(k_bot, fill=(0, 255, 136, alpha), width=width, joint="round")
    draw.line(k_bot, fill=(255, 255, 255, 220), width=8, joint="round")

    # Center node
    draw.ellipse([585 - 28, 512 - 28, 585 + 28, 512 + 28], fill=(0, 255, 136, 120))
    draw.ellipse([585 - 18, 512 - 18, 585 + 18, 512 + 18], fill=(0, 240, 255, 255))
    draw.ellipse([585 - 8, 512 - 8, 585 + 8, 512 + 8], fill=(255, 255, 255, 255))

    # Downsample using high quality Lanczos filter
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

# Generate all required icon sizes
sizes = {
    16: ["icons/gk-16-v2.png", "public/icons/gk-16-v2.png", "dist/client/icons/gk-16-v2.png"],
    32: ["icons/gk-32-v2.png", "icons/gk-32.png", "public/icons/gk-32-v2.png", "public/icons/gk-32.png", "dist/client/icons/gk-32-v2.png", "dist/client/icons/gk-32.png"],
    180: ["icons/gk-180-v2.png", "icons/gk-180.png", "public/icons/gk-180-v2.png", "public/icons/gk-180.png", "dist/client/icons/gk-180-v2.png", "dist/client/icons/gk-180.png"],
    192: ["icons/gk-192-v2.png", "icons/gk-192.png", "public/icons/gk-192-v2.png", "public/icons/gk-192.png", "dist/client/icons/gk-192-v2.png", "dist/client/icons/gk-192.png"],
    512: ["icons/gk-512.png", "public/icons/gk-512.png", "dist/client/icons/gk-512.png"]
}

for sz, paths in sizes.items():
    icon = create_cyberpunk_icon(sz)
    for p in paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        icon.save(p, "PNG")
        print(f"Generated {p} ({sz}x{sz})")

# Generate favicon.ico (containing 16x16, 32x32, 48x48)
icon16 = create_cyberpunk_icon(16)
icon32 = create_cyberpunk_icon(32)
icon48 = create_cyberpunk_icon(48)
ico_paths = ["favicon.ico", "public/favicon.ico", "dist/client/favicon.ico"]
for ip in ico_paths:
    d = os.path.dirname(ip)
    if d:
        os.makedirs(d, exist_ok=True)
    icon32.save(ip, format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Generated {ip}")

print("All cyberpunk icons successfully generated!")
