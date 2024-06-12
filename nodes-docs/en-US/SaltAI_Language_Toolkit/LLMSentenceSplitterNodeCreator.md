---
tags:
- LLM
---

# ∞ Setence Splitter Node Creator
## Documentation
- Class name: `LLMSentenceSplitterNodeCreator`
- Category: `SALT/Language Toolkit/Tools`
- Output node: `False`

This node is designed to split a given document into smaller, manageable nodes based on sentence boundaries. It utilizes customizable chunk sizes and overlaps to ensure comprehensive coverage and continuity across the document, facilitating further processing or analysis.
## Input types
### Required
- **`document`**
    - The primary text document to be split into smaller nodes. It serves as the foundational input for the node's operation, dictating the scope and granularity of the splitting process.
    - Comfy dtype: `DOCUMENT`
    - Python dtype: `str`
### Optional
- **`chunk_size`**
    - Specifies the maximum size of each chunk or node created from the document, allowing for control over the granularity of the splitting process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`chunk_overlap`**
    - Determines the amount of overlap between consecutive chunks or nodes, ensuring continuity and context preservation across splits.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`llm_nodes`**
    - Comfy dtype: `LLM_NODES`
    - The output is a collection of smaller, sentence-based nodes derived from the original document, ready for further processing or analysis.
    - Python dtype: `tuple`
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
