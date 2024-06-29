# ∞ Vector Store Index
## Documentation
- Class name: `LLMVectorStoreIndex`
- Category: `SALT/Language Toolkit/Indexing`
- Output node: `False`

The LLMVectorStoreIndex node is designed to create an index from a collection of documents using a language model to generate embeddings. This process involves tokenizing the documents, optionally applying metadata, and leveraging the language model's embedding capabilities to facilitate efficient retrieval and similarity searches among the documents.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to be used for generating embeddings, playing a crucial role in the indexing process by determining the semantic representation of the documents.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`document`**
    - The collection of documents to be indexed. Each document is processed to extract text and optional metadata for embedding.
    - Comfy dtype: `DOCUMENT`
    - Python dtype: `Sequence[Document]`
### Optional
- **`optional_llm_context`**
    - An optional context provided to the language model, allowing for customization of the embedding process based on specific requirements or contexts.
    - Comfy dtype: `LLM_CONTEXT`
    - Python dtype: `Optional[Dict[str, Any]]`
## Output types
- **`llm_index`**
    - Comfy dtype: `LLM_INDEX`
    - The output is an index created from the documents, structured for efficient retrieval and similarity searches.
    - Python dtype: `Tuple[VectorStoreIndex]`
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
