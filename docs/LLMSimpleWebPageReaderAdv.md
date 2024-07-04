
# Documentation
- Class name: LLMSimpleWebPageReaderAdv
- Category: SALT/Language Toolkit/Readers
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMSimpleWebPageReaderAdv节点用于从URL列表中获取并处理网页，将其转换为结构化文档格式。它可以选择将HTML内容转换为纯文本，便于从网页中提取可读内容以供进一步分析或处理。

# Input types
## Required
- urls
    - 一个URL列表，用于获取网页内容。这是驱动节点操作的主要输入，决定了要处理的网页。
    - Comfy dtype: LIST
    - Python dtype: List[str]
## Optional
- html_to_text
    - 一个布尔标志，指示是否将HTML内容转换为纯文本。这会影响网页的处理过程，去除HTML标签，只保留可读文本。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- documents
    - 结构化文档格式的输出，包含从获取的网页中处理得到的内容。
    - Comfy dtype: DOCUMENT
    - Python dtype: Tuple[Document]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMSimpleWebPageReaderAdv:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "urls": ("LIST", {}),
            },
            "optional": {
                "html_to_text": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "read_web"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def read_web(self, urls, html_to_text=True):

        if not urls:
            raise ValueError("At least one URL must be provided to LLMSimpleWebPageReaderAdv")

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
