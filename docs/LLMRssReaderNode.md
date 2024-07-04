
# Documentation
- Class name: LLMRssReaderNode
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMRssReaderNode是一个专门设计用于获取和解析RSS源的节点。它能够从指定的URL中提取新闻或博客内容，并将其转换为结构化格式，便于后续的处理和分析。这个节点在信息采集和内容聚合方面发挥着重要作用，为用户提供了一种高效的方式来获取和组织来自不同来源的最新信息。

# Input types
## Required
- url_i
    - 这是读取RSS源的主要URL。它是启动读取过程所必需的输入参数，决定了节点将从哪个网址获取RSS信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 输出的documents是从RSS源中提取并结构化处理后的文档。这些文档已经准备就绪，可以直接用于下游的处理或分析任务。
    - Comfy dtype: DOCUMENT
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMRssReaderNode:
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

    FUNCTION = "read_rss"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def read_rss(self, url_1, url_2=None, url_3=None, url_4=None):
        if not url_1.strip():
            raise ValueError("At least one URL must be provided to LLMSimpleWebPageReader")

        urls = [url_1.strip()]
        if url_2.strip():
            urls.append(url_2.strip())
        if url_3.strip():
            urls.append(url_3.strip())
        if url_4.strip():
            urls.append(url_4.strip())

        urls = [url for url in urls if valid_url(url)]

        print("Valided URLs:", urls)

        documents = RssReader().load_data(urls)
        return (documents,)

```
