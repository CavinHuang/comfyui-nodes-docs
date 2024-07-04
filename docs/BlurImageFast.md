
# Documentation
- Class name: BlurImageFast
- Category: image/filters
- Output node: False

BlurImageFast节点提供了一种快速高效的方法来对图像应用高斯模糊。它通过指定x和y方向上的模糊半径来模糊图像，从而实现可自定义的模糊效果。

# Input types
## Required
- images
    - images参数代表要进行模糊处理的图像。它对于定义将应用高斯模糊效果的输入图像至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- radius_x
    - radius_x参数指定高斯模糊的水平半径。它决定了图像x轴方向上的模糊程度。
    - Comfy dtype: INT
    - Python dtype: int
- radius_y
    - radius_y参数指定高斯模糊的垂直半径。它决定了图像y轴方向上的模糊程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是输入图像的模糊版本，通过根据radius_x和radius_y参数指定的高斯模糊实现。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BlurImageFast:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "radius_x": ("INT", {
                    "default": 1,
                    "min": 0,
                    "max": 1023,
                    "step": 1
                }),
                "radius_y": ("INT", {
                    "default": 1,
                    "min": 0,
                    "max": 1023,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "blur_image"

    CATEGORY = "image/filters"

    def blur_image(self, images, radius_x, radius_y):
        
        if radius_x + radius_y == 0:
            return (images,)
        
        dx = radius_x * 2 + 1
        dy = radius_y * 2 + 1
        
        dup = copy.deepcopy(images.cpu().numpy())
        
        for index, image in enumerate(dup):
            dup[index] = cv2.GaussianBlur(image, (dx, dy), 0)
        
        return (torch.from_numpy(dup),)

```
