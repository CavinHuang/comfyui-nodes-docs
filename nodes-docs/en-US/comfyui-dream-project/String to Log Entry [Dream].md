---
tags:
- LogEntry
---

# 🗎 String to Log Entry
## Documentation
- Class name: `String to Log Entry [Dream]`
- Category: `✨ Dream/🛠 utils`
- Output node: `True`

The 'String to Log Entry' node is designed to convert a given text string into a log entry, optionally prefixed with a label. This functionality is essential for logging and tracking purposes within a system, allowing for the structured recording of textual data.
## Input types
### Required
- **`text`**
    - The 'text' parameter is the primary content to be logged. It serves as the core information that will be recorded in the log entry.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`label`**
    - The 'label' parameter is an optional prefix for the text content. When provided, it categorizes or provides context to the log entry, enhancing its informational value.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`log_entry`**
    - Comfy dtype: `LOG_ENTRY`
    - The output 'log_entry' is a structured representation of the input text, potentially prefixed with a label, formatted as a log entry for recording or tracking purposes.
    - Python dtype: `LogEntry`
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
