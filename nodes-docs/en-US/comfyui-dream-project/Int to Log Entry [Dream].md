---
tags:
- LogEntry
---

# 🗎 Int to Log Entry
## Documentation
- Class name: `Int to Log Entry [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `False`

The 'Int to Log Entry' node is designed to convert an integer value along with an optional label into a log entry format. This functionality is essential for logging and tracking integer values within a system, providing a structured and readable log entry that can be easily interpreted and analyzed.
## Input types
### Required
- **`value`**
    - The 'value' parameter represents the integer value to be logged. It is a crucial component of the log entry, serving as the primary data point around which the log entry is structured.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`label`**
    - The 'label' parameter is an optional string that provides context or a descriptor for the integer value being logged. It enhances the readability and interpretability of the log entry by adding a textual description to the numerical value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`log_entry`**
    - Comfy dtype: `LOG_ENTRY`
    - The output 'log_entry' is a structured representation of the input integer value and optional label, formatted for logging purposes. It encapsulates the data in a log entry format, making it suitable for tracking and analysis within a logging system.
    - Python dtype: `LogEntry`
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
