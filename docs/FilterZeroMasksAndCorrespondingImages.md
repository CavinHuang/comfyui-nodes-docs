
# Documentation
- Class name: FilterZeroMasksAndCorrespondingImages
- Category: KJNodes/masking
- Output node: False

FilterZeroMasksAndCorrespondingImages节点旨在过滤掉一批掩码中所有零值掩码，并可选择性地根据非零掩码的存在过滤掉相应的图像。它的目标是通过确保只有相关的、非空的掩码及其关联图像被传递到下一步处理，从而简化图像和掩码数据的预处理过程。

# Input types
## Required
- masks
    - 待过滤的掩码列表，将移除完全由零值组成的掩码。这个参数对于识别进一步处理的相关数据至关重要。
    - Comfy dtype: MASK
    - Python dtype: List[torch.Tensor]

## Optional
- original_images
    - 与掩码对应的可选图像列表。如果提供，则保留与非零掩码关联的图像，使图像数据与过滤后的掩码数据对齐。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[List[torch.Tensor]]

# Output types
- non_zero_masks_out
    - 过滤后的非零掩码列表。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- non_zero_mask_images_out
    - 如果提供了原始图像，则为与非零掩码对应的图像列表。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[torch.Tensor]
- zero_mask_images_out
    - 如果提供了原始图像，则为与零掩码对应的图像列表。
    - Comfy dtype: IMAGE
    - Python dtype: Optional[torch.Tensor]
- zero_mask_images_out_indexes
    - 与零掩码对应的图像索引，用于追踪哪些图像被过滤掉了。
    - Comfy dtype: INDEXES
    - Python dtype: Optional[List[int]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FilterZeroMasksAndCorrespondingImages:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "masks": ("MASK",),
            },
            "optional": {
                "original_images": ("IMAGE",), 
            },
        }

    RETURN_TYPES = ("MASK", "IMAGE", "IMAGE", "INDEXES",)
    RETURN_NAMES = ("non_zero_masks_out", "non_zero_mask_images_out", "zero_mask_images_out", "zero_mask_images_out_indexes",)
    FUNCTION = "filter"
    CATEGORY = "KJNodes/masking"
    DESCRIPTION = """
Filter out all the empty (i.e. all zero) mask in masks  
Also filter out all the corresponding images in original_images by indexes if provide  
  
original_images (optional): If provided, need have same length as masks.
"""
    
    def filter(self, masks, original_images=None):
        non_zero_masks = []
        non_zero_mask_images = []
        zero_mask_images = []
        zero_mask_images_indexes = []
        
        masks_num = len(masks)
        also_process_images = False
        if original_images is not None:
            imgs_num = len(original_images)
            if len(original_images) == masks_num:
                also_process_images = True
            else:
                print(f"[WARNING] ignore input: original_images, due to number of original_images ({imgs_num}) is not equal to number of masks ({masks_num})")
        
        for i in range(masks_num):
            non_zero_num = np.count_nonzero(np.array(masks[i]))
            if non_zero_num > 0:
                non_zero_masks.append(masks[i])
                if also_process_images:
                    non_zero_mask_images.append(original_images[i])
            else:
                zero_mask_images.append(original_images[i])
                zero_mask_images_indexes.append(i)

        non_zero_masks_out = torch.stack(non_zero_masks, dim=0)
        non_zero_mask_images_out = zero_mask_images_out = zero_mask_images_out_indexes = None
        
        if also_process_images:
            non_zero_mask_images_out = torch.stack(non_zero_mask_images, dim=0)
            if len(zero_mask_images) > 0:
                zero_mask_images_out = torch.stack(zero_mask_images, dim=0)
                zero_mask_images_out_indexes = zero_mask_images_indexes

        return (non_zero_masks_out, non_zero_mask_images_out, zero_mask_images_out, zero_mask_images_out_indexes)

```
