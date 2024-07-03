
# Documentation
- Class name: ImageBatchToList
- Category: Bmad/image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ImageBatchToList节点的主要功能是将一批图像转换为列表格式。这种转换对于需要对批处理中的每个图像单独进行处理或操作的场景非常有用。通过将批量图像分解为单独的图像列表，该节点为后续的图像处理任务提供了更大的灵活性。

# Input types
## Required
- images
    - 这个输入参数代表需要转换成列表的图像批次。它是节点操作的核心，允许节点遍历批次中的每一张图像并执行转换。这个输入对于节点功能的实现至关重要，因为它提供了待处理的原始数据。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - 输出是一个图像列表，其中批次中的每一张图像都被分离出来，成为列表中的独立元素。这种格式转换使得对单个图像的操作变得更加方便，为后续的图像处理流程提供了更多的可能性。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchToList:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"images": ("IMAGE",)}}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "to_list"
    CATEGORY = "Bmad/image"
    OUTPUT_IS_LIST = (True,)

    def to_list(self, images):
        image_list = [images[i][None, ...] for i in range(images.shape[0])]
        return (image_list,)

```
