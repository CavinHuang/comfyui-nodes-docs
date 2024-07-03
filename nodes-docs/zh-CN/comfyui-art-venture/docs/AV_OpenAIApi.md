
# Documentation
- Class name: AV_OpenAIApi
- Category: ArtVenture/LLM
- Output node: False

AV_OpenAIApi节点旨在简化与OpenAI API的交互过程，使用户能够轻松创建和管理各种语言模型任务的API调用。该节点通过提供一个简化的接口来访问OpenAI的语言模型，从而抽象了直接API通信的复杂性。

# Input types
## Required
- openai_api_key
    - OpenAI API密钥对于向OpenAI服务进行身份验证至关重要，它使节点能够执行API调用。没有有效的API密钥，节点将无法访问OpenAI的服务。
    - Comfy dtype: STRING
    - Python dtype: str
- endpoint
    - API端点URL指定了OpenAI API调用的基本地址。默认值指向OpenAI的标准API端点。用户可以根据需要修改此端点，例如使用自定义或代理服务器。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- llm_api
    - 返回一个配置好的实例，用于与OpenAI的API进行交互。该实例封装了进行语言模型请求所需的所有必要细节，简化了后续的API调用过程。
    - Comfy dtype: LLM_API
    - Python dtype: Union[OpenAIApi, ClaudeApi]


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
