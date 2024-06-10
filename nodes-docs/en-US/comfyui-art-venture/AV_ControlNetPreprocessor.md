---
tags:
- DepthMap
- Image
- ImagePreprocessing
---

# ControlNet Preprocessor
## Documentation
- Class name: `AV_ControlNetPreprocessor`
- Category: `Art Venture/Loaders`
- Output node: `False`

The AV_ControlNetPreprocessor node is designed for preparing images for further processing or analysis within the ControlNet framework. It allows for the application of various preprocessing techniques to images, including resolution adjustment and the selection of specific preprocessors, to optimize them for ControlNet's requirements.
## Input types
### Required
- **`image`**
    - The input image to be preprocessed. This is the primary data upon which preprocessing operations are performed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `ImageType`
- **`preprocessor`**
    - Specifies the preprocessing technique to be applied to the input image. It can be one of several predefined preprocessors or a custom one, influencing the preprocessing outcome.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sd_version`**
    - Indicates the specific version of Stable Diffusion to be used, affecting how the preprocessing aligns with the model's requirements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`resolution`**
    - The desired resolution for the output image, which can be adjusted to meet specific quality or performance criteria.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`preprocessor_override`**
    - Allows for the override of the initially selected preprocessor with an alternative, providing flexibility in preprocessing choices.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The preprocessed image, ready for further processing or analysis within the ControlNet framework.
    - Python dtype: `ImageType`
- **`CNET_NAME`**
    - Comfy dtype: `STRING`
    - The name of the ControlNet used or identified during the preprocessing, providing context for subsequent processing steps.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [CR Multi-ControlNet Stack](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Multi-ControlNet Stack.md)



## Source code
```python
class AV_ControlNetPreprocessor:
    preprocessors = list(control_net_preprocessors.keys())

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "preprocessor": (["None", "tile"] + s.preprocessors,),
                "sd_version": (["sd15", "sd15++", "sdxl", "sdxl_t2i", "sdxl_lllite"],),
            },
            "optional": {
                "resolution": ("INT", {"default": 512, "min": 64, "max": 2048, "step": 64}),
                "preprocessor_override": ("STRING", {"default": "None"}),
            },
        }

    RETURN_TYPES = ("IMAGE", "STRING")
    RETURN_NAMES = ("IMAGE", "CNET_NAME")
    FUNCTION = "detect_controlnet"
    CATEGORY = "Art Venture/Loaders"

    def detect_controlnet(self, image, preprocessor, sd_version, resolution=512, preprocessor_override="None"):
        if preprocessor_override != "None":
            if preprocessor_override not in control_net_preprocessors:
                print(
                    f"Warning: Not found ControlNet preprocessor {preprocessor_override}. Use {preprocessor} instead."
                )
            else:
                preprocessor = preprocessor_override

        image = apply_preprocessor(image, preprocessor, resolution=resolution)
        control_net_name = detect_controlnet(preprocessor, sd_version)

        return (image, control_net_name)

```
