
# Documentation
- Class name: SaltScheduleRandomValues
- Category: SALT/Scheduling
- Output node: False

这个节点旨在生成一个指定范围内的随机值列表，可选择强制将这些值设为整数。它在创建需要变化性的随机化调度或序列时非常有用。

# Input types
## Required
- count
    - 指定要生成的随机值数量，决定输出列表的长度。
    - Comfy dtype: INT
    - Python dtype: int
- min_value
    - 定义可以生成的最小值，设置随机范围的下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- max_value
    - 设置随机值的上限，确立范围内的最大可能值。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- force_integer
    - 决定生成的随机值是否应为整数，为输出数据类型增加一层控制。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- schedule_list
    - 生成的随机值列表，符合指定的约束条件和数据类型。
    - Comfy dtype: LIST
    - Python dtype: List[float] or List[int]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltScheduleRandomValues:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "count": ("INT", {"min": 1}),
                "min_value": ("FLOAT", {}),
                "max_value": ("FLOAT", {}),
            },
            "optional": {
                "force_integer": ("BOOLEAN", {"default": False}),
            },
        }

    RETURN_TYPES = ("LIST",)
    RETURN_NAMES = ("schedule_list", )
    FUNCTION = "generate_random"
    CATEGORY = "SALT/Scheduling"

    def generate_random(self, count, min_value, max_value, force_integer=False):
        if min_value >= max_value:
            raise ValueError("Schedule min_value must be less than max_value.")
        
        output_type = int if force_integer or (isinstance(min_value, int) and isinstance(max_value, int)) else float
        
        if output_type == int:
            random_schedule = [random.randint(int(min_value), int(max_value)) for _ in range(count)]
        else:
            random_schedule = [random.uniform(min_value, max_value) for _ in range(count)]

        return (random_schedule, )

```
