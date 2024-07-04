
# Documentation
- Class name: AV_LLMMessage
- Category: ArtVenture/LLM
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_LLMMessage节点旨在为语言模型聊天接口创建和管理消息。它支持包含文本和可选的图像，促进用户和系统或助手之间丰富、互动的对话。该节点在构建对话结构中扮演着关键角色，确保消息格式正确并遵循指定的角色。

# Input types
## Required
- role
    - 指定消息的角色，如"系统"、"用户"或"助手"，影响消息在聊天流程中的处理和呈现方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- text
    - 消息的主要内容，可以是用户查询、系统响应或助手的回复。支持多行文本，允许详细而全面的消息。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- image
    - 可选的图像，用于配合文本消息，通过视觉内容增强交互。预期图像格式为Tensor，并转换为base64以便包含。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[Tensor]
- messages
    - 现有消息列表，新消息将被添加到此列表中。这允许积累和管理对话历史。
    - Comfy dtype: LLM_MESSAGE
    - Python dtype: Optional[List[LLMMessage]]

# Output types
- messages
    - 返回包含新创建消息在内的消息列表，便于对话流程的延续和跟踪。
    - Comfy dtype: LLM_MESSAGE
    - Python dtype: List[LLMMessage]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMMessageNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "role": (["system", "user", "assistant"],),
                "text": ("STRING", {"multiline": True}),
            },
            "optional": {"image": ("IMAGE",), "messages": ("LLM_MESSAGE",)},
        }

    RETURN_TYPES = ("LLM_MESSAGE",)
    RETURN_NAMES = ("messages",)
    FUNCTION = "make_message"
    CATEGORY = "ArtVenture/LLM"

    def make_message(self, role, text, image: Optional[Tensor] = None, messages: Optional[List[LLMMessage]] = None):
        messages = [] if messages is None else messages.copy()

        if role == "system":
            if isinstance(image, Tensor):
                raise Exception("System prompt does not support image.")

            system_message = [m for m in messages if m.role == "system"]
            if len(system_message) > 0:
                raise Exception("Only one system prompt is allowed.")

        if isinstance(image, Tensor):
            pil = tensor2pil(image)
            content = pil2base64(pil)
            messages.append(LLMMessage(role=role, text=text, image=content))
        else:
            messages.append(LLMMessage(role=role, text=text))

        return (messages,)

```
