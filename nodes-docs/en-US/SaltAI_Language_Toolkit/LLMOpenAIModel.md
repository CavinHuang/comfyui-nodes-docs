---
tags:
- LoRA
---

# ∞ OpenAI Model
## Documentation
- Class name: `LLMOpenAIModel`
- Category: `SALT/Language Toolkit/Loaders`
- Output node: `False`

This node facilitates the integration and utilization of OpenAI's language models, enabling the loading and embedding of models for various applications such as text generation, analysis, and more. It abstracts the complexity of directly interacting with OpenAI's API, providing a streamlined interface for embedding and model management.
## Input types
### Required
- **`model`**
    - Specifies the OpenAI model to be loaded. This selection determines the capabilities and performance of the language model in use.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`api_key`**
    - The API key required for authenticating requests to OpenAI's services. It ensures secure access to the model loading functionality.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`embedding_model`**
    - Defines the specific embedding model to be used alongside the primary language model, enhancing its functionality with additional text embedding capabilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`multimodal`**
    - A boolean flag indicating whether the model to be loaded should support multimodal inputs, allowing for a broader range of input types beyond text.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`llm_model`**
    - Comfy dtype: `LLM_MODEL`
    - Returns the primary language model loaded, including its configuration and capabilities, ready for various applications.
    - Python dtype: `Dict[str, Any]`
- **`embed_model_only`**
    - Comfy dtype: `LLM_EMBED_MODEL`
    - Provides the embedding model loaded separately, detailing its specific features and how it complements the primary language model.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMOpenAI:
    """
    @Documentation: https://docs.llamaindex.ai/en/stable/api_reference/llms/openai/
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": (list(ALL_AVAILABLE_MODELS),),
                "api_key": ("STRING", {
                    "multiline": False, 
                    "dynamicPrompts": False, 
                    "default": os.environ.get("OPENAI_API_KEY", "")
                }),
                "embedding_model": (
                    sorted([x.value for x in OpenAIEmbeddingModelType]),
                    {"default": "text-embedding-ada-002"},
                ),
            },
            "optional": {
                "multimodal": ("BOOLEAN", {"default": False})
            }
        }

    RETURN_TYPES = ("LLM_MODEL", "LLM_EMBED_MODEL")
    RETURN_NAMES = ("llm_model", "embed_model_only")

    FUNCTION = "load_model"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Loaders"

    def load_model(self, model:str, embedding_model:str, api_key:str, multimodal:bool = False) -> Dict[str, Any]:
        llm = OpenAI(model=model) if not multimodal else OpenAIMultiModal(model=model)
        llm.api_key = api_key
        embed_model = OpenAIEmbedding(model_name=embedding_model, api_key=api_key,)
        return ({"llm":llm, "llm_name": model, "embed_model":embed_model, "embed_name": embedding_model}, {"embed_model": embed_model, "embed_name": embedding_model})

```
