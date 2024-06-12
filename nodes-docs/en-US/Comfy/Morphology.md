---
tags:
- Image
---

# ImageMorphology
## Documentation
- Class name: `Morphology`
- Category: `image/postprocessing`
- Output node: `False`

The Morphology node provides a suite of image morphology operations, such as erosion, dilation, opening, closing, gradient, top hat, and bottom hat transformations. These operations are fundamental for image processing and analysis, allowing for the modification of the geometrical structure of images.
## Input types
### Required
- **`image`**
    - The input image to be processed. The choice of operation and kernel size will determine how the image's structure is modified.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`operation`**
    - Specifies the morphological operation to be applied to the image. Options include 'erode', 'dilate', 'open', 'close', 'gradient', 'bottom_hat', and 'top_hat', each affecting the image's structure in unique ways.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`kernel_size`**
    - Determines the size of the kernel used for the morphological operation. A larger kernel size will have a more pronounced effect on the image's structure.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after applying the specified morphological operation. This image will have undergone structural modifications based on the operation and kernel size chosen.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Morphology:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image": ("IMAGE",),
                                "operation": (["erode",  "dilate", "open", "close", "gradient", "bottom_hat", "top_hat"],),
                                "kernel_size": ("INT", {"default": 3, "min": 3, "max": 999, "step": 1}),
                                }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "process"

    CATEGORY = "image/postprocessing"

    def process(self, image, operation, kernel_size):
        device = comfy.model_management.get_torch_device()
        kernel = torch.ones(kernel_size, kernel_size, device=device)
        image_k = image.to(device).movedim(-1, 1)
        if operation == "erode":
            output = erosion(image_k, kernel)
        elif operation == "dilate":
            output = dilation(image_k, kernel)
        elif operation == "open":
            output = opening(image_k, kernel)
        elif operation == "close":
            output = closing(image_k, kernel)
        elif operation == "gradient":
            output = gradient(image_k, kernel)
        elif operation == "top_hat":
            output = top_hat(image_k, kernel)
        elif operation == "bottom_hat":
            output = bottom_hat(image_k, kernel)
        else:
            raise ValueError(f"Invalid operation {operation} for morphology. Must be one of 'erode', 'dilate', 'open', 'close', 'gradient', 'tophat', 'bottomhat'")
        img_out = output.to(comfy.model_management.intermediate_device()).movedim(1, -1)
        return (img_out,)

```
