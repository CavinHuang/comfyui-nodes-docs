
# Documentation
- Class name: GetImagesFromBatchIndexed
- Category: KJNodes/image
- Output node: False

GetImagesFromBatchIndexed节点旨在根据指定的索引从给定的图像批次中选择性地检索图像，有效地创建一个仅包含给定位置图像的新批次。

# Input types
## Required
- images
    - 要从中选择图像的批次。索引决定了哪些图像将被包含在输出批次中。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- indexes
    - 指定要从批次中选择的图像索引的字符串。这允许灵活地选择图像。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 返回指定索引处选择的图像，作为一个新的批次。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GetImagesFromBatchIndexed:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "indexedimagesfrombatch"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Selects and returns the images at the specified indices as an image batch.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                 "images": ("IMAGE",),
                 "indexes": ("STRING", {"default": "0, 1, 2", "multiline": True}),
        },
    } 
    
    def indexedimagesfrombatch(self, images, indexes):
        
        # Parse the indexes string into a list of integers
        index_list = [int(index.strip()) for index in indexes.split(',')]
        
        # Convert list of indices to a PyTorch tensor
        indices_tensor = torch.tensor(index_list, dtype=torch.long)
        
        # Select the images at the specified indices
        chosen_images = images[indices_tensor]
        
        return (chosen_images,)

```
