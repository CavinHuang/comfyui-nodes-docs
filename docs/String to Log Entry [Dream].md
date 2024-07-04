
# Documentation
- Class name: String to Log Entry [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: True

String to Log Entry节点旨在将给定的文本字符串转换为日志条目，并可选择性地添加标签作为前缀。这一功能对于系统内的日志记录和跟踪至关重要，能够实现文本数据的结构化记录。

# Input types
## Required
- text
    - text参数是要记录的主要内容。它作为核心信息将被记录在日志条目中。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- label
    - label参数是文本内容的可选前缀。当提供时，它可以对日志条目进行分类或提供上下文，从而提高其信息价值。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- log_entry
    - 输出的log_entry是输入文本的结构化表示，可能带有标签前缀，格式化为用于记录或跟踪目的的日志条目。
    - Comfy dtype: LOG_ENTRY
    - Python dtype: LogEntry


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamStringToLog:
    NODE_NAME = "String to Log Entry"
    ICON = "🗎"
    OUTPUT_NODE = True
    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = (LogEntry.ID,)
    RETURN_NAMES = ("log_entry",)
    FUNCTION = "convert"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": ("STRING", {"default": ""}),
            },
            "optional": {
                "label": ("STRING", {"default": ""}),
            }
        }

    def convert(self, text, **values):
        label = values.get("label", "")
        if label:
            return (LogEntry.new(label + ": " + text),)
        else:
            return (LogEntry.new(text),)

```
