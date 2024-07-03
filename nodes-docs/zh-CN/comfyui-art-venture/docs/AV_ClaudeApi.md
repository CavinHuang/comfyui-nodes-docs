
# Documentation
- Class name: AV_ClaudeApi
- Category: ArtVenture/LLM
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_ClaudeApi节点用于创建一个与Claude语言模型交互的API接口。它允许通过指定的API密钥、端点和版本信息来配置和利用Claude的AI能力。

# Input types
## Required
- claude_api_key
    - Claude服务的API密钥，对于认证和访问语言模型的功能至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- endpoint
    - Claude API的URL端点，用于指定API请求的基本路径。如果未提供，则默认使用官方Claude API端点。
    - Comfy dtype: STRING
    - Python dtype: str
- version
    - 要使用的Claude API版本，可控制可访问的功能或改进。默认使用节点支持的最新版本。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- llm_api
    - 提供了一个Claude语言模型的接口，封装了API密钥、端点和版本，用于发送请求。
    - Comfy dtype: LLM_API
    - Python dtype: ClaudeApi


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
