# ∞ Send Message
## Documentation
- Class name: `SendMessage`
- Category: `SALT/Language Toolkit/Agents`
- Output node: `False`

The SendMessage node facilitates communication between agents by allowing one agent to send a message to another. This node clones the recipient and sender agents to ensure that the message delivery process does not alter the original agent instances, maintaining the integrity of the agents involved in the communication.
## Input types
### Required
- **`recipient`**
    - The recipient agent who will receive the message. Cloning this agent ensures that the original agent's state is preserved post-message delivery.
    - Comfy dtype: `AGENT`
    - Python dtype: `AGENT`
- **`sender`**
    - The sender agent who initiates the message. This agent is also cloned to preserve its original state after sending the message.
    - Comfy dtype: `AGENT`
    - Python dtype: `AGENT`
- **`message`**
    - The message content to be sent from the sender to the recipient. Supports multiline input, allowing for more complex and detailed messages.
    - Comfy dtype: `STRING`
    - Python dtype: `STRING`
## Output types
- **`recipient`**
    - Comfy dtype: `AGENT`
    - The cloned recipient agent, post-message reception, showcasing the state of the agent after receiving the message.
    - Python dtype: `AGENT`
- **`sender`**
    - Comfy dtype: `AGENT`
    - The cloned sender agent, post-message sending, reflecting the agent's state after the communication process.
    - Python dtype: `AGENT`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SendMessage:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "recipient": ("AGENT",),
                "sender": ("AGENT",),
                "message": ("STRING", {
                    "multiline": True,
                    "default": "Hi"
                }),
            },
        }

    RETURN_TYPES = ("AGENT", "AGENT")
    RETURN_NAMES = ("recipient", "sender")

    FUNCTION = "add_info"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

    def add_info(self, recipient, sender, message):
        recipient = clone_conversable_agent(recipient)
        sender = clone_conversable_agent(sender)
        sender.send(message, recipient)
        return (recipient, sender)

```
