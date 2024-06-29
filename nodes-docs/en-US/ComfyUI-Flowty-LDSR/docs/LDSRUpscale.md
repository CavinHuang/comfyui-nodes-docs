---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# LDSR Upscale
## Documentation
- Class name: `LDSRUpscale`
- Category: `Flowty LDSR`
- Output node: `False`

The LDSRUpscale node is designed to upscale images using a specified model, with options for pre and post downscaling, and a choice of downsample methods. It allows for detailed control over the upscaling process, including the number of steps and downscale factors, to enhance image resolution effectively.
## Input types
### Required
- **`upscale_model`**
    - Specifies the model to be used for upscaling the images. This choice determines the upscaling technique and quality.
    - Comfy dtype: `UPSCALE_MODEL`
    - Python dtype: `str`
- **`images`**
    - A collection of images to be upscaled. This input allows the node to process multiple images in a single operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`steps`**
    - Defines the number of steps to be used in the upscaling process, affecting the detail and quality of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`pre_downscale`**
    - Optional pre-processing step to downscale images before upscaling, which can affect the upscaling quality and performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`post_downscale`**
    - Optional post-processing step to adjust the size of the upscaled images, allowing for size customization or restoration to original dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`downsample_method`**
    - The method used for downsampling during pre and post downscale steps, influencing the quality of the downscaled images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The upscaled images, enhanced in resolution and detail through the specified upscaling process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [CR Image Output](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Image Output.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)



## Source code
```python
class LDSRUpscale:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "upscale_model": ("UPSCALE_MODEL",),
                "images": ("IMAGE",),
                "steps": (["25", "50", "100", "250", "500", "1000"], {"default": "100"}),
                "pre_downscale": (['None', '1/2', '1/4'], {"default": "None"}),
                "post_downscale": (['None', 'Original Size', '1/2', '1/4'], {"default": "None"}),
                "downsample_method": (['Nearest', 'Lanczos'], {"default": "Lanczos"}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "upscale"

    CATEGORY = "Flowty LDSR"

    def upscale(self, upscale_model, images, steps, pre_downscale="None", post_downscale="None", downsample_method="Lanczos"):
        pbar = ProgressBar(int(steps))
        p = {"prev": 0}

        def prog(i):
            i = i + 1
            if i < p["prev"]:
                p["prev"] = 0
            pbar.update(i - p["prev"])
            p["prev"] = i

        ldsr = LDSR(model=upscale_model, on_progress=prog)

        outputs = []

        for image in images:
            outputs.append(ldsr.superResolution(image, int(steps), pre_downscale, post_downscale, downsample_method))

        return (torch.stack(outputs),)

```
