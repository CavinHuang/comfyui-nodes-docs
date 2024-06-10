---
tags:
- ImageFilter
- VisualEffects
---

# Image Edge Detection Filter
## Documentation
- Class name: `Image Edge Detection Filter`
- Category: `WAS Suite/Image/Filter`
- Output node: `False`

This node applies edge detection filters to images, offering different modes such as normal edge detection and Laplacian edge detection. It transforms images by highlighting their edges, enhancing the visual distinction of shapes and boundaries within the image.
## Input types
### Required
- **`image`**
    - The input image to apply edge detection on. It is crucial for identifying and enhancing the edges within the image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - Specifies the edge detection mode to use, either 'normal' or 'laplacian'. This choice affects how edges are detected and highlighted in the image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with edges detected and enhanced, represented as a tensor. This image visually emphasizes the edges and boundaries within the original image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Edge:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mode": (["normal", "laplacian"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_edges"

    CATEGORY = "WAS Suite/Image/Filter"

    def image_edges(self, image, mode):

        # Convert image to PIL
        image = tensor2pil(image)

        # Detect edges
        if mode:
            if mode == "normal":
                image = image.filter(ImageFilter.FIND_EDGES)
            elif mode == "laplacian":
                image = image.filter(ImageFilter.Kernel((3, 3), (-1, -1, -1, -1, 8,
                                                                 -1, -1, -1, -1), 1, 0))
            else:
                image = image

        return (torch.from_numpy(np.array(image).astype(np.float32) / 255.0).unsqueeze(0), )

```
