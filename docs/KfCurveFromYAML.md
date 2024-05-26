# Documentation
- Class name: KfCurveFromYAML
- Category: CATEGORY
- Output node: False
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点旨在解析YAML格式的字符串以生成关键帧曲线，这在动画和模拟工作流中是必不可少的组件。它通过允许用户通过基于文本的格式定义复杂的运动路径，简化了创建过程，便于使用并增强了设计过程的模块化。

# Input types
## Required
- yaml
    - ‘yaml’参数是一个包含曲线的YAML格式描述的字符串。它至关重要，因为它直接定义了将要生成的曲线的结构和特征。该参数对节点的运行至关重要，规定了曲线中使用的关键帧和插值方法。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- curve
    - 输出‘curve’是一个数据结构，代表由输入YAML定义的关键帧曲线。它封装了带有关键帧、插值和其他属性的运动路径，成为动画或模拟流程中后续操作的基本元素。
    - Comfy dtype: KEYFRAMED_CURVE
    - Python dtype: keyframed.Curve

# Usage tips
- Infra type: CPU

# Source code
```
class KfCurveFromYAML:
    CATEGORY = CATEGORY
    FUNCTION = 'main'
    RETURN_TYPES = ('KEYFRAMED_CURVE',)

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'yaml': ('STRING', {'multiline': True, 'default': 'curve:\n- - 0\n  - 0\n  - linear\n- - 1\n  - 1\nloop: false\nbounce: false\nduration: 1\nlabel: foo'})}}

    def main(self, yaml):
        curve = kf.serialization.from_yaml(yaml)
        return (curve,)
```