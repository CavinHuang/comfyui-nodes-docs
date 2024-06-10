---
tags:
- Animation
- Image
---

# Write to GIF
## Documentation
- Class name: `Write to GIF`
- Category: `WAS Suite/Animation/Writer`
- Output node: `False`

The 'Write to GIF' node specializes in creating and editing GIF animations from images. It can generate new GIFs from single images, append images to existing GIFs with transition effects, and adjust animation parameters such as frame duration and looping behavior. This node is designed to enhance visual content by enabling dynamic image transitions and preserving the continuity of animations.
## Input types
### Required
- **`image`**
    - The image to be written into a GIF. This can be a new image for creating a GIF or an additional frame to be appended to an existing GIF animation. It plays a crucial role in determining the visual content of the GIF.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`transition_frames`**
    - Specifies the number of frames to be used for transitions between images in the GIF, affecting the smoothness and duration of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`image_delay_ms`**
    - The delay in milliseconds before transitioning to the next image, influencing the pacing of the GIF animation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`duration_ms`**
    - The duration in milliseconds for each frame in the GIF, determining how long each image is displayed.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`loops`**
    - The number of times the GIF animation will loop, with 0 indicating infinite looping. This affects the replayability of the GIF.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_size`**
    - The maximum size of the images in the GIF, ensuring that the GIF does not exceed a certain dimension for compatibility and performance reasons.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`output_path`**
    - The directory path where the GIF is to be saved. It specifies the location where the output animation is stored.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename`**
    - The name of the file for the output GIF, determining the filename under which the GIF will be saved.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image_pass`**
    - Comfy dtype: `IMAGE`
    - The original image or the last frame added to the GIF, indicating the final visual state of the GIF animation.
    - Python dtype: `PIL.Image.Image`
- **`filepath_text`**
    - Comfy dtype: `STRING`
    - The full file path of the saved or edited GIF, providing a reference to the location of the GIF file.
    - Python dtype: `str`
- **`filename_text`**
    - Comfy dtype: `STRING`
    - The name of the GIF file, offering a simple identifier for the generated or modified GIF animation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Morph_GIF_Writer:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "transition_frames": ("INT", {"default":30, "min":2, "max":60, "step":1}),
                "image_delay_ms": ("FLOAT", {"default":2500.0, "min":0.1, "max":60000.0, "step":0.1}),
                "duration_ms": ("FLOAT", {"default":0.1, "min":0.1, "max":60000.0, "step":0.1}),
                "loops": ("INT", {"default":0, "min":0, "max":100, "step":1}),
                "max_size": ("INT", {"default":512, "min":128, "max":1280, "step":1}),
                "output_path": ("STRING", {"default": comfy_paths.output_directory, "multiline": False}),
                "filename": ("STRING", {"default": "morph_writer", "multiline": False}),
            }
        }

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

    RETURN_TYPES = ("IMAGE",TEXT_TYPE,TEXT_TYPE)
    RETURN_NAMES = ("image_pass","filepath_text","filename_text")
    FUNCTION = "write_to_morph_gif"

    CATEGORY = "WAS Suite/Animation/Writer"

    def write_to_morph_gif(self, image, transition_frames=10, image_delay_ms=10, duration_ms=0.1, loops=0, max_size=512,
                            output_path="./ComfyUI/output", filename="morph"):

        if 'imageio' not in packages():
            install_package("imageio")

        if output_path.strip() in [None, "", "."]:
            output_path = "./ComfyUI/output"

        if image is None:
            image = pil2tensor(Image.new("RGB", (512, 512), (0, 0, 0))).unsqueeze(0)

        if transition_frames < 2:
            transition_frames = 2
        elif transition_frames > 60:
            transition_frames = 60

        if duration_ms < 0.1:
            duration_ms = 0.1
        elif duration_ms > 60000.0:
            duration_ms = 60000.0

        tokens = TextTokens()
        output_path = os.path.abspath(os.path.join(*tokens.parseTokens(output_path).split('/')))
        output_file = os.path.join(output_path, tokens.parseTokens(filename) + '.gif')

        if not os.path.exists(output_path):
            os.makedirs(output_path, exist_ok=True)

        WTools = WAS_Tools_Class()
        GifMorph = WTools.GifMorphWriter(int(transition_frames), int(duration_ms), int(image_delay_ms))

        for img in image:
            pil_img = tensor2pil(img)
            GifMorph.write(pil_img, output_file)

        return (image, output_file, filename)

```
