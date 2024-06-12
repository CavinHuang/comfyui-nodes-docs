---
tags:
- LLM
---

# ∞ Semantics Splitter Node Parser
## Documentation
- Class name: `LLMSemanticSplitterNodeParser`
- Category: `SALT/Language Toolkit/Parsing`
- Output node: `False`

This node is designed to parse documents semantically using a specified language model for embeddings, optionally incorporating sentence splitting, metadata inclusion, and relationship analysis between sequential elements. It aims to enhance the understanding and structuring of text by leveraging deep learning models to identify and organize semantic components.
## Input types
### Required
- **`document`**
    - The primary text document to be parsed. It serves as the core input for semantic analysis and structuring.
    - Comfy dtype: `DOCUMENT`
    - Python dtype: `str`
- **`llm_embed_model`**
    - The language model used for generating embeddings, which is crucial for the semantic parsing process.
    - Comfy dtype: `LLM_EMBED_MODEL`
    - Python dtype: `object`
### Optional
- **`buffer_size`**
    - Determines the size of the processing buffer, affecting the granularity of parsing and potentially the performance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sentence_splitter`**
    - An optional model or method for splitting the document into sentences, enhancing the semantic parsing accuracy.
    - Comfy dtype: `LLM_SENTENCE_SPLITTER`
    - Python dtype: `object`
- **`include_metadata`**
    - Flag to include metadata in the parsing process, enriching the semantic understanding of the document.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`include_prev_next_rel`**
    - Flag to analyze and include the relationships between sequential elements, offering deeper insights into the document structure.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`llm_node_parser`**
    - Comfy dtype: `LLM_NODE_PARSER`
    - The result of the semantic parsing process, structured to reflect the semantic components and relationships identified within the document.
    - Python dtype: `object`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMSemanticSplitterNodeParser:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "document": ("DOCUMENT",),
                "llm_embed_model": ("LLM_EMBED_MODEL",),
            },
            "optional": {
                "buffer_size": ("INT", {"default": 1, "min": 1}),
                "sentence_splitter": ("LLM_SENTENCE_SPLITTER",),
                "include_metadata": ("BOOLEAN", {"default": True}),
                "include_prev_next_rel": ("BOOLEAN", {"default": True}),
            },
        }

    RETURN_TYPES = ("LLM_NODE_PARSER",)
    RETURN_NAMES = ("llm_node_parser",)

    FUNCTION = "semantic_nodes"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Parsing"

    def semantic_nodes(self, document, llm_embed_model, buffer_size=1, sentence_splitter=None, include_metadata=True, include_prev_next_rel=True):
        parser = SemanticSplitterNodeParser(
            embed_model=llm_embed_model,
            buffer_size=buffer_size,
            sentence_splitter=sentence_splitter,
            include_metadata=include_metadata,
            include_prev_next_rel=include_prev_next_rel,
        )
        return (parser.build_semantic_nodes_from_documents(document, show_progress=True), )

```
