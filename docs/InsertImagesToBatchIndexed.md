
# Documentation
- Class name: InsertImagesToBatchIndexed
- Category: KJNodes/image
- Output node: False

InsertImagesToBatchIndexed 节点旨在将指定的图像插入到原始图像批次的特定位置，从而有效地通过在指定位置添加新图像来修改原始序列。这一操作允许动态操作图像批次，使得用户能够根据各种应用需求自定义图像序列。

# Input types
## Required
- original_images
    - 代表将插入新图像的原始图像批次。它对于定义将被修改的基础序列至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- images_to_insert
    - 指定要插入原始批次的图像。此参数对于确定哪些新图像将被添加到序列中至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- indexes
    - 一个由逗号分隔的索引字符串，指示新图像应该插入原始批次的位置。此参数决定了图像将被添加的位置，从而影响批次的最终排列。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- image
    - 在指定索引处插入新图像后的修改后的图像批次。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class InsertImagesToBatchIndexed:
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "insertimagesfrombatch"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
Inserts images at the specified indices into the original image batch.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "original_images": ("IMAGE",),
                "images_to_insert": ("IMAGE",),
                "indexes": ("STRING", {"default": "0, 1, 2", "multiline": True}),
            },
        }
    
    def insertimagesfrombatch(self, original_images, images_to_insert, indexes):
        
        # Parse the indexes string into a list of integers
        index_list = [int(index.strip()) for index in indexes.split(',')]
        
        # Convert list of indices to a PyTorch tensor
        indices_tensor = torch.tensor(index_list, dtype=torch.long)
        
        # Ensure the images_to_insert is a tensor
        if not isinstance(images_to_insert, torch.Tensor):
            images_to_insert = torch.tensor(images_to_insert)
        
        # Insert the images at the specified indices
        for index, image in zip(indices_tensor, images_to_insert):
            original_images[index] = image
        
        return (original_images,)

```
