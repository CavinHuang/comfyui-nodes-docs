---
tags:
- Image
---

# MorphologicSkeletoning
## Documentation
- Class name: `MorphologicSkeletoning`
- Category: `Bmad/CV/Morphology`
- Output node: `False`

The MorphologicSkeletoning node is designed for computing the morphological skeleton of an image. It transforms the input image into a minimal, yet fully representative, skeletal form that retains the structure and connectivity of the original shape.
## Input types
### Required
- **`src`**
    - The 'src' parameter represents the source image to be processed. It is essential for determining the structure and connectivity of the original shape in the skeletal transformation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a skeletal representation of the input image, preserving the structure and connectivity of the original shape in a minimal form.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MorphologicSkeletoning:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "src": ("IMAGE",)
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "compute"
    CATEGORY = "Bmad/CV/Morphology"

    def compute(self, src):
        from skimage.morphology import skeletonize
        img = tensor2opencv(src, 1)
        _, img = cv.threshold(img, 127, 1, cv.THRESH_BINARY)  # ensure it is binary and set max value to 1.
        skel = skeletonize(img) * 255
        img = opencv2tensor(skel)
        return (img,)

```
