---
tags:
- Latent
- Normalization
---

# Batch Normalize (Image)
## Documentation
- Class name: `BatchNormalizeImage`
- Category: `image/filters`
- Output node: `False`

The BatchNormalizeImage node is designed to normalize a batch of images based on a given factor, adjusting each image's pixel values to have a standard deviation and mean that aligns more closely with the batch's overall characteristics. This process enhances the consistency of image data, making it more suitable for further processing or analysis.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the batch of images to be normalized. It is crucial for the normalization process as it directly influences the computation of mean and standard deviation used for normalization.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`factor`**
    - The 'factor' parameter controls the extent to which the original images are blended with their normalized versions. It plays a significant role in determining the final appearance of the normalized images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a batch of images that have been normalized according to the specified factor, potentially enhancing their suitability for further image processing tasks.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchNormalizeImage:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE", ),
                "factor": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01,  "round": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "batch_normalize"

    CATEGORY = "image/filters"

    def batch_normalize(self, images, factor):
        t = copy.deepcopy(images) # [B x H x W x C]
        
        t = t.movedim(-1,0) # [C x B x H x W]
        for c in range(t.size(0)):
            c_sd, c_mean = torch.std_mean(t[c], dim=None)
            
            for i in range(t.size(1)):
                i_sd, i_mean = torch.std_mean(t[c, i], dim=None)
                
                t[c, i] = (t[c, i] - i_mean) / i_sd
            
            t[c] = t[c] * c_sd + c_mean
        
        t = torch.lerp(images, t.movedim(0,-1), factor) # [B x H x W x C]
        return (t,)

```
