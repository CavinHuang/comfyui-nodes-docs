
# Documentation
- Class name: ImageEffectsGrayscale
- Category: image/effects
- Output node: False

ImageEffectsGrayscale节点用于将一批图像转换为灰度效果。它通过对每张图像的色彩通道进行平均来实现灰度转换，从而为整个图像批次应用统一的灰度处理。

# Input types
## Required
- images
    - 这是需要进行灰度转换的图像批次。该输入对于灰度转换过程至关重要，它决定了哪些图像将经历这一转换，从而直接影响节点的执行结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出的是经过灰度效果处理后的图像批次，每张图像都已转换为灰度模式。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageEffectsGrayscale:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/effects"

    def node(self, images):
        def apply(image):
            tensor = image.clone().detach()
            grayscale_tensor = torch.mean(tensor, dim=2, keepdim=True)

            return torch.cat([grayscale_tensor] * 3, dim=2)

        return (torch.stack([
            apply(images[i]) for i in range(len(images))
        ]),)

```
