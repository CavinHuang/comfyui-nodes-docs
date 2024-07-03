
# Documentation
- Class name: ImageTransformTranspose
- Category: image/transform
- Output node: False

ImageTransformTranspose节点抽象了复杂的图像操作任务，使得可以对一批图像应用各种几何变换。这有助于轻松地集成到图像处理流程中，提高了图像操作的灵活性和效率。

# Input types
## Required
- images
    - images参数代表要进行变换的图像批次，是节点操作的关键输入数据。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- method
    - method参数决定了要应用的几何变换类型，影响节点的处理过程和变换结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- image
    - 经过几何变换后的图像，反映了所应用的变换效果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageTransformTranspose:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "method": (["flip_horizontally", "flip_vertically", "rotate_90", "rotate_180", "rotate_270", "transpose", "transverse"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/transform"

    def node(self, images, method):
        def transpose_tensor(tensor):
            if method == "flip_horizontally":
                transpose = Image.FLIP_LEFT_RIGHT
            elif method == "flip_vertically":
                transpose = Image.FLIP_TOP_BOTTOM
            elif method == "rotate_90":
                transpose = Image.ROTATE_90
            elif method == "rotate_180":
                transpose = Image.ROTATE_180
            elif method == "rotate_270":
                transpose = Image.ROTATE_270
            elif method == "transpose":
                transpose = Image.TRANSPOSE
            elif method == "transverse":
                transpose = Image.TRANSVERSE
            else:
                raise ValueError()

            return tensor.tensor_to_image().transpose(transpose).image_to_tensor()

        return (torch.stack([
            transpose_tensor(images[i]) for i in range(len(images))
        ]),)

```
