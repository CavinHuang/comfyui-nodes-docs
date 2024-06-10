---
tags:
- Image
- ImageThresholding
---

# OtsuThreshold
## Documentation
- Class name: `OtsuThreshold`
- Category: `Bmad/CV/Thresholding`
- Output node: `False`

The OtsuThreshold node applies Otsu's thresholding method to an image to separate the foreground from the background. It optionally preprocesses the image with Gaussian blur to reduce noise and improve the thresholding result.
## Input types
### Required
- **`image`**
    - The input image to be thresholded. It is the primary data on which Otsu's method will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`threshold_type`**
    - Specifies the type of thresholding to apply, which influences how the foreground and background are distinguished.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`gaussian_blur_x`**
    - The kernel width for the Gaussian blur. A higher value means more blurring, which can help in reducing noise before thresholding.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`gaussian_blur_y`**
    - The kernel height for the Gaussian blur. Works in conjunction with gaussian_blur_x to define the blur extent.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`gaussian_border_type`**
    - Determines how the border of the image is handled during the Gaussian blur process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying Otsu's thresholding, with the foreground and background separated.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class OtsuThreshold:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                # "channel": (s.channels, {"default": "greyscale"}),
                "threshold_type": (thresh_types, {"default": thresh_types[0]}),
                "gaussian_blur_x": ("INT", {
                    "default": 4,
                    "min": 0,
                    "max": 200,
                    "step": 2
                }),
                "gaussian_blur_y": ("INT", {
                    "default": 4,
                    "min": 0,
                    "max": 200,
                    "step": 2
                }),
                "gaussian_border_type": (border_types, {"default": border_types[0]}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "otsu_thresthold"
    CATEGORY = "Bmad/CV/Thresholding"

    def otsu_thresthold(self, image, threshold_type, gaussian_blur_x, gaussian_blur_y, gaussian_border_type):
        image = tensor2opencv(image, 1)
        if gaussian_blur_x > 0 and gaussian_blur_y > 0:
            image = cv.GaussianBlur(image, (gaussian_blur_x + 1, gaussian_blur_y + 1),
                                    border_types_map[gaussian_border_type])
        _, image = cv.threshold(image, 0, 255, thresh_types_map[threshold_type] + cv.THRESH_OTSU)
        image = cv.cvtColor(image, cv.COLOR_GRAY2RGB)
        image = opencv2tensor(image)
        return (image,)

```
