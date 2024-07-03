
# Documentation
- Class name: LLMQueryEngineAsTool
- Category: SALT/Language Toolkit/Querying
- Output node: False

该节点作为一种工具，用于使用语言模型执行查询，旨在促进复杂的信息检索和处理任务。它抽象了查询语言模型的复杂性，为用户提供了一个简化的接口，以利用先进的自然语言理解能力。

# Input types
## Required
- name
    - 指定工具的名称，作为查询引擎的标识符和描述符。
    - Comfy dtype: STRING
    - Python dtype: str
- description
    - 提供工具用途和功能的详细描述，为其使用提供背景和指导。
    - Comfy dtype: STRING
    - Python dtype: str
- llm_index
    - 标识要查询的特定索引或数据库，允许基于输入查询进行有针对性的信息检索。
    - Comfy dtype: LLM_INDEX
    - Python dtype: LLM_INDEX

# Output types
- query_tool
    - 节点的输出，包括配置用于查询处理的工具，封装了函数及其参数。
    - Comfy dtype: TOOL
    - Python dtype: Dict[str, Any]


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
