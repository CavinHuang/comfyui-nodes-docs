---
tags:
- AlphaChannel
- Image
---

# Alpha Clean
## Documentation
- Class name: `AlphaClean`
- Category: `image/filters`
- Output node: `False`

The AlphaClean node is designed for image preprocessing, specifically targeting the enhancement and cleaning of image alpha channels. It employs techniques such as bilateral filtering, Gaussian blurring, and dynamic thresholding to refine the transparency and edges of images, making it particularly useful in graphics and image processing applications where precise alpha manipulation is required.
## Input types
### Required
- **`images`**
    - The input images to be processed, expected to have their alpha channels cleaned and enhanced.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`radius`**
    - Specifies the radius for Gaussian blurring, affecting the smoothness of the alpha channel's edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`fill_holes`**
    - Determines whether and how much to fill holes in the alpha channel, enhancing image completeness.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`white_threshold`**
    - Sets the threshold for considering a pixel as white, aiding in the separation of foreground from background.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`extra_clip`**
    - Applies an additional clipping factor to the image, adjusting the intensity of the cleaning effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The processed images with cleaned and enhanced alpha channels, ready for further use or display.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class AlphaClean:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "images": ("IMAGE",),
                "radius": ("INT", {
                    "default": 8,
                    "min": 1,
                    "max": 64,
                    "step": 1
                }),
                "fill_holes": ("INT", {
                    "default": 1,
                    "min": 0,
                    "max": 16,
                    "step": 1
                }),
                "white_threshold": ("FLOAT", {
                    "default": 0.9,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01
                }),
                "extra_clip": ("FLOAT", {
                    "default": 0.98,
                    "min": 0.01,
                    "max": 1.0,
                    "step": 0.01
                }),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "alpha_clean"

    CATEGORY = "image/filters"

    def alpha_clean(self, images: torch.Tensor, radius: int, fill_holes: int, white_threshold: float, extra_clip: float):
        
        d = radius * 2 + 1
        i_dup = copy.deepcopy(images.cpu().numpy())
        
        for index, image in enumerate(i_dup):
            
            cleaned = cv2.bilateralFilter(image, 9, 0.05, 8)
            
            alpha = np.clip((image - white_threshold) / (1 - white_threshold), 0, 1)
            rgb = image * alpha
            
            alpha = cv2.GaussianBlur(alpha, (d,d), 0) * 0.99 + np.average(alpha) * 0.01
            rgb = cv2.GaussianBlur(rgb, (d,d), 0) * 0.99 + np.average(rgb) * 0.01
            
            rgb = rgb / np.clip(alpha, 0.00001, 1)
            rgb = rgb * extra_clip
            
            cleaned = np.clip(cleaned / rgb, 0, 1)
            
            if fill_holes > 0:
                fD = fill_holes * 2 + 1
                gamma = cleaned * cleaned
                kD = np.ones((fD, fD), np.uint8)
                kE = np.ones((fD + 2, fD + 2), np.uint8)
                gamma = cv2.dilate(gamma, kD, iterations=1)
                gamma = cv2.erode(gamma, kE, iterations=1)
                gamma = cv2.GaussianBlur(gamma, (fD, fD), 0)
                cleaned = np.maximum(cleaned, gamma)

            i_dup[index] = cleaned
        
        return (torch.from_numpy(i_dup),)

```
