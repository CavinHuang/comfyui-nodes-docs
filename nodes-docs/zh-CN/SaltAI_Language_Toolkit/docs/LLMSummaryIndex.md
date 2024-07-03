
# Documentation
- Class name: `LLMSummaryIndex`
- Category: `SALT/Language Toolkit/Indexing`
- Output node: `False`

LLMSummaryIndex节点旨在利用语言模型对文档进行摘要。它通过使用摘要模型来处理和浓缩输入文档，目标是以简洁的格式捕捉关键信息。

# Input types
## Required
- **`llm_model`**
    - 指定用于摘要的语言模型，对生成摘要的质量和风格起着关键作用。
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`document`**
    - 表示需要进行摘要的输入文档。输入质量直接影响摘要的效果。
    - Comfy dtype: `DOCUMENT`
    - Python dtype: `List[Document]`
## Optional
- **`optional_llm_context`**
    - 为语言模型提供额外的上下文或参数，允许自定义摘要输出。
    - Comfy dtype: `LLM_CONTEXT`
    - Python dtype: `Dict[str, Any] or None`

# Output types
- **`llm_index`**
    - 文档的摘要输出，提供了结构化且易于理解的摘要表示。
    - Comfy dtype: `LLM_INDEX`
    - Python dtype: `SummaryIndex`


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMSummaryIndex:
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

    def index(self, llm_model, document, optional_llm_context=None):

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

        index = SummaryIndex.from_documents(
            documents, 
            embed_model=embed_model, 
            service_context=optional_llm_context or None,
            transformations=[splitter]
            )
        return (index,)

```
