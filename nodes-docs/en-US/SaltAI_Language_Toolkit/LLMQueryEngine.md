# ∞ Query Engine
## Documentation
- Class name: `LLMQueryEngine`
- Category: `SALT/Language Toolkit/Querying`
- Output node: `False`

The LLMQueryEngine node is designed to process and execute queries using a language model, integrating vector indexing and similarity postprocessing to retrieve relevant responses. It leverages language models to understand and respond to user queries, applying advanced retrieval techniques to ensure the responses are both relevant and contextually appropriate.
## Input types
### Required
- **`llm_model`**
    - Represents the language model and optional embedding model used for processing queries. It's crucial for executing the query as it determines the understanding and generation capabilities of the engine.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`llm_index`**
    - The index used for retrieving vector embeddings, essential for identifying relevant documents or entries based on the query.
    - Comfy dtype: `LLM_INDEX`
    - Python dtype: `VectorIndexRetriever`
### Optional
- **`query`**
    - The user's query input, which is processed by the engine to find relevant information or answers.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`llm_message`**
    - Optional list of messages that can be included in the query context, enhancing the engine's understanding of the user's intent.
    - Comfy dtype: `LIST`
    - Python dtype: `List[Message]`
## Output types
- **`results`**
    - Comfy dtype: `STRING`
    - The processed query response, encapsulating the relevance and context of the information retrieved by the engine.
    - Python dtype: `Tuple[str]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMQueryEngine:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL", ),
                "llm_index": ("LLM_INDEX", ),
            },
            "optional": {
                "query": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Type your query here"}),
                "llm_message": ("LIST", {}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("results",)

    FUNCTION = "query_engine"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Querying"

    def query_engine(self, llm_model, llm_index, query=None, llm_message=None):
        query_components = []
        
        if llm_message and isinstance(llm_message, list):
            for msg in llm_message:
                if str(msg).strip():
                    query_components.append(str(msg))
        else:
            query_components.append("Analyze the above document carefully to find your answer. If you can't find one, say so.")

        if query:
            if query.strip():
                query_components.append("user: " + query)
        query_components.append("assistant:")

        pprint(query_components, indent=4)

        query_join = "\n".join(query_components)

        query_engine = llm_index.as_query_engine(llm=llm_model.get("llm", None), embed_model=llm_model.get("embed_model", None))
        response = query_engine.query(query_join)
        pprint(response, indent=4)
        return (response.response,)

```
