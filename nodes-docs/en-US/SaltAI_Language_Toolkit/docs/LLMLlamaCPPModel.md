---
tags:
- LoRA
---

# ∞ LlamaCPP Model
## Documentation
- Class name: `LLMLlamaCPPModel`
- Category: `SALT/Language Toolkit/Loaders`
- Output node: `False`

The LLMLlamaCPPModel node is designed to load and initialize LlamaCPP models, providing a bridge to leverage the capabilities of LlamaCPP for natural language processing tasks. It encapsulates the process of locating, loading, and preparing the model for use, including the integration of an embedding model for enhanced functionality.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the LlamaCPP model to be loaded. This name is used to locate the model within a predefined set of available models, ensuring the correct model is initialized for use.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `LLM_MODEL`
    - Outputs a dictionary containing the loaded LlamaCPP model, its name, the associated embedding model, and the embedding model's name, ready for further processing or use in NLP tasks.
    - Python dtype: `Dict[str, Any]`
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
