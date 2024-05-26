# Documentation
- Class name: KfCurveFromString
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在将数学曲线的字符串表示解释并转换为可用于进一步处理的格式。它封装了解析Chigozie字符串的逻辑，这是一种描述关键帧曲线的紧凑方式，并输出一个可用于可视化或在各种数学和图形应用程序中使用的曲线对象。

# Input types
## Required
- chigozie_string
    - 输入参数是一个使用Chigozie表示法定义曲线的字符串，对于节点生成相应的曲线对象至关重要。它直接影响输出曲线的形状和特征。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- curve
    - 输出是一个曲线对象，代表由输入字符串定义的数学曲线。它是节点操作的主要结果，可以用于渲染、分析或在基于关键帧的工作流程中进一步处理。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: kf.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurveFromString:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'chigozie_string': ('STRING', {'multiline': True, 'default': '0:(1)'})}}

    def main(self, chigozie_string):
        curve = curve_from_cn_string(chigozie_string)
        return (curve,)
```