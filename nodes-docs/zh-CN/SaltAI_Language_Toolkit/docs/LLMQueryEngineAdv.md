
# Documentation
- Class name: LLMQueryEngineAdv
- Category: SALT/Language Toolkit/Querying
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMQueryEngineAdv节点旨在通过利用语言模型和嵌入模型来处理和理解复杂查询，从而增强查询能力。它集成了高级设置和后处理功能，以基于相似度和相关性来优化搜索结果。

# Input types
## Required
- llm_model
    - 代表用于查询处理的语言和嵌入模型。对于理解查询并生成回应至关重要。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- llm_index
    - 用于检索信息的索引，对于在数据中导航并提取相关回应至关重要。
    - Comfy dtype: LLM_INDEX
    - Python dtype: VectorStoreIndex | JSONQueryEngine
## Optional
- query
    - 用户的输入查询，根据索引的数据进行处理以提取信息或回答问题。
    - Comfy dtype: STRING
    - Python dtype: Optional[str]
- llm_message
    - 一系列消息，可用于为查询处理提供额外的上下文或信息。
    - Comfy dtype: LIST
    - Python dtype: Optional[List[ChatMessage]]
- top_k
    - 指定要检索的顶部结果数量，允许控制搜索结果的广度。
    - Comfy dtype: INT
    - Python dtype: int
- similarity_cutoff
    - 基于相似度分数过滤结果的阈值，确保返回信息的相关性。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- results
    - 经过处理的查询结果，以结构化格式返回。
    - Comfy dtype: STRING
    - Python dtype: Tuple[str]


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
