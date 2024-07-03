
# Documentation
- Class name: LLMChatEngine
- Category: SALT/Language Toolkit/Querying
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMChatEngine节点支持使用语言模型进行交互式聊天会话，允许用户输入查询并接收文本响应。它根据用户输入来管理聊天引擎的实例化和重置，确保动态且上下文相关的交互。

# Input types
## Required
- llm_index
    - 表示要用于聊天会话的语言学习模型的索引，对于初始化或重置聊天引擎至关重要，以确保准确和上下文相关地生成响应。
    - Comfy dtype: LLM_INDEX
    - Python dtype: int
- query
    - 用户输入的查询字符串，由聊天引擎处理以生成相关的文本响应。这个输入对于推动对话向前发展至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- reset_engine
    - 一个布尔标志，表示是否在处理当前查询之前重置聊天引擎，允许进行没有先前上下文的全新交互。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- string
    - 聊天引擎根据用户查询生成的文本响应。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMChatEngine:
        def __init__(self):
            self.chat_engine = None
            
        @classmethod
        def INPUT_TYPES(cls):
            return {
                "required": {
                    "llm_index": ("LLM_INDEX",),
                    "query": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "Ask a question"}),
                },
                "optional": {
                    "reset_engine": ("BOOLEAN", {"default": False})
                }
            }

        RETURN_TYPES = ("STRING",)
        FUNCTION = "chat"
        CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Querying"

        def chat(self, llm_index, query:str, reset_engine:bool = False) -> str:
            if not self.chat_engine or reset_engine:
                self.chat_engine = llm_index.as_chat_engine()
            response = self.chat_engine.chat(query)
            pprint(response, indent=4)
            return (response.response,)

```
