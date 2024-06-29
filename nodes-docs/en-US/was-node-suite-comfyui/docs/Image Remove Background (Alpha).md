---
tags:
- BackgroundRemoval
- Image
---

# Image Remove Background (Alpha)
## Documentation
- Class name: `Image Remove Background (Alpha)`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node specializes in removing the background from images, utilizing various techniques to distinguish between foreground and background elements. It offers flexibility in handling different scenarios through parameters like mode, threshold, and smoothing, aiming to produce images with transparent backgrounds or altered backgrounds according to the specified requirements.
## Input types
### Required
- **`images`**
    - The input image or images to process. This parameter is crucial as it serves as the base for background removal operations, determining the node's execution path and the quality of the output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Union[torch.Tensor, List[torch.Tensor]]`
- **`mode`**
    - Specifies the operation mode, such as removing the background or altering it. This parameter influences the approach taken for processing the image, affecting the outcome significantly.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`threshold`**
    - A value used to differentiate between the background and foreground, playing a key role in determining which parts of the image are retained or removed.
    - Comfy dtype: `INT`
    - Python dtype: `Union[int, float]`
- **`threshold_tolerance`**
    - Defines the tolerance level for the threshold, allowing for finer control over the differentiation between background and foreground. This parameter helps in adjusting the sensitivity of the background removal process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The processed image or images with the background removed or altered, depending on the mode and parameters used. This output is essential for applications requiring images with transparent or customized backgrounds.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Remove_Background:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "mode": (["background", "foreground"],),
                "threshold": ("INT", {"default": 127, "min": 0, "max": 255, "step": 1}),
                "threshold_tolerance": ("INT", {"default": 2, "min": 1, "max": 24, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "image_remove_background"

    CATEGORY = "WAS Suite/Image/Process"

    def image_remove_background(self, images, mode='background', threshold=127, threshold_tolerance=2):
        return (self.remove_background(images, mode, threshold, threshold_tolerance), )

    def remove_background(self, image, mode, threshold, threshold_tolerance):
        images = []
        image = [tensor2pil(img) for img in image]
        for img in image:
            grayscale_image = img.convert('L')
            if mode == 'background':
                grayscale_image = ImageOps.invert(grayscale_image)
                threshold = 255 - threshold  # adjust the threshold for "background" mode
            blurred_image = grayscale_image.filter(
                ImageFilter.GaussianBlur(radius=threshold_tolerance))
            binary_image = blurred_image.point(
                lambda x: 0 if x < threshold else 255, '1')
            mask = binary_image.convert('L')
            inverted_mask = ImageOps.invert(mask)
            transparent_image = img.copy()
            transparent_image.putalpha(inverted_mask)
            images.append(pil2tensor(transparent_image))
        batch = torch.cat(images, dim=0)

        return batch

```
