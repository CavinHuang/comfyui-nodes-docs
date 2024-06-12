---
tags:
- Segmentation
---

# ImageSegmentation
## Documentation
- Class name: `ImageSegmentation`
- Category: `image/segmentation`
- Output node: `False`

The ImageSegmentation node specializes in segmenting images into distinct regions, separating foreground from background. It utilizes advanced models and techniques such as alpha matting to refine the segmentation edges, offering precise and customizable image segmentation capabilities.
## Input types
### Required
- **`images`**
    - The images to be segmented. This parameter is crucial as it directly influences the segmentation outcome.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`model`**
    - Specifies the segmentation model to use, affecting the accuracy and style of the segmentation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`alpha_matting`**
    - A boolean flag indicating whether alpha matting should be applied to improve the segmentation edges by making them more precise and natural-looking.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`alpha_matting_foreground_threshold`**
    - Threshold value for determining foreground pixels when alpha matting is applied, influencing the segmentation's precision.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`alpha_matting_background_threshold`**
    - Threshold value for identifying background pixels in the context of alpha matting, affecting the segmentation's accuracy.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`alpha_matting_erode_size`**
    - Size of the erosion applied to the mask during alpha matting, which can refine the segmentation edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`post_process_mask`**
    - Indicates whether the segmented mask should undergo post-processing to enhance quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The segmented images, where the foreground is separated from the background, ready for further processing or visualization.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageSegmentation:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "model": ([
                              "u2net",
                              "u2netp",
                              "u2net_human_seg",
                              "u2net_cloth_seg",
                              "silueta",
                              "isnet-general-use",
                              "isnetis",
                              "modnet-p",
                              "modnet-w"
                          ],),
                "alpha_matting": (["true", "false"],),
                "alpha_matting_foreground_threshold": ("INT", {
                    "default": 240,
                    "max": 250,
                    "step": 5
                }),
                "alpha_matting_background_threshold": ("INT", {
                    "default": 20,
                    "max": 250,
                    "step": 5
                }),
                "alpha_matting_erode_size": ("INT", {
                    "default": 10,
                    "step": 1
                }),
                "post_process_mask": (["false", "true"],),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "node"
    CATEGORY = "image/segmentation"

    def node(
            self,
            images,
            model,
            alpha_matting,
            alpha_matting_foreground_threshold,
            alpha_matting_background_threshold,
            alpha_matting_erode_size,
            post_process_mask,
            session=None
    ):
        if session is None:
            if model == "isnetis":
                session = new_session("isnet-anime")
            elif model == "modnet-p":
                session = ModnetPhotographicSession(model)
            elif model == "modnet-w":
                session = ModnetWebcamSession(model)
            else:
                session = new_session(model)

        def verst(image):
            img: Image = image.tensor_to_image()

            return remove(
                img, alpha_matting == "true",
                alpha_matting_foreground_threshold,
                alpha_matting_background_threshold,
                alpha_matting_erode_size, session,
                False, post_process_mask == "true"
            ).image_to_tensor()

        return (torch.stack([
            verst(images[i]) for i in range(len(images))
        ]),)

```
