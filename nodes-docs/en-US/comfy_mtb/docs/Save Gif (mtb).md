---
tags:
- Animation
- Image
---

# Save Gif (mtb)
## Documentation
- Class name: `Save Gif (mtb)`
- Category: `mtb/IO`
- Output node: `True`

This node is designed to save a sequence of images as a GIF file, offering customization options such as frame rate, size adjustment, optimization, and the choice between a standard saving method or using FFmpeg for potentially enhanced performance.
## Input types
### Required
- **`image`**
    - The sequence of images to be saved as a GIF. This is the primary input that dictates the content of the resulting GIF file.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`fps`**
    - Specifies the frames per second for the GIF, controlling how fast the images in the sequence are played back.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resize_by`**
    - A scaling factor to adjust the size of the images in the GIF, with 1.0 meaning no scaling.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`optimize`**
    - A boolean indicating whether to apply optimization to the GIF, which can reduce file size at the cost of potentially longer processing times.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`pingpong`**
    - When enabled, the GIF animation will play forwards and then backwards, creating a seamless loop effect.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`resample_filter`**
    - The resampling filter to use when resizing images, affecting the quality of the resized images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Optional[str]`
- **`use_ffmpeg`**
    - A boolean indicating whether to use FFmpeg for GIF creation, which can offer more efficient processing for certain types of content.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`ui`**
    - Returns a UI element with the generated GIF, including the filename and path where the GIF is saved.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_SaveGif:
    """Save the images from the batch as a GIF"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "fps": ("INT", {"default": 12, "min": 1, "max": 120}),
                "resize_by": ("FLOAT", {"default": 1.0, "min": 0.1}),
                "optimize": ("BOOLEAN", {"default": False}),
                "pingpong": ("BOOLEAN", {"default": False}),
                "resample_filter": (list(PIL_FILTER_MAP.keys()),),
                "use_ffmpeg": ("BOOLEAN", {"default": False}),
            },
        }

    RETURN_TYPES = ()
    OUTPUT_NODE = True
    CATEGORY = "mtb/IO"
    FUNCTION = "save_gif"

    def save_gif(
        self,
        image,
        fps=12,
        resize_by=1.0,
        optimize=False,
        pingpong=False,
        resample_filter=None,
        use_ffmpeg=False,
    ):
        if image.size(0) == 0:
            return ("",)

        if resample_filter is not None:
            resample_filter = PIL_FILTER_MAP.get(resample_filter)

        pil_images = prepare_animated_batch(
            image,
            pingpong,
            resize_by,
            resample_filter,
        )

        ruuid = uuid.uuid4()
        ruuid = ruuid.hex[:10]
        out_path = f"{folder_paths.output_directory}/{ruuid}.gif"

        if use_ffmpeg:
            # Use FFmpeg to create the GIF from PIL images
            command = [
                "ffmpeg",
                "-f",
                "image2pipe",
                "-vcodec",
                "png",
                "-r",
                str(fps),
                "-i",
                "-",
                "-vcodec",
                "gif",
                "-y",
                out_path,
            ]
            process = subprocess.Popen(command, stdin=subprocess.PIPE)
            for image in pil_images:
                model_management.throw_exception_if_processing_interrupted()
                image.save(process.stdin, "PNG")
            process.stdin.close()
            process.wait()

        else:
            pil_images[0].save(
                out_path,
                save_all=True,
                append_images=pil_images[1:],
                optimize=optimize,
                duration=int(1000 / fps),
                loop=0,
            )
        results = [
            {"filename": f"{ruuid}.gif", "subfolder": "", "type": "output"}
        ]
        return {"ui": {"gif": results}}

```
