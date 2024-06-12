# ∞ Query Engine As Tool
## Documentation
- Class name: `LLMQueryEngineAsTool`
- Category: `SALT/Language Toolkit/Querying`
- Output node: `False`

This node serves as a tool for executing queries using a language model, designed to facilitate complex information retrieval and processing tasks. It abstracts the intricacies of querying language models, providing a streamlined interface for users to leverage advanced natural language understanding capabilities.
## Input types
### Required
- **`name`**
    - Specifies the name of the tool, serving as an identifier and descriptor for the query engine.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`description`**
    - Provides a detailed description of the tool's purpose and functionality, offering context and guidance for its use.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`llm_index`**
    - Identifies the specific index or database to be queried, allowing for targeted information retrieval based on the input query.
    - Comfy dtype: `LLM_INDEX`
    - Python dtype: `LLM_INDEX`
## Output types
- **`query_tool`**
    - Comfy dtype: `TOOL`
    - The output of the node, which includes the tool configured for query processing, encapsulating the function and its parameters.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMQueryEngineAsTool:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "name": ("STRING", {"multiline": False, "dynamicPrompts": False, "placeholder": "code"}),
                "description": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "A function that allows you to communicate with a document. Ask a question and this function will find information in the document and generate an answer."}),
                "llm_index": ("LLM_INDEX",),
            },
        }

    RETURN_TYPES = ("TOOL",)
    RETURN_NAMES = ("query_tool",)

    FUNCTION = "return_tool"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Querying"
    
    def return_tool(self, name, description, llm_index):
        def query_engine(query: str) -> str:
            query_components = []
            query_components.append("Analyze the above document carefully to find your answer. If you can't find one, say so.")

            if query:
                if query.strip():
                    query_components.append("user: " + query)
            query_components.append("assistant:")
            pprint(query_components, indent=4)
            query_join = "\n".join(query_components)

            query_engine = llm_index.as_query_engine()
            response = query_engine.query(query_join)
            pprint(response, indent=4)
            return (response.response,)
        tool = {"name": name, "description": description, "function": query_engine}
        return (tool,)

```
