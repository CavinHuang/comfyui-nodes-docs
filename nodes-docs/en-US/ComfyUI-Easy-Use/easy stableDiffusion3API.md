---
tags:
- Image
---

# Stable Diffusion 3 (API)
## Documentation
- Class name: `easy stableDiffusion3API`
- Category: `EasyUse/API`
- Output node: `False`

This node facilitates the generation of images using the Stable Diffusion model, allowing users to specify positive and negative prompts, select a model variant, define the aspect ratio, and adjust parameters such as seed and denoise level for customized image creation.
## Input types
### Required
- **`positive`**
    - The positive prompt guides the image generation towards desired themes or elements, influencing the model's output by specifying what to include.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative`**
    - The negative prompt steers the image generation away from certain themes or elements, helping to avoid undesired aspects in the model's output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`model`**
    - Specifies the variant of the Stable Diffusion model to be used, allowing for selection between standard and turbo modes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`aspect_ratio`**
    - Determines the aspect ratio of the generated image, offering a range of predefined ratios to fit various needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`seed`**
    - Sets the seed for the random number generator, enabling reproducible results across image generations.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise`**
    - Adjusts the level of denoising applied to the generated image, with a range from 0 (no denoise) to 1 (full denoise), affecting the clarity and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`optional_image`**
    - An optional image input for tasks such as image-to-image translation or image enhancement, expanding the node's functionality.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Outputs the generated image as a result of the image generation process, encapsulating the visual representation of the input prompts and parameters.
    - Python dtype: `Image`
- **`ui`**
    - Provides a user interface component displaying the generated image or relevant information.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class stableDiffusion3API:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "positive": ("STRING", {"default": "", "placeholder": "Positive", "multiline": True}),
                "negative": ("STRING", {"default": "", "placeholder": "Negative", "multiline": True}),
                "model": (["sd3", "sd3-turbo"],),
                "aspect_ratio": (['16:9', '1:1', '21:9', '2:3', '3:2', '4:5', '5:4', '9:16', '9:21'],),
                "seed": ("INT", {"default": 0, "min": 0, "max": 4294967294}),
                "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0}),
            },
            "optional": {
                "optional_image": ("IMAGE",),
            },
            "hidden": {
                "unique_id": "UNIQUE_ID",
                "extra_pnginfo": "EXTRA_PNGINFO",
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image",)

    FUNCTION = "generate"
    OUTPUT_NODE = False

    CATEGORY = "EasyUse/API"

    def generate(self, positive, negative, model, aspect_ratio, seed, denoise, optional_image=None, unique_id=None, extra_pnginfo=None):
        mode = 'text-to-image'
        if optional_image is not None:
            mode = 'image-to-image'
        output_image = stableAPI.generate_sd3_image(positive, negative, aspect_ratio, seed=seed, mode=mode, model=model, strength=denoise, image=optional_image)
        return (output_image,)

```
