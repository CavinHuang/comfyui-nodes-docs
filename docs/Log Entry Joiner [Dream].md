
# Documentation
- Class name: Log Entry Joiner [Dream]
- Category: ✨ Dream/🛠 utils
- Output node: False

Log Entry Joiner节点旨在将多个日志条目合并成一个完整的日志条目。它通过整合离散的日志信息，使日志数据更容易管理和解读，从而形成一个统一的实体。

# Input types
## Optional
- entry_i
    - 表示待合并的日志条目。每个"entry_i"允许按顺序组合日志条目，从而提高最终日志的完整性。索引"i"可以从0到3，表示日志条目在合并过程中的位置。
    - Comfy dtype: LOG_ENTRY
    - Python dtype: LogEntry

# Output types
- log_entry
    - 合并后的统一日志条目，汇总了作为输入提供的各个日志条目的信息。
    - Comfy dtype: LOG_ENTRY
    - Python dtype: LogEntry


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DreamJoinLog:
    NODE_NAME = "Log Entry Joiner"
    ICON = "🗎"
    CATEGORY = NodeCategories.UTILS
    RETURN_TYPES = (LogEntry.ID,)
    RETURN_NAMES = ("log_entry",)
    FUNCTION = "convert"

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "optional": {
                "entry_0": (LogEntry.ID,),
                "entry_1": (LogEntry.ID,),
                "entry_2": (LogEntry.ID,),
                "entry_3": (LogEntry.ID,),
            }
        }

    def convert(self, **values):
        entry = LogEntry([])
        for i in range(4):
            txt = values.get("entry_" + str(i), None)
            if txt:
                entry = entry.merge(txt)
        return (entry,)

```
