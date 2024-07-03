
# Documentation
- Class name: LLMQueryEngine
- Category: SALT/Language Toolkit/Querying
- Output node: False

LLMQueryEngine节点旨在使用语言模型处理和执行查询，结合向量索引和相似度后处理来检索相关响应。它利用语言模型来理解和回应用户查询，应用先进的检索技术以确保响应既相关又符合上下文。

# Input types
## Required
- llm_model
    - 代表用于处理查询的语言模型和可选的嵌入模型。它对执行查询至关重要，因为它决定了引擎的理解和生成能力。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- llm_index
    - 用于检索向量嵌入的索引，对于根据查询识别相关文档或条目至关重要。
    - Comfy dtype: LLM_INDEX
    - Python dtype: VectorIndexRetriever
## Optional
- query
    - 用户的查询输入，由引擎处理以查找相关信息或答案。
    - Comfy dtype: STRING
    - Python dtype: str
- llm_message
    - 可选的消息列表，可以包含在查询上下文中，增强引擎对用户意图的理解。
    - Comfy dtype: LIST
    - Python dtype: List[Message]

# Output types
- results
    - 处理后的查询响应，封装了引擎检索到的信息的相关性和上下文。
    - Comfy dtype: STRING
    - Python dtype: Tuple[str]


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
