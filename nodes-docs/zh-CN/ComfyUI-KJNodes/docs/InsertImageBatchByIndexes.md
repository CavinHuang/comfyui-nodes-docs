
# Documentation
- Class name: InsertImageBatchByIndexes
- Category: KJNodes/image
- Output node: False

InsertImageBatchByIndexes节点旨在将特定图像插入到给定的图像批次中的指定索引位置，同时保持批次的原始序列顺序。这个功能对于需要精确操作图像序列的任务特别有用，例如将处理过的图像插回其原始上下文中。

# Input types
## Required
- images
    - 原始图像批次，新图像将被插入其中。它作为插入操作的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- images_to_insert
    - 要插入到原始批次中指定索引位置的图像。这个参数对于定义哪些图像被添加以及添加到哪里至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- insert_indexes
    - 原始批次中新图像应该被插入的索引位置。这个参数决定了插入的位置，将新图像与原始序列对齐。
    - Comfy dtype: INDEXES
    - Python dtype: List[int]

# Output types
- images_after_insert
    - 插入操作后更新的图像批次，保留了原始序列顺序，并在指定位置集成了新图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class InsertImageBatchByIndexes:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",), 
                "images_to_insert": ("IMAGE",), 
                "insert_indexes": ("INDEXES",),
            },
        }

    RETURN_TYPES = ("IMAGE", )
    RETURN_NAMES = ("images_after_insert", )
    FUNCTION = "insert"
    CATEGORY = "KJNodes/image"
    DESCRIPTION = """
This node is designed to be use with node FilterZeroMasksAndCorrespondingImages
It inserts the images_to_insert into images according to insert_indexes

Returns:
    images_after_insert: updated original images with origonal sequence order
"""
    
    def insert(self, images, images_to_insert, insert_indexes):        
        images_after_insert = images
        
        if images_to_insert is not None and insert_indexes is not None:
            images_to_insert_num = len(images_to_insert)
            insert_indexes_num = len(insert_indexes)
            if images_to_insert_num == insert_indexes_num:
                images_after_insert = []

                i_images = 0
                for i in range(len(images) + images_to_insert_num):
                    if i in insert_indexes:
                        images_after_insert.append(images_to_insert[insert_indexes.index(i)])
                    else:
                        images_after_insert.append(images[i_images])
                        i_images += 1
                        
                images_after_insert = torch.stack(images_after_insert, dim=0)
                
            else:
                print(f"[WARNING] skip this node, due to number of images_to_insert ({images_to_insert_num}) is not equal to number of insert_indexes ({insert_indexes_num})")


        return (images_after_insert, )

```
