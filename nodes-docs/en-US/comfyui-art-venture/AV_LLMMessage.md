---
tags:
- LLM
- LLMChat
---

# LLM Message
## Documentation
- Class name: `AV_LLMMessage`
- Category: `ArtVenture/LLM`
- Output node: `False`

The AV_LLMMessage node is designed for creating and managing messages within a language model chat interface. It supports the inclusion of text and optionally images, facilitating rich, interactive dialogues between users and the system or assistant. This node plays a crucial role in structuring conversations, ensuring messages are correctly formatted and adhere to specified roles.
## Input types
### Required
- **`role`**
    - Specifies the role of the message, such as 'system', 'user', or 'assistant', influencing how the message is processed and presented within the chat flow.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`text`**
    - The main content of the message, which can be a user query, system response, or assistant's reply. Supports multiline text, allowing for detailed and comprehensive messages.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`image`**
    - An optional image to accompany the text message, enhancing the interaction with visual content. The image is expected to be in Tensor format and converted to base64 for inclusion.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[Tensor]`
- **`messages`**
    - A list of existing messages to which the new message will be added. This allows for the accumulation and management of conversation history.
    - Comfy dtype: `LLM_MESSAGE`
    - Python dtype: `Optional[List[LLMMessage]]`
## Output types
- **`messages`**
    - Comfy dtype: `LLM_MESSAGE`
    - Returns a list of messages, including the newly created message, facilitating the continuation and tracking of the conversation flow.
    - Python dtype: `List[LLMMessage]`
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
