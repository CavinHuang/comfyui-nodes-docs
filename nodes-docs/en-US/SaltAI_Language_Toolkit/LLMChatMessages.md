# ∞ Message
## Documentation
- Class name: `LLMChatMessages`
- Category: `SALT/Language Toolkit/Messages`
- Output node: `False`

This node is designed to encapsulate system and user prompts into structured chat messages, facilitating the preparation of these messages for further processing or interaction within chat-based applications.
## Input types
### Required
- **`prompt`**
    - unknown
    - Comfy dtype: `STRING`
    - Python dtype: `unknown`
- **`role`**
    - unknown
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `unknown`
## Output types
- **`llm_message`**
    - Comfy dtype: `LIST`
    - Outputs a list of structured chat messages that combine system and user inputs into a cohesive sequence for interaction.
    - Python dtype: `List[ChatMessage]`
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
