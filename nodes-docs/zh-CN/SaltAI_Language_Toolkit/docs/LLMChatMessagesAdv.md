
# Documentation
- Class name: LLMChatMessagesAdv
- Category: SALT/Language Toolkit/Messages
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMChatMessagesAdv节点旨在通过将系统提示和用户提示封装成结构化格式来准备聊天消息。该节点通过将输入提示组织成一系列消息，从而促进聊天互动的创建，实现更具结构化和连贯性的对话流程。

# Input types
## Required
- system_prompt
    - 系统提示代表系统提供的初始消息或上下文。它为聊天互动设定了基调，指导用户的回应。
    - Comfy dtype: STRING
    - Python dtype: str
- user_prompt
    - 用户提示捕捉用户对系统提示的回应或问题。它在推动对话向前发展中起着至关重要的作用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- llm_message
    - 一个包含系统和用户提示的聊天消息列表，结构化以便进行进一步处理或交互。
    - Comfy dtype: LIST
    - Python dtype: List[ChatMessage]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMChatMessagesAdv:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "system_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "You are a dog, you cannot speak, only woof, and react as a dog would."}),
                "user_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "plaeholder": "What is your name?"}),
            },
        }

    RETURN_TYPES = ("LIST", )
    RETURN_NAMES = ("llm_message", )

    FUNCTION = "prepare_messages"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Messages"

    def prepare_messages(self, system_prompt, user_prompt):
        messages = [
                ChatMessage(role=MessageRole.SYSTEM, content=system_prompt ),
                ChatMessage(role=MessageRole.USER, content=user_prompt ),
        ]
        return (messages,)

```
