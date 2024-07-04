
# Documentation
- Class name: LLMMistralAI
- Category: SALT/Language Toolkit/Loaders
- Output node: False

LLMMistralAI节点旨在加载和初始化来自MistralAI套件的语言模型，提供一个接口以利用其自然语言处理任务的能力。它封装了与MistralAI API进行身份验证的过程，并为使用做好准备，包括用于增强功能的嵌入模型。

# Input types
## Required
- model_name
    - 指定要加载的MistralAI模型的名称。此选择决定了将用于处理任务的特定语言模型及其功能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- api_key
    - 用于与MistralAI服务进行身份验证所需的API密钥。此密钥允许访问模型加载功能，确保安全和授权使用MistralAI的资源。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 输出加载的MistralAI语言模型以及嵌入模型，封装在一个结构中，准备集成到自然语言处理任务中。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Tuple[Dict[str, Any]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMMistralAI:
    """
    @Documentation: https://docs.llamaindex.ai/en/stable/api_reference/llms/mistralai/
    """
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_name": ([
                    "open-mistral-7b",
                    "open-mixtral-8x7b",
                    "mistral-small-latest",
                    "mistral-medium-latest",
                    "mistral-large-latest",
                ],),
                "api_key": ("STRING", {
                    "multiline": False, 
                    "dynamicPrompts": False, 
                    "default": os.environ.get("MISTRAL_API_KEY", "")
                }),
            },
        }

    RETURN_TYPES = ("LLM_MODEL", )
    RETURN_NAMES = ("model", )

    FUNCTION = "load_model"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Loaders"

    def load_model(self, model_name:str, api_key:str) -> Dict[str, Any]:
        llm = MistralAI(model_name=model_name, api_key=api_key)
        embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
        return ({"llm":llm, "embed_model":embed_model},)

```
