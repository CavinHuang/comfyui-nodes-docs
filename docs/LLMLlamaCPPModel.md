
# Documentation
- Class name: LLMLlamaCPPModel
- Category: SALT/Language Toolkit/Loaders
- Output node: False

LLMLlamaCPPModel节点旨在加载和初始化LlamaCPP模型，为自然语言处理任务提供LlamaCPP功能的桥梁。它封装了定位、加载和准备模型使用的过程，包括集成嵌入模型以增强功能。

# Input types
## Required
- model_name
    - 指定要加载的LlamaCPP模型的名称。此名称用于在预定义的可用模型集中定位模型，确保为使用初始化正确的模型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- model
    - 输出一个包含已加载LlamaCPP模型、其名称、相关嵌入模型及其名称的字典，为进一步处理或用于NLP任务做好准备。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMLlamaCPP:
    """
    @Documentation: https://docs.llamaindex.ai/en/stable/api_reference/llms/llama_cpp/
    """
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model_name": (LOCAL_FILES, ), 
            },
        }

    RETURN_TYPES = ("LLM_MODEL", )
    RETURN_NAMES = ("model", )

    FUNCTION = "load_model"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Loaders"

    def load_model(self, model_name: str) -> Dict[str, Any]:
        path = folder_paths.get_full_path('llm', model_name)
        llm = LlamaCPP(model_path=path)
        embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")
        return ({"llm":llm, "llm_name": model_name,"embed_model": embed_model, "embed_name": "BAAI/bge-small-en-v1.5"},)

```
