# Documentation
- Class name: ImageBatchGet
- Category: image/batch
- Output node: False

ImageBatchGet节点旨在根据给定的索引从图像批次中提取特定的图像。它简化了处理图像批次的过程，允许对图像进行选择性检索，特别是在仅需要批次中的子集以供进一步处理或分析的情况下特别有用。

## Input types
### Required
- **images**
    - images参数表示要从中检索特定图像的图像批次。它在确定提取源方面起着关键作用。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- **index**
    - index参数指定从批次中提取的图像的位置。对于精确定位批次中的所需图像以进行进一步操作至关重要。
    - Comfy dtype: INT
    - Python dtype: int

## Output types
### `image`
- Comfy dtype: IMAGE
- 这个输出是从批次中指定索引处提取的图像。它允许对大型集合中的单个图像进行聚焦处理或分析。
- Python dtype: torch.Tensor

## Usage tips
- Infra type: GPU
- Common nodes: unknown


## Source code
```python
class ImageBatchGet:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "index": ("INT", {
                    "default": 1,
                    "min": 1,
                    "step": 1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/batch"

    def node(self, images, index):
        batch_size = images.shape[0]
        index = min(batch_size, index) - 1

        return (images[index].unsqueeze(0),)

```