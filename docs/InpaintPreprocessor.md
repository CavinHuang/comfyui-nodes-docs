
# Documentation
- Class name: InpaintPreprocessor
- Category: ControlNet Preprocessors/others
- Output node: False

InpaintPreprocessor节点旨在通过将掩码应用于输入图像来为修复任务准备图像。它通过标记掩码指定的区域（这些区域需要修复）来修改图像，从而有效地为进一步处理做准备，使这些区域可以被填充或修正。

# Input types
## Required
- image
    - image参数代表需要修复的输入图像。它对于定义在修复过程中保持不变的区域至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - mask参数指定了图像中需要修复的区域。它在识别应由修复算法处理或填充的图像部分方面起着关键作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是输入图像的修改版本，其中由掩码指定的区域被标记为需要修复，为进一步处理做好准备。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)



## Source code
```python
class InpaintPreprocessor:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",), "mask": ("MASK",)}}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "preprocess"

    CATEGORY = "ControlNet Preprocessors/others"

    def preprocess(self, image, mask):
        mask = torch.nn.functional.interpolate(mask.reshape((-1, 1, mask.shape[-2], mask.shape[-1])), size=(image.shape[1], image.shape[2]), mode="bilinear")
        mask = mask.movedim(1,-1).expand((-1,-1,-1,3))
        image = image.clone()
        image[mask > 0.5] = -1.0  # set as masked pixel
        return (image,)

```
