
# Documentation
- Class name: LLMChatMessageConcat
- Category: SALT/Language Toolkit/Messages
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LLMChatMessageConcat节点旨在将两个聊天消息列表连接起来，有效地将对话或消息序列合并成一个单一的、连续的流。这个节点在处理和组织大量对话数据时特别有用，可以将分散的消息序列整合成一个完整的对话流程。

# Input types
## Required
- message_a
    - 代表要连接的第一个聊天消息列表。它对于将多个消息序列组合成统一列表至关重要。这个输入可以包含任何类型的聊天消息，如用户询问、系统回复等。
    - Comfy dtype: LIST
    - Python dtype: List[ChatMessage]
- message_b
    - 代表要与第一个列表连接的第二个聊天消息列表。这个参数对于合并对话或扩展消息序列至关重要。它允许用户将两个独立的对话片段无缝地结合在一起。
    - Comfy dtype: LIST
    - Python dtype: List[ChatMessage]

# Output types
- llm_message
    - 输出的是连接后的聊天消息列表，提供了统一的对话序列或消息交换。这个输出可以直接用于进一步的处理，如分析对话内容、生成摘要，或者输入到其他自然语言处理任务中。
    - Comfy dtype: LIST
    - Python dtype: List[ChatMessage]


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
