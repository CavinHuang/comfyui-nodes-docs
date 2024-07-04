
# Documentation
- Class name: Inference_Core_InpaintPreprocessor
- Category: ControlNet Preprocessors/others
- Output node: False

Inpaint Preprocessor节点专为图像修复任务中的预处理而设计。它通过应用蒙版来标识需要修复的区域，有效地将被蒙蔽的像素设置为特定值，为后续处理做好准备。

# Input types
## Required
- image
    - image参数代表要进行预处理的输入图像，是蒙版应用的主要数据对象。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - mask参数指定输入图像中需要进行修复的区域，标识哪些像素应该被考虑修改。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是一个经过预处理的图像，其中指定区域已被蒙蔽，为后续处理步骤做好了准备。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


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
