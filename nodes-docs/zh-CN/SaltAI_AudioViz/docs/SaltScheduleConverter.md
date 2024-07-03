
# Documentation
- Class name: SaltScheduleConverter
- Category: SALT/Scheduling
- Output node: False

SaltScheduleConverter节点的设计目的是将调度列表转换为与各种模块兼容的格式。它通过将列表输入转换为浮点数，确保与需要特定数值类型的模块实现互操作性。

# Input types
## Required
- schedule_list
    - schedule_list参数是一个待转换的值列表。它在确定输出格式和类型方面起着关键作用，影响着与其他模块的兼容性。
    - Comfy dtype: LIST
    - Python dtype: List[float]

# Output types
- floats
    - 输入调度列表中原始浮点值的列表，保持原始数值格式。
    - Comfy dtype: FLOATS
    - Python dtype: List[float]
- float
    - 原始浮点列表的副本，作为兼容性的替代格式。
    - Comfy dtype: FLOAT
    - Python dtype: List[float]
- int
    - 通过对原始调度列表值进行四舍五入得到的整数列表，专为需要整数输入的模块量身定制。
    - Comfy dtype: INT
    - Python dtype: List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleConverter:
    """
        Converts a LIST input to FLOATS or FLOAT type
        Makes schedule lists compatible with MTB, IPAdapter, and other modules that use false types.
    """
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "schedule_list": ("LIST",)
            },
        }
    
    RETURN_TYPES = ("FLOATS", "FLOAT", "INT")
    RETURN_NAMES = ("floats", "float", "int")
    FUNCTION = "convert"
    CATEGORY = "SALT/Scheduling"

    def convert(self, schedule_list):
        int_schedule = [int(round(val)) for val in schedule_list]
        return (schedule_list, schedule_list, int_schedule)

```
