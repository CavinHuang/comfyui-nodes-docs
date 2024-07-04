
# Documentation
- Class name: LLMChatMessages
- Category: SALT/Language Toolkit/Messages
- Output node: False

此节点旨在将系统提示和用户提示封装成结构化的聊天消息，便于在基于聊天的应用程序中进一步处理或交互这些消息。

# Input types
## Required
- prompt
    - 该参数用于接收系统或用户的提示文本，作为聊天消息的主要内容。
    - Comfy dtype: STRING
    - Python dtype: unknown
- role
    - 该参数用于指定消息的角色，可能包括系统、用户等不同身份。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown

# Output types
- llm_message
    - 输出一个结构化的聊天消息列表，将系统和用户输入组合成一个连贯的交互序列。
    - Comfy dtype: LIST
    - Python dtype: List[ChatMessage]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMChatMessages:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "prompt"}),
                "role": (["SYSTEM", "USER"],),
            },
        }

    RETURN_TYPES = ("LIST", )
    RETURN_NAMES = ("llm_message", )

    FUNCTION = "prepare_messages"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Messages"

    def prepare_messages(self, prompt, role):
        messages = [
                ChatMessage(role=MessageRole.SYSTEM if role == "SYSTEM" else MessageRole.USER, content=prompt ),
        ]
        return (messages,)

```
