---
tags:
- Blur
- VisualEffects
---

# Image Median Filter
## Documentation
- Class name: `Image Median Filter`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

The Image Median Filter node applies a median filter effect to images, enhancing their quality by reducing noise without significantly blurring the edges. It allows for customization of the filter's diameter and the sigma values for color and space, enabling fine-tuned adjustments to the filtering process.
## Input types
### Required
- **`image`**
    - The input image or images to which the median filter will be applied. This parameter is crucial for defining the target of the filtering operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`diameter`**
    - Specifies the diameter of the pixel neighborhood used during filtering. A larger diameter increases the area considered for calculating the median, affecting the level of detail and noise reduction.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sigma_color`**
    - Controls the filter's sensitivity to color differences. A higher sigma value means that colors farther apart will influence each other more, leading to smoother color transitions.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sigma_space`**
    - Determines the spatial extent of the filter. A higher value allows pixels farther apart to influence each other, resulting in a smoother image but potentially blurring edges.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image or images after applying the median filter, showcasing reduced noise and potentially enhanced detail without significant edge blurring.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Median_Filter:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "diameter": ("INT", {"default": 2.0, "min": 0.1, "max": 255, "step": 1}),
                "sigma_color": ("FLOAT", {"default": 10.0, "min": -255.0, "max": 255.0, "step": 0.1}),
                "sigma_space": ("FLOAT", {"default": 10.0, "min": -255.0, "max": 255.0, "step": 0.1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply_median_filter"

    CATEGORY = "WAS Suite/Image/Filter"

    def apply_median_filter(self, image, diameter, sigma_color, sigma_space):

        tensor_images = []
        for img in image:
            img = tensor2pil(img)
            # Apply Median Filter effect
            tensor_images.append(pil2tensor(medianFilter(img, diameter, sigma_color, sigma_space)))
        tensor_images = torch.cat(tensor_images, dim=0)

        return (tensor_images, )

```
