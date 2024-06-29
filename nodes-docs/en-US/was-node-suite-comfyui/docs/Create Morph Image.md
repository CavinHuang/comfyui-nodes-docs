---
tags:
- Animation
- Image
---

# Create Morph Image
## Documentation
- Class name: `Create Morph Image`
- Category: `WAS Suite/Animation`
- Output node: `False`

This node is designed to generate a morphing animation between two or more images, creating a smooth transition effect. It allows for customization of the transition duration, frame rate, and output settings, making it versatile for creating dynamic visual content.
## Input types
### Required
- **`image_a`**
    - The first image in the morphing sequence. It serves as the starting point for the morphing animation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`image_b`**
    - The second image in the morphing sequence. It serves as the ending point for the morphing animation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`transition_frames`**
    - Defines the number of frames to be generated between the starting and ending images, controlling the smoothness of the transition.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`still_image_delay_ms`**
    - The duration in milliseconds for which each image remains still before transitioning to the next, enhancing the visual effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`duration_ms`**
    - The duration in milliseconds of each transition step, affecting the speed of the morphing animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`loops`**
    - Determines the number of times the animation loops, allowing for repeated playback.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_size`**
    - Specifies the maximum size of the images, ensuring they are resized appropriately for consistent morphing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`output_path`**
    - The file path where the generated morphing animation will be saved.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename`**
    - The name of the output file, allowing for easy identification and organization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filetype`**
    - The format of the output file, typically GIF for animations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image_a_pass`**
    - Comfy dtype: `IMAGE`
    - The first image after processing, confirming its successful inclusion in the morphing animation.
    - Python dtype: `torch.Tensor`
- **`image_b_pass`**
    - Comfy dtype: `IMAGE`
    - The second image after processing, confirming its successful inclusion in the morphing animation.
    - Python dtype: `torch.Tensor`
- **`filepath_text`**
    - Comfy dtype: `STRING`
    - The path to the generated morphing animation file, providing access to the final visual content.
    - Python dtype: `str`
- **`filename_text`**
    - Comfy dtype: `STRING`
    - The name of the generated morphing animation file, facilitating easy identification and retrieval.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Morph_GIF:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image_a": ("IMAGE",),
                "image_b": ("IMAGE",),
                "transition_frames": ("INT", {"default":30, "min":2, "max":60, "step":1}),
                "still_image_delay_ms": ("FLOAT", {"default":2500.0, "min":0.1, "max":60000.0, "step":0.1}),
                "duration_ms": ("FLOAT", {"default":0.1, "min":0.1, "max":60000.0, "step":0.1}),
                "loops": ("INT", {"default":0, "min":0, "max":100, "step":1}),
                "max_size": ("INT", {"default":512, "min":128, "max":1280, "step":1}),
                "output_path": ("STRING", {"default": "./ComfyUI/output", "multiline": False}),
                "filename": ("STRING", {"default": "morph", "multiline": False}),
                "filetype": (["GIF", "APNG"],),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    RETURN_TYPES = ("IMAGE","IMAGE",TEXT_TYPE,TEXT_TYPE)
    RETURN_NAMES = ("image_a_pass","image_b_pass","filepath_text","filename_text")
    FUNCTION = "create_morph_gif"

    CATEGORY = "WAS Suite/Animation"

    def create_morph_gif(self, image_a, image_b, transition_frames=10, still_image_delay_ms=10, duration_ms=0.1, loops=0, max_size=512,
                            output_path="./ComfyUI/output", filename="morph", filetype="GIF"):

        tokens = TextTokens()
        WTools = WAS_Tools_Class()

        if 'imageio' not in packages():
            install_package('imageio')

        if filetype not in ["APNG", "GIF"]:
            filetype = "GIF"
        if output_path.strip() in [None, "", "."]:
            output_path = "./ComfyUI/output"
        output_path = tokens.parseTokens(os.path.join(*output_path.split('/')))
        if not os.path.exists(output_path):
            os.makedirs(output_path, exist_ok=True)

        if image_a == None:
            image_a = pil2tensor(Image.new("RGB", (512,512), (0,0,0)))
        if image_b == None:
            image_b = pil2tensor(Image.new("RGB", (512,512), (255,255,255)))

        if transition_frames < 2:
            transition_frames = 2
        elif transition_frames > 60:
            transition_frames = 60

        if duration_ms < 0.1:
            duration_ms = 0.1
        elif duration_ms > 60000.0:
            duration_ms = 60000.0

        output_file = WTools.morph_images([tensor2pil(image_a), tensor2pil(image_b)], steps=int(transition_frames), max_size=int(max_size), loop=int(loops),
                            still_duration=int(still_image_delay_ms), duration=int(duration_ms), output_path=output_path,
                            filename=tokens.parseTokens(filename), filetype=filetype)

        return (image_a, image_b, output_file)

```
