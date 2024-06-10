---
tags:
- LLM
- LLMChat
---

# Claude Api
## Documentation
- Class name: `AV_ClaudeApi`
- Category: `ArtVenture/LLM`
- Output node: `False`

The AV_ClaudeApi node facilitates the creation of an API interface for interacting with Claude's language model, enabling the configuration and utilization of Claude's AI capabilities through specified API keys, endpoints, and version information.
## Input types
### Required
- **`claude_api_key`**
    - The API key for Claude's service, essential for authenticating and gaining access to the language model's capabilities.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`endpoint`**
    - The URL endpoint for Claude's API, allowing for the specification of the base path for API requests. Defaults to the official Claude API endpoint if not provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`version`**
    - The version of Claude's API to use, enabling control over which features or improvements are accessible. Defaults to the latest version supported by the node.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`llm_api`**
    - Comfy dtype: `LLM_API`
    - Provides an interface to Claude's language model, encapsulating the API key, endpoint, and version for making requests.
    - Python dtype: `ClaudeApi`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ClaudeApiNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "claude_api_key": ("STRING", {"multiline": False}),
                "endpoint": ("STRING", {"multiline": False, "default": "https://api.anthropic.com/v1"}),
                "version": (["2023-06-01"], {"default": "2023-06-01"}),
            },
        }

    RETURN_TYPES = ("LLM_API",)
    RETURN_NAMES = ("llm_api",)
    FUNCTION = "create_api"
    CATEGORY = "ArtVenture/LLM"

    def create_api(self, claude_api_key, endpoint, version):
        if not claude_api_key or claude_api_key == "":
            claude_api_key = os.environ.get("CLAUDE_API_KEY")
        if not claude_api_key:
            raise Exception("Claude API key is required.")

        return (ClaudeApi(api_key=claude_api_key, endpoint=endpoint, version=version),)

```
