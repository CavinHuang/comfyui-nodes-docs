
# Documentation
- Class name: InpaintPreprocessor_Provider_for_SEGS __Inspire
- Category: InspirePack/SEGS/ControlNet
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

该节点为SEGS（分割）提供了修复（inpainting）预处理功能。它使用了一个专门的封装器，可以对图像应用修复技术（可能还包括蒙版），为进一步的处理或增强做准备。

# Input types
## Required
无需输入参数。

# Output types
- segs_preprocessor
    - 该输出是经过修复预处理后的图像，已准备好进行进一步处理。
    - Comfy dtype: SEGS_PREPROCESSOR
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InpaintPreprocessor_Provider_for_SEGS:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {}}
    RETURN_TYPES = ("SEGS_PREPROCESSOR",)
    FUNCTION = "doit"

    CATEGORY = "InspirePack/SEGS/ControlNet"

    def doit(self):
        obj = InpaintPreprocessor_wrapper()
        return (obj, )

```
