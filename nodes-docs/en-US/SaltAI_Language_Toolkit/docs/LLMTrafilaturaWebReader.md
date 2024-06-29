# ∞ Trafilatura Web
## Documentation
- Class name: `LLMTrafilaturaWebReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMTrafilaturaWebReader node is designed to extract and read content from web pages using the Trafilatura library. It processes up to four URLs to retrieve textual data, facilitating the consumption of web content in a structured format.
## Input types
### Required
- **`url_i`**
    - A URL from which to extract content. This parameter is essential for the node's operation as it defines the starting point for content extraction. The node can process up to four URLs (url_1 to url_4), allowing for the extraction of content from multiple web pages in a single operation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The extracted content from the specified web pages, returned as structured documents.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMTrafilaturaWebReader:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "url_1": ("STRING", {}),
            },
            "optional": {
                "url_2": ("STRING", {}),
                "url_3": ("STRING", {}),
                "url_4": ("STRING", {}),
            },
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "read_web_trafilatura"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def read_web_trafilatura(self, url_1, url_2=None, url_3=None, url_4=None):
        if not url_1.strip():
            raise ValueError("At least one URL must be provided to LLMTrafilaturaWebReader")

        urls = [url_1.strip()]
        if url_2.strip():
            urls.append(url_2.strip())
        if url_3.strip():
            urls.append(url_3.strip())
        if url_4.strip():
            urls.append(url_4.strip())

        valid_urls = []
        for url in urls:
            if not valid_url(url):
                print("Skipping invalid URL", url)
                continue
            valid_urls.append(url)

        print("Valided URLs:", valid_urls)

        documents = TrafilaturaWebReader().load_data(valid_urls)
        return (documents,)

```
