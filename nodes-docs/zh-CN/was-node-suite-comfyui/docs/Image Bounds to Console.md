# Documentation
- Class name: WAS_Image_Bounds_to_Console
- Category: WAS Suite/Debug
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Image_Bounds_to_Console节点旨在通过将图像边界信息输出到控制台来促进调试过程。它通过提供清晰、格式化的边界显示，增强了图像处理阶段的可见性，有助于分析和验证图像操作工作流程。

# Input types
## Required
- image_bounds
    - image_bounds参数对于节点的操作至关重要，因为它定义了图像内的兴趣区域。它用于识别和隔离图像的特定部分以进行进一步处理或分析，因此在节点的执行和它产生的结果中扮演着重要角色。
    - Comfy dtype: IMAGE_BOUNDS
    - Python dtype: List[Tuple[int, int, int, int]]
## Optional
- label
    - label参数作为调试输出的描述性标识符。虽然不是强制性的，但它可以用来自定义控制台输出，使其更容易区分不同的调试消息，在复杂的调试场景中特别有用。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image_bounds
    - 输出的image_bounds参数保留了输入的图像边界数据，确保调试信息在控制台输出中准确反映。这个参数很重要，因为它允许在节点处理后验证图像边界。
    - Comfy dtype: IMAGE_BOUNDS
    - Python dtype: List[Tuple[int, int, int, int]]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Image_Bounds_to_Console:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'image_bounds': ('IMAGE_BOUNDS',), 'label': ('STRING', {'default': 'Debug to Console', 'multiline': False})}}
    RETURN_TYPES = ('IMAGE_BOUNDS',)
    OUTPUT_NODE = True
    FUNCTION = 'debug_to_console'
    CATEGORY = 'WAS Suite/Debug'

    def debug_to_console(self, image_bounds, label):
        label_out = 'Debug to Console'
        if label.strip() != '':
            label_out = label
        bounds_out = 'Empty'
        if len(bounds_out) > 0:
            bounds_out = ', \n    '.join(('\t(rmin={}, rmax={}, cmin={}, cmax={})'.format(a, b, c, d) for (a, b, c, d) in image_bounds))
        cstr(f'\x1b[33m{label_out}\x1b[0m:\n[\n{bounds_out}\n]\n').msg.print()
        return (image_bounds,)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float('NaN')
```