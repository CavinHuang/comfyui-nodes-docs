
# Documentation
- Class name: LLMTrafilaturaWebReaderAdv
- Category: SALT/Language Toolkit/Readers
- Output node: False
- Repo Ref: https://github.com/jbikker/ComfyUI-SALT

LLMTrafilaturaWebReaderAdv节点是一个高级的网页内容提取工具。它利用Trafilatura库高效地解析和获取一系列URL中的文档。该节点主要专注于验证URL并将网页内容提取为结构化的文档格式，以便进行后续处理或分析。

# Input types
## Required
- urls
    - urls参数是一个URL列表，节点将尝试从这些URL中提取网页内容。这个参数对于定义节点将要处理的信息源至关重要。
    - Comfy dtype: LIST
    - Python dtype: List[str]

# Output types
- documents
    - documents输出是以文档形式结构化的提取网页内容。对于需要从提供的URL中获取已处理和可访问信息的用户来说，这个输出至关重要。
    - Comfy dtype: DOCUMENT
    - Python dtype: Tuple[List[Dict[str, Any]],]


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
