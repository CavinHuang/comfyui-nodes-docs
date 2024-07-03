
# Documentation
- Class name: LLMVectorStoreIndex
- Category: SALT/Language Toolkit/Indexing
- Output node: False

LLMVectorStoreIndex节点旨在使用语言模型从文档集合中创建索引，生成嵌入向量。这个过程包括对文档进行分词，可选择性地应用元数据，并利用语言模型的嵌入能力来实现文档之间的高效检索和相似度搜索。

# Input types
## Required
- llm_model
    - 指定用于生成嵌入向量的语言模型，在索引过程中起着至关重要的作用，决定了文档的语义表示。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- document
    - 要建立索引的文档集合。每个文档都会被处理以提取文本和可选的元数据，用于嵌入。
    - Comfy dtype: DOCUMENT
    - Python dtype: Sequence[Document]

## Optional
- optional_llm_context
    - 提供给语言模型的可选上下文，允许根据特定需求或场景自定义嵌入过程。
    - Comfy dtype: LLM_CONTEXT
    - Python dtype: Optional[Dict[str, Any]]

# Output types
- llm_index
    - 输出是从文档创建的索引，结构化设计用于高效检索和相似度搜索。
    - Comfy dtype: LLM_INDEX
    - Python dtype: Tuple[VectorStoreIndex]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMVectorStoreIndex:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "document": ("DOCUMENT",),
            },
            "optional": {
                "optional_llm_context": ("LLM_CONTEXT",),
            },
        }

    RETURN_TYPES = ("LLM_INDEX",)
    RETURN_NAMES = ("llm_index",)

    FUNCTION = "index"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Indexing"

    def index(self, llm_model, document, optional_llm_context = None):
        
        #document = cast(Sequence[Document], document) # This could be why documents are not working correctly
        embed_model = llm_model.get("embed_model", None)

        if not embed_model:
            raise ValueError("Unable to determine LLM Embedding Model")
        
        splitter = SentenceSplitter(chunk_size=1024, chunk_overlap=0)
        tokenizer = MockTokenizer(max_tokens=1024, char_per_token=1)

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
