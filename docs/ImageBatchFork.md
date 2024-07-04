# Documentation
- Class name: ImageBatchFork
- Category: image/batch
- Output node: False

ImageBatchFork节点旨在根据指定的优先级将一批图像分为两批。此功能对于在批次处理或算法中根据关键工作流程或算法划分批次的图像非常有用。

## Input types
### Required
- **images**
    - 'images'参数表示要分割的一批图像。它决定了输出批次的结构。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- **priority**
    - 'priority'参数决定在原始批次大小为奇数时，两个结果批次中哪一个可能包含额外的图像。这影响了两批次之间图像的分布。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Output types
- **image**
    - Comfy dtype: IMAGE
    - 输出由两批分开的图像组成，根据指定的优先级进行划分。
    - Python dtype: Tuple[torch.Tensor, torch.Tensor]

## Usage tips
- Infra type: GPU
- Common nodes: unknown

## Source code
```python
class ImageBatchFork:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "priority": (["first", "second"],),
            },
        }

    RETURN_TYPES = ("IMAGE", "IMAGE")
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images, priority):
        batch_size = images.shape[0]

        if batch_size == 1:
            return images, images
        elif batch_size % 2 == 0:
            first_batch = batch_size // 2
            second_batch = batch_size // 2
        else:
            if priority == "first":
                first_batch = batch_size // 2 + 1
                second_batch = batch_size // 2
            elif priority == "second":
                first_batch = batch_size // 2
                second_batch = batch_size // 2 + 1
            else:
                raise ValueError("Invalid priority specified.")

        return images[:first_batch], images[-second_batch:]
```