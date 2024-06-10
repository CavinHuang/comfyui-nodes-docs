---
tags:
- Segmentation
---

# Rect Grab Cut
## Documentation
- Class name: `Rect Grab Cut`
- Category: `Bmad/CV/GrabCut`
- Output node: `False`

The RectGrabCut node is designed for image segmentation using the GrabCut algorithm with a predefined rectangular area. It aims to separate the foreground from the background within the specified rectangle, enhancing the focus on the desired object or area in an image.
## Input types
### Required
- **`image`**
    - The input image to be segmented. This image is processed to separate the foreground from the background within a specified rectangular area.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`x1`**
    - The x-coordinate of the top left corner of the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y1`**
    - The y-coordinate of the top left corner of the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`x2`**
    - The x-coordinate of the bottom right corner of the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y2`**
    - The y-coordinate of the bottom right corner of the rectangle.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`iterations`**
    - The number of iterations the GrabCut algorithm should run to refine the segmentation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`output_format`**
    - The format in which the segmented image should be outputted, affecting how the image is processed and displayed post-segmentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The segmented image with the foreground separated from the background within the specified rectangular area.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RectGrabCut:
    # TODO add option to crop or just leave as 0 the section outside the rect
    # TODO maybe add option to exclude PR_BGD or include PR_FGD in outputMask

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "x1": ("INT", {
                    "default": 5,
                    "min": 0,
                    "max": 2000,
                    "step": 1
                }),
                "y1": ("INT", {
                    "default": 5,
                    "min": 0,
                    "max": 2000,
                    "step": 1
                }),
                "x2": ("INT", {
                    "default": 5,
                    "min": 0,
                    "max": 2000,
                    "step": 1
                }),
                "y2": ("INT", {
                    "default": 5,
                    "min": 0,
                    "max": 2000,
                    "step": 1
                }),
                "iterations": ("INT", {
                    "default": 25,
                    "min": 0,
                    "max": 200,
                    "step": 1
                }),
                "output_format": (image_output_formats_options, {
                    "default": image_output_formats_options[0]
                })
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "grab_cut"

    CATEGORY = "Bmad/CV/GrabCut"

    def grab_cut(self, image, iterations, x1, y1, x2, y2, output_format):
        image = tensor2opencv(image)

        fg_model = np.zeros((1, 65), dtype="float")
        bg_model = np.zeros((1, 65), dtype="float")
        mask = np.zeros(image.shape[:2], dtype="uint8")
        rect = (x1, y1, x2, y2)

        mask, bg_model, fg_model = cv.grabCut(image, mask, rect, bg_model,
                                              fg_model, iterCount=iterations, mode=cv.GC_INIT_WITH_RECT)

        # generate mask with "pixels" classified as background/foreground
        output_mask = np.where((mask == cv.GC_BGD) | (mask == cv.GC_PR_BGD),
                               0, 1)
        output_mask = (output_mask * 255).astype("uint8")

        output_mask = maybe_convert_img(output_mask, 1, image_output_formats_options_map[output_format])
        image = opencv2tensor(output_mask)
        # image = image[y1:y2, x1:x2] #TODO maybe add option whether to crop or not

        return (image,)

```
