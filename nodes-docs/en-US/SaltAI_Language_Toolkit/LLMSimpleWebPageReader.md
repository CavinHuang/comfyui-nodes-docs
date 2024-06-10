# ∞ Simple Web Page
## Documentation
- Class name: `LLMSimpleWebPageReader`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

The LLMSimpleWebPageReader node is designed to fetch and process web page content from specified URLs, converting HTML content to text if desired. It allows for the extraction of web page data by providing up to four URLs, making it a versatile tool for web content retrieval and preprocessing.
## Input types
### Required
- **`url_i`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
### Optional
- **`html_to_text`**
    - A boolean flag indicating whether to convert HTML content to plain text, facilitating easier processing and analysis of the web page data.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The processed web page content, returned as documents. This output provides the extracted data from the specified URLs, potentially converted to text.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMSimpleWebPageReader:
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
                "html_to_text": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "read_web"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def read_web(self, url_1, url_2=None, url_3=None, url_4=None, html_to_text=True):
        if not url_1.strip():
            raise ValueError("At least one URL must be provided to LLMSimpleWebPageReader")

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

        documents = SimpleWebPageReader(html_to_text=html_to_text).load_data(valid_urls)
        return (documents,)

```
