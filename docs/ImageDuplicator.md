
# Documentation
- Class name: ImageDuplicator
- Category: image
- Output node: False

ImageDuplicator节点的设计目的是对给定批次中的每张图像进行复制，从而通过重复图像来有效地增加图像数量。该节点的作用是扩充数据集或为需要同一图像多个实例的处理过程准备数据。

# Input types
## Required
- images
    - 需要复制的图像。这个参数至关重要，因为它通过指定需要处理和复制的图像直接影响节点的操作。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- dup_times
    - 指定每张图像应该被复制的次数。这个参数控制复制的程度，从而决定节点产生的图像总数。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 节点的输出，包含原始图像及其副本，有效地增加了图像的总数。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
