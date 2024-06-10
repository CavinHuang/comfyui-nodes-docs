---
tags:
- LLM
- LLMChat
---

# OpenAI Api
## Documentation
- Class name: `AV_OpenAIApi`
- Category: `ArtVenture/LLM`
- Output node: `False`

The AV_OpenAIApi node is designed to facilitate interaction with OpenAI's API, enabling the creation and management of API calls for various language model tasks. It abstracts the complexity of direct API communication, providing a streamlined interface for accessing OpenAI's language models.
## Input types
### Required
- **`openai_api_key`**
    - The OpenAI API key is essential for authenticating requests to OpenAI's services, allowing the node to perform API calls.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`endpoint`**
    - The API endpoint URL specifies the base address for OpenAI's API calls, with a default value pointing to OpenAI's standard API endpoint.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`llm_api`**
    - Comfy dtype: `LLM_API`
    - Returns an instance configured for interacting with OpenAI's API, encapsulating the necessary details for making language model requests.
    - Python dtype: `Union[OpenAIApi, ClaudeApi]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OpenAIApiNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "openai_api_key": ("STRING", {"multiline": False}),
                "endpoint": ("STRING", {"multiline": False, "default": "https://api.openai.com/v1"}),
            },
        }

    RETURN_TYPES = ("LLM_API",)
    FUNCTION = "create_api"
    CATEGORY = "ArtVenture/LLM"

    def create_api(self, openai_api_key, endpoint):
        if not openai_api_key or openai_api_key == "":
            openai_api_key = os.environ.get("OPENAI_API_KEY")
        if not openai_api_key:
            raise Exception("OpenAI API key is required.")

        return (OpenAIApi(api_key=openai_api_key, endpoint=endpoint),)

```
