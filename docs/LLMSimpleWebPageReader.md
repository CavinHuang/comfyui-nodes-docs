
# Documentation
- Class name: LLMSimpleWebPageReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMSimpleWebPageReader节点旨在从指定的URL获取和处理网页内容，并可根据需要将HTML内容转换为文本。它允许通过提供最多四个URL来提取网页数据，使其成为一个多功能的网页内容检索和预处理工具。

# Input types
## Required
- url_i
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown

## Optional
- html_to_text
    - 一个布尔标志，指示是否将HTML内容转换为纯文本，以便更容易处理和分析网页数据。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- documents
    - 处理后的网页内容，以文档形式返回。这个输出提供了从指定URL提取的数据，可能已转换为文本。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


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
