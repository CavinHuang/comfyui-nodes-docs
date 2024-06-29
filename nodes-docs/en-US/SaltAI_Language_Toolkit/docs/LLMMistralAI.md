# ∞ MistralAI Model
## Documentation
- Class name: `LLMMistralAI`
- Category: `SALT/Language Toolkit/Loaders`
- Output node: `False`

The LLMMistralAI node is designed to load and initialize language models from the MistralAI suite, providing an interface to leverage their capabilities for natural language processing tasks. It encapsulates the process of authenticating with the MistralAI API and preparing the model for use, including embedding models for enhanced functionality.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the MistralAI model to be loaded. This selection determines the specific language model and its capabilities that will be utilized for processing tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`api_key`**
    - The API key required for authenticating with the MistralAI service. This key enables access to the model loading functionality, ensuring secure and authorized use of MistralAI's resources.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `LLM_MODEL`
    - Outputs the loaded MistralAI language model along with an embedding model, encapsulated in a structure ready for integration into natural language processing tasks.
    - Python dtype: `Tuple[Dict[str, Any]]`
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
