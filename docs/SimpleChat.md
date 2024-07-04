
# Documentation
- Class name: SimpleChat
- Category: SALT/Language Toolkit/Agents
- Output node: False

SimpleChat节点提供了一个简单直接的文本聊天界面，用于两个代理之间的一对一对话。它抽象了启动、管理和总结聊天互动的复杂性，为进行对话提供了一个无缝的接口。

# Input types
## Required
- initiator
    - 代表发起聊天的代理，为对话的背景和动态设定基调。
    - Comfy dtype: AGENT
    - Python dtype: ConversableAgent
- recipient
    - 表示接收聊天发起的代理，通过回应发起者的消息在对话中扮演关键角色。
    - Comfy dtype: AGENT
    - Python dtype: ConversableAgent
- summary_method
    - 指定用于总结聊天对话的方法，影响对话的整体理解和要点提取。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- clear_history
    - 决定是否在开始新对话前清除聊天历史，影响互动的连续性和上下文。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- init_message
    - 可选的初始消息，用于设定对话的基调和主题。
    - Comfy dtype: STRING
    - Python dtype: str
- max_turns
    - 限制代理之间的交互次数，控制对话的长度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- chat_history
    - Comfy dtype: STRING
    - 提供详细的聊天对话记录，捕捉代理之间的消息交换。
    - Python dtype: str
- summary
    - Comfy dtype: STRING
    - 提供聊天的简明摘要，突出对话的关键点和结果。
    - Python dtype: str
- initiator
    - Comfy dtype: AGENT
    - 返回发起聊天的代理，反映其在聊天会话中的角色和贡献。
    - Python dtype: ConversableAgent
- recipient
    - Comfy dtype: AGENT
    - 返回接收聊天的代理，展示其在聊天中的回应和参与。
    - Python dtype: ConversableAgent


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SimpleChat:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "initiator": ("AGENT",),
                "recipient": ("AGENT",),
                "summary_method": ([
                    "last_msg",
                    "reflection_with_llm",
                ],),
                # whether to clear the chat history with the agent
                "clear_history": ("BOOLEAN", {"default": True},),
            },
            "optional": {
                "init_message": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                "max_turns": ("INT", {"default": 10}),
            }
        }

    RETURN_TYPES = ("STRING", "STRING", "AGENT", "AGENT",)
    RETURN_NAMES = ("chat_history", "summary", "initiator", "recipient",)

    FUNCTION = "start_chat"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Agents"

    def start_chat(self, initiator, recipient, summary_method, clear_history, init_message=None, max_turns=None):
        initiator = clone_conversable_agent(initiator)
        recipient = clone_conversable_agent(recipient)

        chat_result = initiator.initiate_chat(
            recipient,
            message=init_message,
            max_turns=max_turns,
            summary_method=summary_method,
            clear_history=clear_history,
        )
        summary = chat_result.summary
        chat_history = ""
        for message in chat_result.chat_history:
            if message["content"] is not None:
                chat_history += "- " + message["content"] + "\n\n"
        return (chat_history, summary, initiator, recipient,)

```
