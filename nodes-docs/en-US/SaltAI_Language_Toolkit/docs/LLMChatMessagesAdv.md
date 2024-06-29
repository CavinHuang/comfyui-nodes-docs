# ∞ Message (Advanced)
## Documentation
- Class name: `LLMChatMessagesAdv`
- Category: `SALT/Language Toolkit/Messages`
- Output node: `False`

The LLMChatMessagesAdv node is designed to prepare chat messages by encapsulating system and user prompts into a structured format. This node facilitates the creation of chat interactions by organizing input prompts into a sequence of messages, thereby enabling a more structured and coherent dialogue flow.
## Input types
### Required
- **`system_prompt`**
    - The system prompt represents the initial message or context provided by the system. It sets the stage for the chat interaction, guiding the user's response.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`user_prompt`**
    - The user prompt captures the user's input or question in response to the system prompt. It plays a crucial role in driving the conversation forward.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`llm_message`**
    - Comfy dtype: `LIST`
    - A list of chat messages that includes both the system and user prompts, structured for further processing or interaction.
    - Python dtype: `List[ChatMessage]`
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
