
# Documentation
- Class name: ReplaceImagesInBatch
- Category: KJNodes/image
- Output node: False

ReplaceImagesInBatch节点用于在图像批次中替换一部分图像。它允许从指定的索引位置开始，用新的图像集替换原有图像批次中的部分图像。这个功能使得用户能够动态更新或修正图像批次中的内容，从而实现对批处理图像的灵活调整。

# Input types
## Required
- original_images
    - 这是将要进行替换操作的原始图像批次。作为基础内容，它是整个替换过程的起点，对节点的功能至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- replacement_images
    - 这是用于替换原始批次中部分图像的新图像集。它定义了将要引入批次的新内容，是替换操作的核心输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- start_index
    - 这个参数指定了在原始批次中开始替换的索引位置。它决定了修改的起始点，让用户能够精确控制更新的位置。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出的image是经过替换操作后的修改版图像批次。它反映了所有的更新和修正结果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ReplaceImagesInBatch:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "replace"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Replaces the images in a batch, starting from the specified start index,  
with the replacement images.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "original_images": ("IMAGE",),
                 "replacement_images": ("IMAGE",),
                 "start_index": ("INT", {"default": 1,"min": 0, "max": 4096, "step": 1}),
        },
    } 
    
    def replace(self, original_images, replacement_images, start_index):
        images = None
        if start_index >= len(original_images):
            raise ValueError("GetImageRangeFromBatch: Start index is out of range")
        end_index = start_index + len(replacement_images)
        if end_index > len(original_images):
            raise ValueError("GetImageRangeFromBatch: End index is out of range")
         # Create a copy of the original_images tensor
        original_images_copy = original_images.clone()
        original_images_copy[start_index:end_index] = replacement_images
        images = original_images_copy
        return (images, )

```
