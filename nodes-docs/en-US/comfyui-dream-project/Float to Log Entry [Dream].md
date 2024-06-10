---
tags:
- LogEntry
---

# 🗎 Float to Log Entry
## Documentation
- Class name: `Float to Log Entry [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

The Float to Log Entry node is designed to convert floating-point numbers into log entries, facilitating the tracking and logging of numerical data within a system. It encapsulates the process of transforming a float value into a structured log format, making it easier to document and review numerical changes or states.
## Input types
### Required
- **`value`**
    - Represents the floating-point number to be logged. Its inclusion is crucial for defining the numerical data that will be transformed into a log entry.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`label`**
    - An optional label to prepend to the logged value, providing context or categorization for the numerical data being logged.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`log_entry`**
    - Comfy dtype: `LOG_ENTRY`
    - The output is a structured log entry that encapsulates the provided floating-point value, optionally prefixed with a label, in a format suitable for logging and tracking.
    - Python dtype: `LogEntry`
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
