---
tags:
- Image
---

# MorphologicOperation
## Documentation
- Class name: `MorphologicOperation`
- Category: `Bmad/CV/Morphology`
- Output node: `False`

The MorphologicOperation node provides a comprehensive suite of morphological operations for image processing, including erosion, dilation, opening, closing, gradient, top hat, and bottom hat transformations. It is designed to apply these operations to images, allowing for various forms of structural modifications and analysis within a binary image context.
## Input types
### Required
- **`src`**
    - The source image to be processed through morphological operations, enabling structural modifications based on the specified operation, kernel type, and iterations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`operation`**
    - Determines the specific morphological operation to be applied, such as erosion or dilation, influencing the structural transformation of the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`kernel_type`**
    - Specifies the shape of the kernel used in the morphological operation, affecting the nature of the transformation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`kernel_size_x`**
    - The horizontal size of the kernel, influencing the scale and impact of the operation on the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`kernel_size_y`**
    - The vertical size of the kernel, affecting the scale and depth of the morphological transformation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`iterations`**
    - The number of times the morphological operation is applied, allowing for incremental structural changes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after the morphological operations, reflecting the structural changes made.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MorphologicOperation:
    # I did not want to make this node, but alas, I found no suit w/ the top/black hat operation
    # so might as well make a generic node w/ all the operations
    # just return as BW and implement convert node

    operation_map = {
        "MORPH_ERODE": cv.MORPH_ERODE,
        "MORPH_DILATE": cv.MORPH_DILATE,
        "MORPH_OPEN": cv.MORPH_OPEN,
        "MORPH_CLOSE": cv.MORPH_CLOSE,
        "MORPH_GRADIENT": cv.MORPH_GRADIENT,
        "MORPH_TOPHAT": cv.MORPH_TOPHAT,
        "MORPH_BLACKHAT": cv.MORPH_BLACKHAT,
    }
    operations = list(operation_map.keys())

    kernel_types_map = {
        "MORPH_RECT": cv.MORPH_RECT,
        "MORPH_ELLIPSE": cv.MORPH_ELLIPSE,
        "MORPH_CROSS": cv.MORPH_CROSS,
    }
    kernel_types = list(kernel_types_map.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",),
                "operation": (s.operations, {"default": s.operations[0]}),
                "kernel_type": (s.kernel_types, {"default": s.kernel_types[0]}),
                "kernel_size_x": ("INT", {"default": 4, "min": 2, "step": 2}),
                "kernel_size_y": ("INT", {"default": 4, "min": 2, "step": 2}),
                "iterations": ("INT", {"default": 1, "step": 1}),
            },
            # TODO maybe add optional input for custom kernel
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply"
    CATEGORY = "Bmad/CV/Morphology"

    def apply(self, src, operation, kernel_type, kernel_size_x, kernel_size_y, iterations):
        img = tensor2opencv(src, 1)
        kernel = cv.getStructuringElement(self.kernel_types_map[kernel_type], (kernel_size_x + 1, kernel_size_y + 1))
        for i in range(iterations):
            img = cv.morphologyEx(img, self.operation_map[operation], kernel)
        return (opencv2tensor(img),)

```
