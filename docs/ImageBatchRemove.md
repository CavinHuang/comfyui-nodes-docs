# Documentation
- Class name: ImageBatchRemove
- Category: image/batch
- Output node: False

ImageBatchRemove节点旨在根据索引从批次中选择性地移除图像。这一功能对于需要排除特定图像以供进一步处理的操作至关重要，从而允许对图像集合进行动态操作。

## Input types
### Required
- **images**
    - 'images'参数表示将要修改的图像批次。它用于指定受更改影响的图像组。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- **index**
    - 'index'参数确定了要从批次中移除的图像的位置。它在识别需要排除的具体图像方面起着关键作用，确保对图像集合进行精确操作。
    - Comfy dtype: INT
    - Python dtype: int

## Output types
- **image**
    - 返回一个新批次的图像，其中指定的图像已被删除，这有助于动态调整图像集合。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

## Usage tips
- Infra type: GPU
- Common nodes: unknown


## Source code
```python
class ImageBatchRemove:
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
        index = min(batch_size, index - 1)

        return (torch.cat((images[:index], images[index + 1:]), dim=0),)
```