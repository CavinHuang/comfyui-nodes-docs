
# Documentation
- Class name: ImageFilterStackBlur
- Category: image/filter
- Output node: False

ImageFilterStackBlur节点应用堆栈模糊效果到图像上。这种技术通过混合每个点周围特定半径内的像素来模拟类似散景的模糊效果，从而产生平滑均匀的效果。

# Input types
## Required
- images
    - 要应用堆栈模糊效果的图像。这是决定节点视觉输出的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- size_x
    - 指定模糊效果的水平大小。它影响每个像素周围考虑进行模糊处理的区域宽度。
    - Comfy dtype: INT
    - Python dtype: int
- size_y
    - 指定模糊效果的垂直大小。它影响每个像素周围考虑进行模糊处理的区域高度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 应用堆栈模糊效果后的结果图像，呈现出平滑且视觉上吸引人的模糊效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageFilterStackBlur:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "size_x": ("INT", {
                    "default": 10,
                    "min": 1,
                    "step": 2
                }),
                "size_y": ("INT", {
                    "default": 10,
                    "min": 1,
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

        return (cv2_layer(images, lambda x: cv2.stackBlur(x, (size_x, size_y))),)

```
