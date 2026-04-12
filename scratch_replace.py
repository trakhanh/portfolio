import re
html = open('c:/Users/Admin/Desktop/Portfolio/index.html', 'r', encoding='utf-8').read()
slides = open('c:/Users/Admin/Desktop/Portfolio/scratch_projects.txt', 'r', encoding='utf-8').read()

new_html, count = re.subn(
    r'<div class="project-slides flex transition-transform duration-500" style="will-change: transform;">.*?</div>\s*<!-- Navigation Buttons -->',
    slides + '\n                    <!-- Navigation Buttons -->',
    html,
    flags=re.DOTALL
)

print('Replaced:', count)
open('c:/Users/Admin/Desktop/Portfolio/index.html', 'w', encoding='utf-8').write(new_html)
