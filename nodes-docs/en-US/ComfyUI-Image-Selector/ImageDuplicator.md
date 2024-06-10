---
tags:
- Batch
- Image
- ImageDuplication
---

# ImageDuplicator
## Documentation
- Class name: `ImageDuplicator`
- Category: `image`
- Output node: `False`

The ImageDuplicator node is designed to duplicate each image in a given batch, effectively increasing the number of images by replicating them. This node serves the purpose of augmenting the dataset or preparing the data for processes that require multiple instances of the same image.
## Input types
### Required
- **`images`**
    - The images to be duplicated. This parameter is crucial as it directly influences the node's operation by specifying which images are to be processed and duplicated.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`dup_times`**
    - Specifies the number of times each image should be duplicated. This parameter controls the extent of duplication, thereby determining the total number of images produced by the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the node, consisting of the original images along with their duplicates, effectively increasing the total number of images.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageDuplicator:
    """
    Duplicate each images and pipe through
    """

    def __init__(self):
        self._name = "ImageDuplicator"
        pass

    @classmethod
    def INPUT_TYPES(s):
        """
        Input: copies you want to get
        """
        return {
            "required": {
                "images": ("IMAGE", ),
                "dup_times": ("INT", {
                    "default": 2,
                    "min": 1,
                    "max": 16,
                    "step": 1,
                }),
            },
        }

    RETURN_TYPES = ("IMAGE", )
    # RETURN_NAMES = ("image_output_name",)

    FUNCTION = "run"

    OUTPUT_NODE = False

    CATEGORY = "image"

    def run(self, images: torch.Tensor, dup_times: int):
        """
        对输入的图像张量进行复制多次，并将复制后的张量拼接起来返回。

        Args:
            images (torch.Tensor): 输入的图像张量，维度为 (batch_size, channels, height, width)。
            dup_times (int): 复制的次数。

        Returns:
            torch.Tensor: 拼接后的图像张量，维度为 (batch_size * dup_times, channels, height, width)。

        """

        tensor_list = [images
                       ] + [torch.clone(images) for _ in range(dup_times - 1)]

        print(
            f"ImageDuplicator: dup {dup_times} times,",
            f"return {len(tensor_list)} images",
        )
        return (torch.cat(tensor_list), )

```
