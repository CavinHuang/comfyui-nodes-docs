
# Documentation
- Class name: ImageBatchMulti
- Category: KJNodes/image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageBatchMulti 节点便于通过将多个输入图像组合成一个单一批次来创建图像批次。该节点允许动态调整输入图像的数量，支持灵活且可扩展的批量图像处理方法。

# Input types
## Required
- inputcount
    - 指定要包含在批次中的图像数量，允许动态调整批次大小。
    - Comfy dtype: INT
    - Python dtype: int
- image_i
    - 表示要包含在批次中的任何图像，从 'image_1' 到 'image_{inputcount}'。每个 'image_i' 根据 'inputcount' 动态添加，共同构成图像的组合批次。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- images
    - 由单个输入图像聚合而成的组合图像批次。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchMulti:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "inputcount": ("INT", {"default": 2, "min": 2, "max": 1000, "step": 1}),
                "image_1": ("IMAGE", ),
                "image_2": ("IMAGE", ),
            },
    }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "combine"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Creates an image batch from multiple images.  
You can set how many inputs the node has,  
with the **inputcount** and clicking update.
"""

    def combine(self, inputcount, **kwargs):
        from nodes import ImageBatch
        image_batch_node = ImageBatch()
        image = kwargs["image_1"]
        for c in range(1, inputcount):
            new_image = kwargs[f"image_{c + 1}"]
            image, = image_batch_node.batch(new_image, image)
        return (image,)

```
