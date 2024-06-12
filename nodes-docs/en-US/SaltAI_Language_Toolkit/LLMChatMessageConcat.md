# ∞ Messages Concat
## Documentation
- Class name: `LLMChatMessageConcat`
- Category: `SALT/Language Toolkit/Messages`
- Output node: `False`

The node is designed to concatenate two lists of chat messages, effectively merging conversations or message sequences into a single, continuous stream.
## Input types
### Required
- **`message_a`**
    - Represents the first list of chat messages to be concatenated. It is crucial for combining multiple message sequences into a unified list.
    - Comfy dtype: `LIST`
    - Python dtype: `List[ChatMessage]`
- **`message_b`**
    - Represents the second list of chat messages to be concatenated with the first. This parameter is essential for merging conversations or extending message sequences.
    - Comfy dtype: `LIST`
    - Python dtype: `List[ChatMessage]`
## Output types
- **`llm_message`**
    - Comfy dtype: `LIST`
    - The concatenated list of chat messages, providing a unified sequence of conversations or message exchanges.
    - Python dtype: `List[ChatMessage]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMChatMessageConcat:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "message_a": ("LIST", ),
                "message_b": ("LIST", ),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("llm_message", )

    FUNCTION = "concat_messages"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Messages"

    def concat_messages(self, message_a, message_b):
        return (message_a + message_b, )

```
