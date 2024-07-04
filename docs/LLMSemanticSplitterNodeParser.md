
# Documentation
- Class name: LLMSemanticSplitterNodeParser
- Category: SALT/Language Toolkit/Parsing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMSemanticSplitterNodeParser节点旨在利用指定的语言模型对文档进行语义分析和解析。它可以选择性地进行句子分割、元数据包含以及相邻元素之间的关系分析。通过利用深度学习模型来识别和组织语义成分，该节点致力于增强对文本的理解和结构化处理。

# Input types
## Required
- document
    - 待解析的主要文本文档。它是进行语义分析和结构化处理的核心输入。
    - Comfy dtype: DOCUMENT
    - Python dtype: str
- llm_embed_model
    - 用于生成嵌入的语言模型，对语义解析过程至关重要。
    - Comfy dtype: LLM_EMBED_MODEL
    - Python dtype: object
## Optional
- buffer_size
    - 决定处理缓冲区的大小，影响解析的粒度，可能会影响性能。
    - Comfy dtype: INT
    - Python dtype: int
- sentence_splitter
    - 可选的句子分割模型或方法，用于提高语义解析的准确性。
    - Comfy dtype: LLM_SENTENCE_SPLITTER
    - Python dtype: object
- include_metadata
    - 是否在解析过程中包含元数据，用于丰富对文档的语义理解。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- include_prev_next_rel
    - 是否分析并包含相邻元素之间的关系，用于深入洞察文档结构。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- llm_node_parser
    - 语义解析过程的结果，其结构反映了在文档中识别出的语义成分和关系。
    - Comfy dtype: LLM_NODE_PARSER
    - Python dtype: object


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
