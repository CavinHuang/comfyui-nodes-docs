
# Documentation
- Class name: LineArt_Preprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False

该节点提供了一个预处理器，用于从图像生成线条艺术，专门针对SEGS（语义边缘引导合成）模型设计。它允许调整线条艺术的粗细程度，从而实现从细腻到粗犷的多种艺术效果。

# Input types
## Required
- coarse
    - 决定生成的线条艺术是粗犷还是细腻。启用此选项会产生更加粗壮、突出的线条，而禁用则会生成更加精细、细节丰富的线条艺术。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- segs_preprocessor
    - 返回一个可以将图像预处理成适用于SEGS模型的线条艺术的对象，有助于创建风格化的图像或动画。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: LineArt_Preprocessor_wrapper


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LineArt_Preprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "coarse": ("BOOLEAN", {"default": False, "label_on": "enable", "label_off": "disable"}),
        }}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self, coarse):
        obj = LineArt_Preprocessor_wrapper(coarse)
        return (obj, )

```
