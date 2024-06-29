---
tags:
- Latent
- Normalization
---

# ImageNormalize_Neg1_To_1
## Documentation
- Class name: `ImageNormalize_Neg1_To_1`
- Category: `KJNodes/misc`
- Output node: `False`

This node normalizes images to a range between -1 and 1, adjusting pixel values to fit within this scale. It's designed to standardize image data, making it suitable for further processing or model input where normalized data is required.
## Input types
### Required
- **`images`**
    - The images to be normalized. This normalization process adjusts the pixel values to ensure they fall within the -1 to 1 range, which is crucial for maintaining consistency in image processing tasks.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The normalized images, with pixel values adjusted to fall within the -1 to 1 range. This standardization is essential for models that expect input data to be normalized.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageNormalize_Neg1_To_1:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { 
                              "images": ("IMAGE",),
    
                              }}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "normalize"
    CATEGORY = "KJNodes/misc"
    DESCRIPTION = """
Normalize the images to be in the range [-1, 1]  
"""

    def normalize(self,images):
        images = images * 2.0 - 1.0
        return (images,)    

```
