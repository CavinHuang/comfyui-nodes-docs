
# Documentation
- Class name: Get Date Time String (JPS)
- Category: JPS Nodes/Text
- Output node: False

该节点生成一个表示当前日期和时间的字符串，根据预定义格式列表中指定的样式进行格式化。它旨在提供一种灵活的方式来捕捉精确时刻，并以适合各种应用需求的格式呈现，如日志记录、文件命名或数据时间戳标记。

# Input types
## Required
- style
    - 指定日期和时间字符串的格式。格式的选择影响当前时间戳的表示方式，以满足不同的格式化需求。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- time_format
    - 根据指定样式格式化的日期和时间字符串。
    - Comfy dtype: STRING
    - Python dtype: str


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
