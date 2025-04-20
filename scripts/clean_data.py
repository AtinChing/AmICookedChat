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
    return truncate(text)


def truncate(text, max_lines=100):
    """Limit text to the first N non-empty lines."""
    lines = text.split("\n")
    return "\n".join(lines[:max_lines])