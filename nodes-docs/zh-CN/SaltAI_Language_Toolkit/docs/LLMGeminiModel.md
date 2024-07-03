
# Documentation
- Class name: LLMGeminiModel
- Category: SALT/Language Toolkit/Loaders
- Output node: False

LLMGeminiModel节点旨在加载和管理来自Gemini系列的语言模型，提供使用特定配置和API密钥初始化这些模型的功能。它抽象了设置和使用Gemini语言模型进行各种自然语言处理任务时涉及的复杂性。

# Input types
## Required
- model_name
    - 指定要加载的Gemini模型的名称。这个选择决定了将要使用的语言模型的能力和特性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- api_key
    - 访问Gemini模型所需的API密钥。它对于模型使用的身份验证和授权至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 包含加载的语言模型、其名称以及相关联的嵌入模型及其名称的字典。这个输出便于在各种任务中进一步处理和使用模型。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Union[Gemini, str, HuggingFaceEmbedding]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMGemini:
    """
    @Documentation: https://docs.llamaindex.ai/en/stable/api_reference/llms/gemini/
    @Source: 
    """
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_name": ([
                    "models/gemini-pro",
                    "models/gemini-1.5-pro-latest",
                    "models/gemini-pro-vision",
                    "models/gemini-1.0-pro",					
                    "models/gemini-ultra",
                ],),
                "api_key": ("STRING", {
                    "multiline": False, 
                    "dynamicPrompts": False, 
                    "default": ""
                }),
            },
        }

    RETURN_TYPES = ("LLM_MODEL", )
    RETURN_NAMES = ("model", )

    FUNCTION = "load_model"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Loaders"

    def load_model(self, model_name:str, api_key:str) -> Dict[str, Any]:
        llm = Gemini(model_name=model_name, api_key=api_key)
        embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
        return ({"llm":llm, "llm_name": model_name, "embed_model": embed_model, "embed_name": "bge-small-en-v1.5"},)

```
