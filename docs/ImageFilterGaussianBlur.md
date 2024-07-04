
# Documentation
- Class name: `ImageFilterGaussianBlur`
- Category: `image/filter`
- Output node: `False`

ImageFilterGaussianBlur节点应用高斯模糊滤镜处理图像，通过使用高斯函数平滑图像噪点和细节。该节点设计用于模拟透过半透明屏幕查看图像的效果来处理图像，有效地减少图像噪点和细节。

# Input types
## Required
- **`images`**
    - 需要处理的图像。这个参数至关重要，因为它指定了要应用高斯模糊效果的目标图像。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`size_x`**
    - 指定高斯核的水平尺寸。这会影响水平方向上的模糊程度。
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`size_y`**
    - 指定高斯核的垂直尺寸。这会影响垂直方向上的模糊程度。
    - Comfy dtype: `INT`
    - Python dtype: `int`

# Output types
- **`image`**
    - 应用高斯模糊滤镜后的模糊图像。
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterGaussianBlur:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size_x": ("INT", {
                    "default": 10,
                    "min": 2,
                    "step": 2
                }),
                "size_y": ("INT", {
                    "default": 10,
                    "min": 2,
                    "step": 2
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/filter"

    def node(self, images, size_x, size_y):
        size_x -= 1
        size_y -= 1

        return (cv2_layer(images, lambda x: cv2.GaussianBlur(x, (size_x, size_y), size_x, size_y)),)

```
