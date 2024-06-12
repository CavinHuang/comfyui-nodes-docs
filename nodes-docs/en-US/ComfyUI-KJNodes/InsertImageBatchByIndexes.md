---
tags:
- Batch
- Image
- ImageBatch
---

# InsertImageBatchByIndexes
## Documentation
- Class name: `InsertImageBatchByIndexes`
- Category: `KJNodes/image`
- Output node: `False`

The InsertImageBatchByIndexes node is designed for integrating specific images into a given batch of images at designated indexes, maintaining the original sequence order of the batch. This functionality is particularly useful for tasks that require precise manipulation of image sequences, such as inserting processed images back into their original context.
## Input types
### Required
- **`images`**
    - The original batch of images where new images are to be inserted. It serves as the base for the insertion operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`images_to_insert`**
    - The images to be inserted into the original batch at specified indexes. This parameter is crucial for defining which images are added and where.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`insert_indexes`**
    - The indexes within the original batch where the new images should be inserted. This parameter dictates the positions for insertion, aligning new images with the original sequence.
    - Comfy dtype: `INDEXES`
    - Python dtype: `List[int]`
## Output types
- **`images_after_insert`**
    - Comfy dtype: `IMAGE`
    - The updated batch of images after insertion, preserving the original sequence order with the new images integrated at specified positions.
    - Python dtype: `torch.Tensor`
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
