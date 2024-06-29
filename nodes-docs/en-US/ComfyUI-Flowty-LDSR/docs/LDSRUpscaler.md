---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# LDSR Upscale (all-in-one)
## Documentation
- Class name: `LDSRUpscaler`
- Category: `Flowty LDSR`
- Output node: `False`

The LDSRUpscaler node is designed to upscale images using the LDSR model, providing a high-level interface for enhancing image resolution through deep learning techniques. It abstracts the complexities of the underlying LDSR model operations, offering a simplified method for users to improve image quality with options for pre and post downscaling and different downsample methods.
## Input types
### Required
- **`model`**
    - Specifies the LDSR model to be used for upscaling. This model determines the upscaling technique and quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`images`**
    - The images to be upscaled. This input allows for batch processing of multiple images, enhancing their resolution.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`steps`**
    - Defines the number of steps for the upscaling process, affecting the quality and computation time of the upscaling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`pre_downscale`**
    - Optional pre-processing step to downscale images before upscaling, which can affect the final image quality and processing time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`post_downscale`**
    - Optional post-processing step to adjust the size of the upscaled images, allowing for customization of the output resolution.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`downsample_method`**
    - The method used for downsampling during the pre and post downscale steps, influencing the quality of the downscaled images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The upscaled images, enhanced in resolution through the LDSR upscaling process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LDSRUpscaler:
    @classmethod
    def INPUT_TYPES(s):
        model_list = get_filename_list("upscale_models")
        candidates = [name for name in model_list if 'last.ckpt' in name]
        if len(candidates) > 0:
            default_path = candidates[0]
        else:
            default_path = 'last.ckpt'

        return {
            "required": {
                "model": (model_list, {'default': default_path}),
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

    def upscale(self, model, images, steps, pre_downscale="None", post_downscale="None", downsample_method="Lanczos"):
        model_path = get_full_path("upscale_models", model)
        pbar = ProgressBar(int(steps))
        p = {"prev": 0}

        def prog(i):
            i = i + 1
            if i < p["prev"]:
                p["prev"] = 0
            pbar.update(i - p["prev"])
            p["prev"] = i

        ldsr = LDSR(modelPath=model_path, torchdevice=get_torch_device(), on_progress=prog)

        outputs = []

        for image in images:
            outputs.append(ldsr.superResolution(image, int(steps), pre_downscale, post_downscale, downsample_method))

        return (torch.stack(outputs),)

```
