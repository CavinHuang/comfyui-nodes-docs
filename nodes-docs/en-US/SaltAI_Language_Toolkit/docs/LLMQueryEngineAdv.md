---
tags:
- LLM
---

# ∞ Query Engine (Advanced)
## Documentation
- Class name: `LLMQueryEngineAdv`
- Category: `SALT/Language Toolkit/Querying`
- Output node: `False`

The LLMQueryEngineAdv node is designed to enhance querying capabilities by leveraging language models and embedding models to process and understand complex queries. It integrates advanced settings and post-processing to refine search results based on similarity and relevance.
## Input types
### Required
- **`llm_model`**
    - Represents the language and embedding models used for query processing. It's crucial for understanding and generating responses to the queries.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`llm_index`**
    - The index used for retrieving information, essential for navigating through the data and extracting relevant responses.
    - Comfy dtype: `LLM_INDEX`
    - Python dtype: `VectorStoreIndex | JSONQueryEngine`
### Optional
- **`query`**
    - The user's input query, which is processed to extract information or answer questions based on the data indexed.
    - Comfy dtype: `STRING`
    - Python dtype: `Optional[str]`
- **`llm_message`**
    - A list of messages that can be used to provide additional context or information for the query processing.
    - Comfy dtype: `LIST`
    - Python dtype: `Optional[List[ChatMessage]]`
- **`top_k`**
    - Specifies the number of top results to retrieve, allowing for control over the breadth of the search results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`similarity_cutoff`**
    - A threshold for filtering results based on their similarity score, ensuring relevance of the returned information.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`results`**
    - Comfy dtype: `STRING`
    - The processed query results, returned in a structured format.
    - Python dtype: `Tuple[str]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMQueryEngineAdv:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
                "llm_index": ("LLM_INDEX",),
            },
            "optional": {
                "query": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Type your query here"}),
                "llm_message": ("LIST", {}),
                "top_k": ("INT", {"default": 10}),
                "similarity_cutoff": ("FLOAT", {"default": 0.7}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("results",)

    FUNCTION = "query_engine"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Querying"

    def query_engine(self, llm_model, llm_index, query=None, llm_message=None, top_k=10, similarity_cutoff=0.7):

        model = llm_model['llm']
        embed_model = llm_model.get('embed_model', None)

        Settings.llm = model
        Settings.embed_model = embed_model
        
        if not embed_model:
            raise AttributeError("Unable to determine embed model from provided `LLM_MODEL` input.")

        query_components = []
        
        if llm_message and isinstance(llm_message, list):
            for msg in llm_message:
                if str(msg.content).strip():
                    query_components.append(str(msg.content))
        else:
            query_components.append("Analyze the above document carefully to find your answer. If you can't find one, say so.")

        if query and query.strip():
            query_components.append("user: " + query)

        query_components.append("assistant:")

        pprint(query_components, indent=4)
        query_join = "\n".join(query_components)

        retriever = VectorIndexRetriever(index=llm_index, similarity_top_k=top_k, embed_model=embed_model)
        query_engine = RetrieverQueryEngine(
            retriever=retriever,
            node_postprocessors=[SimilarityPostprocessor(similarity_cutoff=similarity_cutoff)],
        )

        response = query_engine.query(query_join)

        Settings.llm = None
        Settings.embed_model = None

        pprint(response, indent=4)
        return (response.response,)

```
