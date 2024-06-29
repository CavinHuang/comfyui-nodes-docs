---
tags:
- Animation
- Image
---

# Create Morph Image from Path
## Documentation
- Class name: `Create Morph Image from Path`
- Category: `WAS Suite/Animation`
- Output node: `False`

This node is designed to generate a morphing animation between a sequence of images stored in a specified directory. It creates a GIF animation that smoothly transitions from one image to another over a given number of frames, allowing for customization of the transition speed, loop count, and output size. The node aims to facilitate the creation of dynamic visual content by automating the morphing process.
## Input types
### Required
- **`transition_frames`**
    - Specifies the number of frames to be used for transitioning between each pair of images, affecting the smoothness of the morphing animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`still_image_delay_ms`**
    - Determines the delay in milliseconds for each still image before transitioning, allowing for a pause on each image in the sequence.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`duration_ms`**
    - Sets the duration in milliseconds for each frame in the animation, controlling the speed of the morphing effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`loops`**
    - Defines how many times the animation will loop, with 0 indicating an infinite loop.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_size`**
    - Limits the maximum size of the images in the animation, ensuring the output file remains within a manageable size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`input_path`**
    - The directory path where the input images are stored, serving as the source for the morphing animation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`input_pattern`**
    - A pattern to match filenames within the input directory, allowing for selective inclusion of images in the animation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`output_path`**
    - The directory path where the generated GIF animation will be saved.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename`**
    - The name of the output file, without the extension, allowing for customization of the output filename.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filetype`**
    - Specifies the file type of the output animation, typically set to 'GIF' for compatibility with most viewers.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`filepath_text`**
    - Comfy dtype: `STRING`
    - The absolute path to the saved output file, providing a direct link to the generated animation.
    - Python dtype: `str`
- **`filename_text`**
    - Comfy dtype: `STRING`
    - The name of the saved output file, including its extension, offering a clear identifier for the generated animation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Morph_GIF_By_Path:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "transition_frames": ("INT", {"default":30, "min":2, "max":60, "step":1}),
                "still_image_delay_ms": ("FLOAT", {"default":2500.0, "min":0.1, "max":60000.0, "step":0.1}),
                "duration_ms": ("FLOAT", {"default":0.1, "min":0.1, "max":60000.0, "step":0.1}),
                "loops": ("INT", {"default":0, "min":0, "max":100, "step":1}),
                "max_size": ("INT", {"default":512, "min":128, "max":1280, "step":1}),
                "input_path": ("STRING",{"default":"./ComfyUI", "multiline": False}),
                "input_pattern": ("STRING",{"default":"*", "multiline": False}),
                "output_path": ("STRING", {"default": "./ComfyUI/output", "multiline": False}),
                "filename": ("STRING", {"default": "morph", "multiline": False}),
                "filetype": (["GIF", "APNG"],),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    RETURN_TYPES = (TEXT_TYPE,TEXT_TYPE)
    RETURN_NAMES = ("filepath_text","filename_text")
    FUNCTION = "create_morph_gif"

    CATEGORY = "WAS Suite/Animation"

    def create_morph_gif(self, transition_frames=30, still_image_delay_ms=2500, duration_ms=0.1, loops=0, max_size=512,
                            input_path="./ComfyUI/output", input_pattern="*", output_path="./ComfyUI/output", filename="morph", filetype="GIF"):

        if 'imageio' not in packages():
            install_package("imageio")

        if not os.path.exists(input_path):
            cstr(f"The input_path `{input_path}` does not exist!").error.print()
            return ("",)

        images = self.load_images(input_path, input_pattern)
        if not images:
            cstr(f"The input_path `{input_path}` does not contain any valid images!").msg.print()
            return ("",)

        if filetype not in ["APNG", "GIF"]:
            filetype = "GIF"
        if output_path.strip() in [None, "", "."]:
            output_path = "./ComfyUI/output"

        if transition_frames < 2:
            transition_frames = 2
        elif transition_frames > 60:
            transition_frames = 60

        if duration_ms < 0.1:
            duration_ms = 0.1
        elif duration_ms > 60000.0:
            duration_ms = 60000.0

        tokens = TextTokens()
        WTools = WAS_Tools_Class()

        output_file = WTools.morph_images(images, steps=int(transition_frames), max_size=int(max_size), loop=int(loops), still_duration=int(still_image_delay_ms),
                                            duration=int(duration_ms), output_path=tokens.parseTokens(os.path.join(*output_path.split('/'))),
                                            filename=tokens.parseTokens(filename), filetype=filetype)

        return (output_file,filename)


    def load_images(self, directory_path, pattern):
        images = []
        for file_name in glob.glob(os.path.join(directory_path, pattern), recursive=False):
            if file_name.lower().endswith(ALLOWED_EXT):
                images.append(Image.open(file_name).convert("RGB"))
        return images

```
