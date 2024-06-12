# ∞ Summary Index
## Documentation
- Class name: `LLMSummaryIndex`
- Category: `SALT/Language Toolkit/Indexing`
- Output node: `False`

The LLMSummaryIndex node is designed to facilitate the summarization of documents using a language model. It leverages a summarization model to process and condense the input documents into summaries, aiming to capture the essential information in a concise format.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to be used for summarization, playing a crucial role in determining the quality and style of the generated summaries.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`document`**
    - Represents the input documents to be summarized. The quality of the input directly influences the effectiveness of the summarization.
    - Comfy dtype: `DOCUMENT`
    - Python dtype: `List[Document]`
### Optional
- **`optional_llm_context`**
    - Additional context or parameters for the language model, allowing for customized summary outputs.
    - Comfy dtype: `LLM_CONTEXT`
    - Python dtype: `Dict[str, Any] or None`
## Output types
- **`llm_index`**
    - Comfy dtype: `LLM_INDEX`
    - The summarized output of the documents, providing a structured and easily interpretable representation of the summaries.
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
