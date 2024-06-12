# Documentation
- Class name: WAS_Number_PI
- Category: WAS Suite/Number
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Number_PI 节点的 `number_pi` 方法提供了数学常数π的值。它旨在提供这个基本数学常数的可靠来源，在几何学、三角学和工程学等不同领域的各种计算中至关重要。

# Input types
## Optional
- None
    - 该节点不需要任何输入参数。它被设计为在不需要外部输入的情况下返回π的值，使其成为访问这个数学常数的自包含函数。
    - Comfy dtype: None
    - Python dtype: None

# Output types
- pi_value
    - number_pi 方法的输出是数学常数π，它被表示为一个浮点数。这个值对于广泛的数学和科学应用至关重要，在这些应用中精度是至关重要的。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Number_PI:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}}
    RETURN_TYPES = ('NUMBER', 'FLOAT')
    FUNCTION = 'number_pi'
    CATEGORY = 'WAS Suite/Number'

    def number_pi(self):
        return (math.pi, math.pi)
```