---
tags:
- Mask
---

# FilterZeroMasksAndCorrespondingImages
## Documentation
- Class name: `FilterZeroMasksAndCorrespondingImages`
- Category: `KJNodes/masking`
- Output node: `False`

This node is designed to filter out all zero-value masks from a batch of masks and, optionally, filter out corresponding images based on the presence of non-zero masks. It aims to streamline the preprocessing of image and mask data by ensuring that only relevant, non-empty masks and their associated images are passed forward for further processing.
## Input types
### Required
- **`masks`**
    - A list of masks to be filtered, removing those that are entirely zero-valued. This parameter is essential for identifying relevant data for further processing.
    - Comfy dtype: `MASK`
    - Python dtype: `List[torch.Tensor]`
### Optional
- **`original_images`**
    - An optional list of images corresponding to the masks. If provided, images associated with non-zero masks are retained, aligning image data with filtered mask data.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[List[torch.Tensor]]`
## Output types
- **`non_zero_masks_out`**
    - Comfy dtype: `MASK`
    - The filtered list of non-zero masks.
    - Python dtype: `torch.Tensor`
- **`non_zero_mask_images_out`**
    - Comfy dtype: `IMAGE`
    - The list of images corresponding to the non-zero masks, if original images were provided.
    - Python dtype: `Optional[torch.Tensor]`
- **`zero_mask_images_out`**
    - Comfy dtype: `IMAGE`
    - The list of images corresponding to the zero masks, if original images were provided.
    - Python dtype: `Optional[torch.Tensor]`
- **`zero_mask_images_out_indexes`**
    - Comfy dtype: `INDEXES`
    - The indexes of images corresponding to the zero masks, useful for tracking which images were filtered out.
    - Python dtype: `Optional[List[int]]`
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
