
# Documentation
- Class name: AV_LLMChat
- Category: ArtVenture/LLM
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_LLMChat节点利用语言模型API生成对话。它处理一系列消息、配置参数和一个可选的种子，以产生一个连贯且与上下文相关的回应。

# Input types
## Required
- messages
    - 代表对话历史的消息列表。每条消息都有一个角色，指示其来源（系统、用户或助手），可以包含文本，还可以选择性地包含图像。此输入对于维持上下文和生成相关回应至关重要。
    - Comfy dtype: LLM_MESSAGE
    - Python dtype: List[LLMMessage]
- api
    - 用于与特定语言模型服务（如OpenAI或Claude）通信的API对象。此参数决定了响应生成的底层模型和API设置。
    - Comfy dtype: LLM_API
    - Python dtype: LLMApi
- config
    - 语言模型的配置设置，包括模型类型、最大令牌数和温度。这些设置用于微调生成过程。
    - Comfy dtype: LLM_CONFIG
    - Python dtype: LLMConfig
- seed
    - 用于确定性输出生成的可选种子，确保响应的可重现性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- response
    - 根据输入消息和配置，由语言模型生成的文本响应。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMChatNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "messages": ("LLM_MESSAGE",),
                "api": ("LLM_API",),
                "config": ("LLM_CONFIG",),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0x1FFFFFFFFFFFFF}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("response",)
    FUNCTION = "chat"
    CATEGORY = "ArtVenture/LLM"

    def chat(self, messages: List[LLMMessage], api: LLMApi, config: LLMConfig, seed):
        response = api.completion(messages, config, seed)
        return (response,)

```
