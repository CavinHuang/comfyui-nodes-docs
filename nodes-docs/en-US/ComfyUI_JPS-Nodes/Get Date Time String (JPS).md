---
tags:
- Time
---

# Get Date Time String (JPS)
## Documentation
- Class name: `Get Date Time String (JPS)`
- Category: `JPS Nodes/Text`
- Output node: `False`

This node generates a string representing the current date and time, formatted according to a specified style from a predefined list of formats. It's designed to provide a flexible way to capture the exact moment in a format that suits various application needs, such as logging, file naming, or timestamping data.
## Input types
### Required
- **`style`**
    - Specifies the format for the date and time string. The choice of format affects how the current timestamp is represented, catering to different formatting needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`time_format`**
    - Comfy dtype: `STRING`
    - The formatted date and time string as per the specified style.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [SaveImageExtended](../../save-image-extended-comfyui/Nodes/SaveImageExtended.md)



## Source code
```python
class Get_Date_Time_String:
    time_format = ["%Y%m%d%H%M%S","%Y%m%d%H%M","%Y%m%d","%Y-%m-%d-%H_%M_%S","%Y-%m-%d-%H_%M","%Y-%m-%d","%Y-%m-%d %H_%M_%S","%Y-%m-%d %H_%M","%Y-%m-%d","%H%M","%H%M%S","%H_%M","%H_%M_%S"]
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "style": (s.time_format,),
            }
        }
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("time_format",)
    FUNCTION = "get_time"

    CATEGORY = "JPS Nodes/Text"

    def get_time(self, style):
        now = datetime.now()
        timestamp = now.strftime(style)

        return (timestamp,)

    @classmethod
    def IS_CHANGED(s, style):
        now = datetime.now()
        timestamp = now.strftime(style)
        return (timestamp,)

```
