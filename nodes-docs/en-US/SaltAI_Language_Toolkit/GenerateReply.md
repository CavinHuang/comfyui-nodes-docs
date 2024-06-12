# ∞ Generate Reply
## Documentation
- Class name: `GenerateReply`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

The GenerateReply node is designed to facilitate conversation between agents by generating replies based on the input message and the context of the conversation. It abstracts the complexities of conversational agent interactions, enabling the creation of dynamic and responsive dialogues.
## Input types
### Required
- **`recipient`**
    - Specifies the agent intended to receive the message, playing a crucial role in determining the context and content of the generated reply.
    - Comfy dtype: `AGENT`
    - Python dtype: `ConversableAgent`
- **`message`**
    - The input message to which the recipient agent is expected to respond. This message sets the context for the reply generation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`sender`**
    - Optional parameter identifying the sender of the message, used to tailor the reply more accurately within the conversation's context.
    - Comfy dtype: `AGENT`
    - Python dtype: `ConversableAgent or None`
## Output types
- **`reply`**
    - Comfy dtype: `STRING`
    - The generated reply from the recipient agent to the input message, encapsulating the agent's response within the ongoing conversation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GenerateReply:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "recipient": ("AGENT",),
                "message": ("STRING", {"multiline": True, "dynamicPrompts": False}),
            },
            "optional": {
                "sender": ("AGENT", {"default": None}),
            }
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("reply",)

    FUNCTION = "start_chat"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

    def start_chat(self, recipient, message, sender=None):
        recipient = clone_conversable_agent(recipient)
        if sender:
            sender = clone_conversable_agent(sender)
        message = recipient._oai_messages[sender] + [{"content": message, "role": "user"}]
        reply = recipient.generate_reply(message, sender)
        return (reply,)

```
