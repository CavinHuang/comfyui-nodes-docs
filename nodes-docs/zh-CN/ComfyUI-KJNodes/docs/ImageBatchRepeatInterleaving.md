
# Documentation
- Class name: ImageBatchRepeatInterleaving
- Category: KJNodes/image
- Output node: False

ImageBatchRepeatInterleaving节点旨在通过重复批次中的每张图像指定次数来扩展图像批次。这个操作通过复制图像有效地增加了批次大小，这对于数据增强或确保统一的批处理大小非常有用。

# Input types
## Required
- images
    - images参数代表要重复的图像批次。它对于定义将进行重复处理的输入数据至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- repeats
    - repeats参数指定批次中每张图像应重复的次数。它通过确定每张图像的复制因子直接影响最终的批次大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- image
    - 输出是一个新的图像批次，其中每张原始图像已根据repeats参数重复，有效地扩大了批次大小。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchRepeatInterleaving:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "repeat"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Repeats each image in a batch by the specified number of times.  
Example batch of 5 images: 0, 1 ,2, 3, 4  
with repeats 2 becomes batch of 10 images: 0, 0, 1, 1, 2, 2, 3, 3, 4, 4  
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "images": ("IMAGE",),
                 "repeats": ("INT", {"default": 1, "min": 1, "max": 4096}),
        },
    } 
    
    def repeat(self, images, repeats):
       
        repeated_images = torch.repeat_interleave(images, repeats=repeats, dim=0)
        return (repeated_images, )

```
