
# Documentation
- Class name: LLMSentenceSplitterNodeCreator
- Category: SALT/Language Toolkit/Tools
- Output node: False

该节点旨在将给定文档按句子边界分割成更小、更易管理的节点。它利用可自定义的分块大小和重叠度，确保对整个文档的全面覆盖和连续性，从而便于进一步处理或分析。

# Input types
## Required
- document
    - 需要被分割成更小节点的主要文本文档。它作为节点操作的基础输入，决定了分割过程的范围和粒度。
    - Comfy dtype: DOCUMENT
    - Python dtype: str

## Optional
- chunk_size
    - 指定从文档创建的每个分块或节点的最大大小，允许控制分割过程的粒度。
    - Comfy dtype: INT
    - Python dtype: int
- chunk_overlap
    - 决定连续分块或节点之间的重叠量，确保跨分割保持连续性和上下文。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- llm_nodes
    - 输出是从原始文档中派生出的较小的、基于句子的节点集合，可供进一步处理或分析。
    - Comfy dtype: LLM_NODES
    - Python dtype: tuple


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMSentenceSplitterNodeCreator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "document": ("DOCUMENT",),
            },
            "optional": {
                "chunk_size": ("INT", {"default": 1024, "min": 1}),
                "chunk_overlap": ("INT", {"default": 20, "min": 0}),
            },
        }

    RETURN_TYPES = ("LLM_NODES",)
    RETURN_NAMES = ("llm_nodes",)

    FUNCTION = "create_nodes"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools"

    def create_nodes(self, document, chunk_size=1024, chunk_overlap=20):
        node_parser = SentenceSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        nodes = node_parser.get_nodes_from_documents(document, show_progress=False)        
        return (nodes,)

```
