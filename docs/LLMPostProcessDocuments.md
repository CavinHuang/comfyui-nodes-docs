
# Documentation
- Class name: LLMPostProcessDocuments
- Category: SALT/Language Toolkit/Tools
- Output node: False

LLMPostProcessDocuments节点旨在根据指定的关键词精炼和过滤文档集合。它允许包含含有特定必需关键词的文档，同时排除那些含有指定不需要关键词的文档，从而有效地根据用户定义的标准调整文档集。

# Input types
## Required
- document
    - 表示要处理的文档集合。它是节点操作的主要数据，根据指定关键词的存在与否来决定保留哪些文档。
    - Comfy dtype: DOCUMENT
    - Python dtype: List[Document]

## Optional
- required_keywords
    - 以逗号分隔的关键词列表，文档必须包含这些关键词才能被纳入输出。此参数能够将文档过滤为符合特定标准的相关文档。
    - Comfy dtype: STRING
    - Python dtype: str
- exclude_keywords
    - 以逗号分隔的关键词列表，如果文档中包含这些关键词，将被排除在输出之外。此参数有助于删除包含不需要内容的文档。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 经过处理的文档集合，只包含匹配所需关键词且不包含任何排除关键词的文档。
    - Comfy dtype: DOCUMENT
    - Python dtype: List[Document]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMPostProcessDocuments:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "document": ("DOCUMENT",),
            },
            "optional": {
                "required_keywords": ("STRING", {}),
                "exclude_keywords": ("STRING", {}),
            },
        }

    RETURN_TYPES = ("DOCUMENT",)
    RETURN_NAMES = ("documents",)

    FUNCTION = "process_documents"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools"

    def process_documents(self, document, required_keywords=[], exclude_keywords=[]):

        if required_keywords.strip():
            required = [ext.strip() for ext in required_keywords.split(",") if ext.strip()]
        else:
            required = None

        if exclude_keywords.strip():
            excluded = [pattern.strip() for pattern in exclude_keywords.split(",") if pattern.strip()]
        else:
            excluded = None

        if required or excluded:
            document = [doc for doc in document if not set(required).isdisjoint(doc.keywords) and set(excluded).isdisjoint(doc.keywords)]

        return (document,)

```
