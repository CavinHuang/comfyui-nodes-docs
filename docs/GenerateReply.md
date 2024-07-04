
# Documentation
- Class name: GenerateReply
- Category: SALT/Language Toolkit/Agents
- Output node: False

GenerateReply节点用于生成对话代理之间的回复。它基于输入的消息和对话上下文生成回复，抽象了会话代理交互的复杂性，从而实现动态和响应性的对话创建。

# Input types
## Required
- recipient
    - 指定预期接收消息的代理，在确定生成回复的上下文和内容方面起着关键作用。
    - Comfy dtype: AGENT
    - Python dtype: ConversableAgent
- message
    - 接收代理预期回复的输入消息。这条消息为回复生成设定了上下文。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- sender
    - 可选参数，用于识别消息发送者，有助于在对话上下文中更准确地定制回复。
    - Comfy dtype: AGENT
    - Python dtype: ConversableAgent or None

# Output types
- reply
    - 接收代理对输入消息生成的回复，体现了代理在持续对话中的响应。
    - Comfy dtype: STRING
    - Python dtype: str


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
