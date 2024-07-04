
# Documentation
- Class name: ImageScaleDownToSize
- Category: Art Venture/Utils
- Output node: False

ImageScaleDownToSize节点旨在将图像缩小到特定尺寸，同时保持其纵横比。它提供了基于最大或最小尺寸进行缩放的模式，确保在减小图像尺寸时具有灵活性。

# Input types
## Required
- images
    - images参数代表要缩小的图像集合。它对于定义将进行缩放处理的输入图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size
    - size参数指定图像将被缩小到的目标尺寸。它在确定图像的新尺寸方面起着关键作用。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - mode参数决定缩放时是考虑图像的最大尺寸还是最小尺寸。这个选择影响了缩放过程中如何保持纵横比。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- image
    - 输出是一个已缩小到指定尺寸的图像张量，同时保持了其纵横比。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class UtilImageScaleDownToSize(UtilImageScaleDownBy):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "size": ("INT", {"default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1}),
                "mode": ("BOOLEAN", {"default": True, "label_on": "max", "label_off": "min"}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "image_scale_down_to_size"

    def image_scale_down_to_size(self, images, size, mode):
        width = images.shape[2]
        height = images.shape[1]

        if mode:
            scale_by = size / max(width, height)
        else:
            scale_by = size / min(width, height)

        scale_by = min(scale_by, 1.0)
        return self.image_scale_down_by(images, scale_by)

```
