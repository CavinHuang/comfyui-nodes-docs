
# Documentation
- Class name: LLMComplete
- Category: SALT/Language Toolkit/Querying
- Output node: False

LLMComplete节点旨在使用指定的语言模型基于给定的提示生成文本补全。它抽象了查询语言模型的复杂性，允许轻松集成到需要自然语言处理能力的大型系统中。

# Input types
## Required
- llm_model
    - 指定用于生成文本补全的语言模型。这个参数至关重要，因为它决定了生成文本的语言和知识能力。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- prompt
    - 语言模型基于此输入文本提示生成补全。这个参数对于引导模型的输出朝向所需的上下文或问题至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- completion
    - 基于输入提示和指定语言模型生成的文本补全。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMComplete:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL", ),
                "prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "The circumference of the Earth is"}),
            },
            "optional": {
                #"image_documents": ("DOCUMENT",)
            }
        }

    RETURN_TYPES = ("STRING", )
    RETURN_NAMES = ("completion", )

    FUNCTION = "complete"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Querying"

    def complete(self, llm_model:Dict[str, Any], prompt:str, documents:List[Any] = None) -> str:
        if not documents:
            response = llm_model['llm'].complete(prompt)
        else:
            documents_images = [doc for doc in documents if isinstance(doc, ImageDocument)]
            response = llm_model['llm'].complete(prompt, image_documents=documents_images)
        pprint(response, indent=4)
        return (response.text, )

```
