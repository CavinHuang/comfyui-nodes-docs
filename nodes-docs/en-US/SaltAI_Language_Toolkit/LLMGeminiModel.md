# ∞ Gemini Model
## Documentation
- Class name: `LLMGeminiModel`
- Category: `SALT/Language Toolkit/Loaders`
- Output node: `False`

The LLMGeminiModel node is designed to load and manage language models from the Gemini suite, providing functionalities to initialize these models with specific configurations and API keys. It abstracts the complexities involved in setting up and utilizing Gemini's language models for various natural language processing tasks.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the Gemini model to be loaded. This selection determines the capabilities and features of the language model that will be utilized.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`api_key`**
    - The API key required for accessing the Gemini model. It is essential for authenticating and authorizing the model usage.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `LLM_MODEL`
    - A dictionary containing the loaded language model, its name, and an associated embedding model with its name. This output facilitates further processing and utilization of the model in various tasks.
    - Python dtype: `Dict[str, Union[Gemini, str, HuggingFaceEmbedding]]`
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
