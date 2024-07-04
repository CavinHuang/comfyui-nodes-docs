
# Documentation
- Class name: GetImageRangeFromBatch
- Category: KJNodes/image
- Output node: False

GetImageRangeFromBatch节点设计用于从给定的图像批次中提取特定范围的图像，基于起始索引和所需的帧数。它能够方便地在大型图像集合中进行选择性处理或查看子集。

# Input types
## Required
- images
    - 将从中选择范围的图像集合。这个参数对于定义要处理的图像子集至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]
- start_index
    - 开始选择图像的索引。此参数决定了要提取的图像范围的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- num_frames
    - 从start_index开始要包含在选定范围内的图像数量。这定义了输出批次的大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 从输入批次中选择的图像范围，作为新的图像批次返回。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetImageRangeFromBatch:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "imagesfrombatch"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Creates a new batch using images from the input,  
batch, starting from start_index.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "images": ("IMAGE",),
                 "start_index": ("INT", {"default": 0,"min": -1, "max": 4096, "step": 1}),
                 "num_frames": ("INT", {"default": 1,"min": 1, "max": 4096, "step": 1}),
        },
    } 
    
    def imagesfrombatch(self, images, start_index, num_frames):
        if start_index == -1:
            start_index = len(images) - num_frames
        if start_index < 0 or start_index >= len(images):
            raise ValueError("GetImageRangeFromBatch: Start index is out of range")
        end_index = start_index + num_frames
        if end_index > len(images):
            raise ValueError("GetImageRangeFromBatch: End index is out of range")
        chosen_images = images[start_index:end_index]
        return (chosen_images, )

```
