
# Documentation
- Class name: Int to Log Entry [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: False

'Int to Log Entry'节点旨在将一个整数值和一个可选的标签转换成日志条目格式。这一功能对于在系统中记录和跟踪整数值至关重要，它提供了一个结构化且易读的日志条目，便于解释和分析。

# Input types
## Required
- value
    - 'value'参数代表要记录的整数值。它是日志条目的核心组成部分，是构建日志条目的主要数据点。
    - Comfy dtype: INT
    - Python dtype: int
- label
    - 'label'参数是一个可选的字符串，为被记录的整数值提供上下文或描述。通过为数值添加文本描述，它增强了日志条目的可读性和可解释性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- log_entry
    - 输出的'log_entry'是输入整数值和可选标签的结构化表示，格式化用于日志记录目的。它将数据封装在日志条目格式中，使其适合在日志系统中进行跟踪和分析。
    - Comfy dtype: LOG_ENTRY
    - Python dtype: LogEntry


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamIntToLog:
    NODE_NAME = "Int to Log Entry"
    ICON = "🗎"
    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = (LogEntry.ID,)
    RETURN_NAMES = ("log_entry",)
    FUNCTION = "convert"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "value": ("INT", {"default": 0}),
                "label": ("STRING", {"default": ""}),
            },
        }

    def convert(self, label, value):
        return (LogEntry.new(label + ": " + str(value)),)

```
