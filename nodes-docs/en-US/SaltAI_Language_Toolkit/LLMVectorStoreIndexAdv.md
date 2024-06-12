---
tags:
- LLM
---

# ∞ Vector Store Index (Adv)
## Documentation
- Class name: `LLMVectorStoreIndexAdv`
- Category: `SALT/Language Toolkit/Indexing`
- Output node: `False`

The LLMVectorStoreIndexAdv node is designed to enhance the efficiency and accuracy of vector storage and indexing operations within large language models. It focuses on advanced techniques for managing vector data, aiming to optimize retrieval and storage processes in a scalable manner.
## Input types
### Required
- **`llm_model`**
    - Specifies the large language model used for embedding generation, playing a crucial role in the indexing process by determining the vector representations of text.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `dict`
- **`document`**
    - The input document(s) to be indexed, where each document's text and optional metadata are processed and transformed into vector embeddings.
    - Comfy dtype: `DOCUMENT`
    - Python dtype: `Sequence[Document]`
### Optional
- **`chunk_size`**
    - Defines the size of text chunks for processing, affecting how documents are split and indexed.
    - Comfy dtype: `COMBO[INT]`
    - Python dtype: `int`
- **`chunk_overlap`**
    - Specifies the overlap between consecutive text chunks, influencing the continuity and coverage of the indexing process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`optional_llm_context`**
    - An optional context parameter that allows for customization of the indexing process based on specific requirements or configurations of the large language model.
    - Comfy dtype: `LLM_CONTEXT`
    - Python dtype: `dict`
## Output types
- **`llm_index`**
    - Comfy dtype: `LLM_INDEX`
    - The output is an index object that facilitates efficient storage and retrieval of vector embeddings, representing the processed documents.
    - Python dtype: `VectorStoreIndex`
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
