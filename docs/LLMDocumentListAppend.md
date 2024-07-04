
# Documentation
- Class name: LLMDocumentListAppend
- Category: SALT/Language Toolkit/Documents
- Output node: False

LLMDocumentListAppend节点旨在将一个文档列表附加到现有的文档列表中，并可选择性地用额外信息更新它们的元数据。它促进了文档集合的动态扩展，允许从多个来源汇总数据。

# Input types
## Required
- llm_documents
    - 表示将要附加新文档的初始文档列表。它在节点操作中起着至关重要的作用，作为汇总的基础集合。
    - Comfy dtype: DOCUMENT
    - Python dtype: List[Document]
- append_llm_documents
    - 要附加到现有列表的新文档列表。这个参数对于用新条目扩展文档集合至关重要。
    - Comfy dtype: DOCUMENT
    - Python dtype: List[Document]

## Optional
- extra_info
    - 一个包含额外元数据的JSON字符串，将被合并到正在附加的文档的元数据中。这允许丰富文档数据。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 在附加新文档并可选择性地更新其元数据后，返回更新后的文档列表。
    - Comfy dtype: DOCUMENT
    - Python dtype: List[Document]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMDocumentListAppend:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_documents": ("DOCUMENT",),
                "append_llm_documents": ("DOCUMENT",),
            },
            "optional": {
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT",)
    RETURN_NAMES = ("documents",)

    FUNCTION = "document_append"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Documents"

    def document_append(self, llm_documents, append_llm_documents, extra_info={}):
        extra_info = json.loads(extra_info)
        for doc in append_llm_documents:
            if isinstance(doc.metadata, dict):
                doc.metadata.update(extra_info)
            elif doc.metadata == None:
                doc.metadata = extra_info
            llm_documents.append(doc)
        return (llm_documents, )

```
