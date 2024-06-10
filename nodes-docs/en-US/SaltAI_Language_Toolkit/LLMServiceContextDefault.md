# ∞ Service Context
## Documentation
- Class name: `LLMServiceContextDefault`
- Category: `SALT/Language Toolkit/Context`
- Output node: `False`

This node is designed to generate a service context for language model operations, encapsulating the necessary configurations and settings to facilitate interaction with language models.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model and its embedding model to be used, dictating the operational context for subsequent language processing tasks.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
## Output types
- **`llm_context`**
    - Comfy dtype: `LLM_CONTEXT`
    - Provides the generated service context, enabling tailored interactions with the specified language model.
    - Python dtype: `Tuple[ServiceContext]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMServiceContextDefault:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL",),
            },
        }

    RETURN_TYPES = ("LLM_CONTEXT",)
    RETURN_NAMES = ("llm_context",)

    FUNCTION = "context"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Context"

    def context(self, llm_model: Dict[str, Any]):
        service_context = ServiceContext.from_defaults(
            llm=llm_model['llm'],
            embed_model=llm_model['embed_model'],
        )
        return (service_context,)

```
