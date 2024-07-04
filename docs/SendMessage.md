
# Documentation
- Class name: SendMessage
- Category: SALT/Language Toolkit/Agents
- Output node: False

SendMessage节点旨在促进不同代理之间的通信。它通过允许一个代理向另一个代理发送消息来实现这一目的。为了确保通信过程不会改变原始代理实例的状态，该节点会克隆接收者和发送者代理，从而保持参与通信的代理的完整性。

# Input types
## Required
- recipient
    - 接收消息的代理。克隆这个代理可以确保在消息传递后原始代理的状态得以保存。
    - Comfy dtype: AGENT
    - Python dtype: AGENT
- sender
    - 发起消息的代理。这个代理也会被克隆，以在发送消息后保持其原始状态。
    - Comfy dtype: AGENT
    - Python dtype: AGENT
- message
    - 从发送者传递给接收者的消息内容。支持多行输入，允许更复杂和详细的消息。
    - Comfy dtype: STRING
    - Python dtype: STRING

# Output types
- recipient
    - 接收消息后的克隆接收者代理，展示了代理在接收消息后的状态。
    - Comfy dtype: AGENT
    - Python dtype: AGENT
- sender
    - 发送消息后的克隆发送者代理，反映了代理在通信过程后的状态。
    - Comfy dtype: AGENT
    - Python dtype: AGENT


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
