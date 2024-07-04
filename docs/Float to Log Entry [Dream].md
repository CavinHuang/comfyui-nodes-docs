
# Documentation
- Class name: Float to Log Entry [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: False

Float to Log Entry节点旨在将浮点数转换为日志条目，从而便于在系统中追踪和记录数值数据。它封装了将浮点值转换为结构化日志格式的过程，使得记录和审查数值变化或状态变得更加容易。

# Input types
## Required
- value
    - 表示要记录的浮点数。它的包含对于定义将被转换为日志条目的数值数据至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- label
    - 一个可选的标签，用于在记录的值前面添加前缀，为被记录的数值数据提供上下文或分类。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- log_entry
    - 输出是一个结构化的日志条目，它封装了提供的浮点值，可选地带有标签前缀，以适合记录和追踪的格式呈现。
    - Comfy dtype: LOG_ENTRY
    - Python dtype: LogEntry


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamFloatToLog:
    NODE_NAME = "Float to Log Entry"
    ICON = "🗎"
    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = (LogEntry.ID,)
    RETURN_NAMES = ("log_entry",)
    FUNCTION = "convert"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("FLOAT", {"default": 0}),
                "label": ("STRING", {"default": ""}),
            },
        }

    def convert(self, label, value):
        return (LogEntry.new(label + ": " + str(value)),)

```
