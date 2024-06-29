---
tags:
- ImageFilter
- VisualEffects
---

# Enhance Detail
## Documentation
- Class name: `EnhanceDetail`
- Category: `image/filters`
- Output node: `False`

The EnhanceDetail node is designed to improve the visual quality of images by applying a series of filters that enhance details, adjust sharpness, and potentially reduce noise. It operates by manipulating the image's details relative to its guided filter output, allowing for refined control over the enhancement process.
## Input types
### Required
- **`images`**
    - The input images to be enhanced. This parameter is crucial as it directly influences the enhancement process by serving as the base for all subsequent operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`filter_radius`**
    - Specifies the radius of the filter applied during the enhancement process. A larger radius can lead to more pronounced detail enhancement but may also introduce more processing time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma`**
    - Controls the sigma parameter of the guided filter, affecting the degree of smoothing and detail preservation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`denoise`**
    - Determines the strength of the denoising filter. A higher value can reduce noise but may also diminish fine details.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`detail_mult`**
    - A multiplier for the detail enhancement. Adjusting this value allows for fine-tuning the intensity of the detail enhancement effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output of the node, which are the images after the enhancement process. These images are expected to have improved detail and potentially reduced noise.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class EnhanceDetail:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "filter_radius": ("INT", {
                    "default": 2,
                    "min": 1,
                    "max": 64,
                    "step": 1
                }),
                "sigma": ("FLOAT", {
                    "default": 0.1,
                    "min": 0.01,
                    "max": 100.0,
                    "step": 0.01
                }),
                "denoise": ("FLOAT", {
                    "default": 0.1,
                    "min": 0.0,
                    "max": 10.0,
                    "step": 0.01
                }),
                "detail_mult": ("FLOAT", {
                    "default": 2.0,
                    "min": 0.0,
                    "max": 100.0,
                    "step": 0.1
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "enhance"

    CATEGORY = "image/filters"

    def enhance(self, images: torch.Tensor, filter_radius: int, sigma: float, denoise: float, detail_mult: float):
        
        if filter_radius == 0:
            return (images,)
        
        d = filter_radius * 2 + 1
        s = sigma / 10
        n = denoise / 10
        
        dup = copy.deepcopy(images.cpu().numpy())
        
        for index, image in enumerate(dup):
            imgB = image
            if denoise>0.0:
                imgB = cv2.bilateralFilter(image, d, n, d)
            
            imgG = np.clip(guidedFilter(image, image, d, s), 0.001, 1)
            
            details = (imgB/imgG - 1) * detail_mult + 1
            dup[index] = np.clip(details*imgG - imgB + image, 0, 1)
        
        return (torch.from_numpy(dup),)

```
