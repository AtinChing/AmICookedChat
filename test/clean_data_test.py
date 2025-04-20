# Feeding raw html data into gemini was making us hit token limits that our billing plan wouldn't allow.
# This is a test script to help us determine if using beautiful soup would be helpful enough in making the html data
# fed into gemini pretty small yet contain all the useful essential data at the same time.
from bs4 import BeautifulSoup

def clean_html(html):
    soup = BeautifulSoup(html, "html.parser")

    # Remove style/script
    for tag in soup(["script", "style", "meta", "noscript", "svg", "img"]):
        tag.decompose()

    # Grab just the visible text
    text = soup.get_text(separator="\n")
    # Optional: remove excessive newlines
    text = "\n".join([line.strip() for line in text.split("\n") if line.strip()])

    return text
import os

directory = "."
html_files = []
for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            html_files.append(os.path.join(root, file))

for f in html_files:
    f = open(f, 'r')
    test_content = f.read()
    new_content = clean_html(test_content)
    print(new_content)
    f.close()
    print(f"OLD SIZE PRE-CLEANING: {len(test_content)}\nNEW SIZE POST-CLEANING: {len(new_content)}\n\n\n\n")