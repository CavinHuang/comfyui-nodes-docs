---
tags:
- Image
- ImageThresholding
---

# Image Threshold
## Documentation
- Class name: `Image Threshold`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

The Image Threshold node is designed to process images by applying a thresholding technique, converting them into binary images based on a specified threshold value. This operation is fundamental in image processing tasks where distinguishing between foreground and background is necessary.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the input image to be thresholded. It plays a crucial role in the thresholding process as the source on which the threshold will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`threshold`**
    - The 'threshold' parameter determines the cutoff value for converting the grayscale image into a binary image. It directly influences the outcome of the thresholding process by specifying the intensity level at which pixels are classified as either foreground or background.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a binary image where pixels are either set to the maximum value (representing the foreground) or zero (representing the background), based on the applied threshold.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Threshold:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_threshold"

    CATEGORY = "WAS Suite/Image/Process"

    def image_threshold(self, image, threshold=0.5):
        return (pil2tensor(self.apply_threshold(tensor2pil(image), threshold)), )

    def apply_threshold(self, input_image, threshold=0.5):
        # Convert the input image to grayscale
        grayscale_image = input_image.convert('L')

        # Apply the threshold to the grayscale image
        threshold_value = int(threshold * 255)
        thresholded_image = grayscale_image.point(
            lambda x: 255 if x >= threshold_value else 0, mode='L')

        return thresholded_image

```
