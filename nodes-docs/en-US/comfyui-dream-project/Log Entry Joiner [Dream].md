---
tags:
- LogEntry
---

# 🗎 Log Entry Joiner
## Documentation
- Class name: `Log Entry Joiner [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

The Log Entry Joiner node is designed to merge multiple log entries into a single, comprehensive log entry. It facilitates the consolidation of discrete log information, making it easier to manage and interpret log data as a unified entity.
## Input types
### Optional
- **`entry_i`**
    - Represents a log entry to be merged. Each 'entry_i' allows for the sequential combination of log entries, enhancing the comprehensiveness of the resulting log. The index 'i' can range from 0 to 3, indicating the position of the log entry in the merge process.
    - Comfy dtype: `LOG_ENTRY`
    - Python dtype: `LogEntry`
## Output types
- **`log_entry`**
    - Comfy dtype: `LOG_ENTRY`
    - The resulting unified log entry, which combines the information from the individual log entries provided as input.
    - Python dtype: `LogEntry`
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
