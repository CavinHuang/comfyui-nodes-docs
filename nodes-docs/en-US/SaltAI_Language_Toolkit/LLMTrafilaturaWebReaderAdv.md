---
tags:
- LLM
- LlamaIndex
- WebContentExtraction
---

# ∞ Trafilatura Web (Advanced)
## Documentation
- Class name: `LLMTrafilaturaWebReaderAdv`
- Category: `SALT/Language Toolkit/Readers`
- Output node: `False`

This node is designed for advanced web content extraction, leveraging the Trafilatura library to efficiently parse and retrieve documents from a list of URLs. It focuses on validating URLs and extracting web content into a structured document format, suitable for further processing or analysis.
## Input types
### Required
- **`urls`**
    - A list of URLs from which the node will attempt to extract web content. This parameter is essential for defining the sources of information the node will process.
    - Comfy dtype: `LIST`
    - Python dtype: `List[str]`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The extracted web content, structured as documents. This output is crucial for users needing processed and accessible information from the provided URLs.
    - Python dtype: `Tuple[List[Dict[str, Any]],]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMTrafilaturaWebReaderAdv:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "urls": ("LIST", {}),
            },
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "read_web_trafilatura"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def read_web_trafilatura(self, urls):

        if not urls:
            raise ValueError("At least one URL must be provided to LLMTrafilaturaWebReaderAdv")

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
