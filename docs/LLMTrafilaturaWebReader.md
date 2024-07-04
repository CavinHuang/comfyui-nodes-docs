
# Documentation
- Class name: LLMTrafilaturaWebReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMTrafilaturaWebReader节点旨在使用Trafilatura库从网页中提取并读取内容。它可以处理最多四个URL以检索文本数据，从而以结构化格式便捷地获取网页内容。

# Input types
## Required
- url_i
    - 用于提取内容的URL。此参数对节点的操作至关重要，因为它定义了内容提取的起点。该节点可以处理多达四个URL（url_1到url_4），允许在单个操作中从多个网页提取内容。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 从指定网页提取的内容，以结构化文档的形式返回。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


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
