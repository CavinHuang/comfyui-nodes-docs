
# Documentation
- Class name: LLMVectorStoreIndexAdv
- Category: SALT/Language Toolkit/Indexing
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMVectorStoreIndexAdv节点旨在优化大型语言模型中的向量存储和索引操作。它采用先进技术管理向量数据，目标是以可扩展的方式提升检索和存储过程的效率。

# Input types
## Required
- llm_model
    - 指定用于生成嵌入的大型语言模型，通过决定文本的向量表示，在索引过程中扮演关键角色。
    - Comfy dtype: LLM_MODEL
    - Python dtype: dict
- document
    - 待索引的输入文档，每个文档的文本和可选元数据都会被处理并转换为向量嵌入。
    - Comfy dtype: DOCUMENT
    - Python dtype: Sequence[Document]

## Optional
- chunk_size
    - 定义文本处理的分块大小，影响文档的分割和索引方式。
    - Comfy dtype: COMBO[INT]
    - Python dtype: int
- chunk_overlap
    - 指定连续文本块之间的重叠部分，影响索引过程的连续性和覆盖范围。
    - Comfy dtype: INT
    - Python dtype: int
- optional_llm_context
    - 可选的上下文参数，允许根据大型语言模型的特定需求或配置来自定义索引过程。
    - Comfy dtype: LLM_CONTEXT
    - Python dtype: dict

# Output types
- llm_index
    - 输出是一个索引对象，它能够高效存储和检索向量嵌入，代表已处理的文档。
    - Comfy dtype: LLM_INDEX
    - Python dtype: VectorStoreIndex


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMVectorStoreIndexAdv:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "document": ("DOCUMENT",),
            },
            "optional": {
                "chunk_size": ([128, 256, 512, 1024, 2048],),
                "chunk_overlap": ("INT", {"min": 0, "max": 512, "default": 0}),
                "optional_llm_context": ("LLM_CONTEXT",)
            },
        }

    RETURN_TYPES = ("LLM_INDEX",)
    RETURN_NAMES = ("llm_index",)

    FUNCTION = "index"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Indexing"

    def index(self, llm_model, document, chunk_size=1024, chunk_overlap=0, optional_llm_context=None):
        
        embed_model = llm_model.get("embed_model", None)
        
        if not embed_model:
            raise ValueError("Unable to determine LLM Embedding Model")

        splitter = SentenceSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
        tokenizer = MockTokenizer(max_tokens=chunk_size, char_per_token=1)

        documents = []
        for doc in document:
            print(doc)
            metadata = {}
            text = doc.text
            if doc.metadata:
                metadata = doc.metadata
                token_count = tokenizer.count(metadata)
                if token_count > 1024:
                    metadata = tokenizer.truncate(metadata)
            documents.append(Document(text=text, extra_info=metadata))
        
        index = VectorStoreIndex.from_documents(
            documents, 
            embed_model=embed_model,
            service_context=optional_llm_context,
            transformations=[splitter]
        )
        
        return (index,)

```
