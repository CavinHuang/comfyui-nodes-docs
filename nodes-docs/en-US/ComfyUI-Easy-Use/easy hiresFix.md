---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# HiresFix
## Documentation
- Class name: `easy hiresFix`
- Category: `EasyUse/Fix`
- Output node: `True`

The `easy hiresFix` node is designed to enhance the resolution and detail of images, typically used as a post-processing step to refine and improve the visual quality of generated images. It focuses on fixing high-resolution aspects, making it suitable for applications requiring detailed and clear visual outputs.
## Input types
### Required
- **`model_name`**
    - Specifies the neural network model used for the upscale process, impacting the quality and method of enhancement.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rescale_after_model`**
    - Determines whether the image is rescaled after being processed by the model, affecting the final image size and detail.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`rescale_method`**
    - Defines the method used for rescaling the image, influencing the quality and appearance of the final output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rescale`**
    - Specifies how the image is rescaled, by percentage or to specific dimensions, directly impacting the output size.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`percent`**
    - The percentage to rescale the image by when 'rescale' is set to 'by percentage', affecting the output image size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - The target width of the image when 'rescale' is set to 'to Width/Height', determining the output dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The target height of the image when 'rescale' is set to 'to Width/Height', determining the output dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`longer_side`**
    - Specifies the longer side dimension for rescaling while maintaining aspect ratio, used when 'rescale' is set to 'to longer side - maintain aspect'.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop`**
    - Indicates whether and how the image should be cropped, affecting the composition of the final output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image_output`**
    - Determines the format of the output image, influencing how the result is saved or displayed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`link_id`**
    - A unique identifier for linking the processed image with other elements or processes, useful for tracking and organization.
    - Comfy dtype: `INT`
    - Python dtype: `str`
- **`save_prefix`**
    - A prefix added to the file name of the saved image, useful for organization and identification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`pipe`**
    - An optional pipeline of processes the image may go through before or after the upscale process, affecting the overall workflow.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict`
- **`image`**
    - The input image to be upscaled, serving as the direct subject of the enhancement process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`vae`**
    - An optional VAE model that can be used in conjunction with the upscale process for additional image processing.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - The output pipeline, potentially including the upscaled image among other processed elements.
    - Python dtype: `dict`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The upscaled image, showcasing improved resolution and detail.
    - Python dtype: `torch.Tensor`
- **`latent`**
    - Comfy dtype: `LATENT`
    - A latent representation of the image, useful for further processing or analysis.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class hiresFix:
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "lanczos", "bislerp"]
    crop_methods = ["disabled", "center"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                 "model_name": (folder_paths.get_filename_list("upscale_models"),),
                 "rescale_after_model": ([False, True], {"default": True}),
                 "rescale_method": (s.upscale_methods,),
                 "rescale": (["by percentage", "to Width/Height", 'to longer side - maintain aspect'],),
                 "percent": ("INT", {"default": 50, "min": 0, "max": 1000, "step": 1}),
                 "width": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                 "height": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                 "longer_side": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                 "crop": (s.crop_methods,),
                 "image_output": (["Hide", "Preview", "Save", "Hide&Save", "Sender", "Sender&Save"],{"default": "Preview"}),
                 "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
                 "save_prefix": ("STRING", {"default": "ComfyUI"}),
                },
                "optional": {
                    "pipe": ("PIPE_LINE",),
                    "image": ("IMAGE",),
                    "vae": ("VAE",),
                },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                           },
                }

    RETURN_TYPES = ("PIPE_LINE", "IMAGE", "LATENT", )
    RETURN_NAMES = ('pipe', 'image', "latent", )

    FUNCTION = "upscale"
    CATEGORY = "EasyUse/Fix"
    OUTPUT_NODE = True

    def vae_encode_crop_pixels(self, pixels):
        x = (pixels.shape[1] // 8) * 8
        y = (pixels.shape[2] // 8) * 8
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = (pixels.shape[1] % 8) // 2
            y_offset = (pixels.shape[2] % 8) // 2
            pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]
        return pixels

    def upscale(self, model_name, rescale_after_model, rescale_method, rescale, percent, width, height,
                longer_side, crop, image_output, link_id, save_prefix, pipe=None, image=None, vae=None, prompt=None,
                extra_pnginfo=None, my_unique_id=None):

        new_pipe = {}
        if pipe is not None:
            image = image if image is not None else pipe["images"]
            vae = vae if vae is not None else pipe.get("vae")
        elif image is None or vae is None:
            raise ValueError("pipe or image or vae missing.")
        # Load Model
        model_path = folder_paths.get_full_path("upscale_models", model_name)
        sd = comfy.utils.load_torch_file(model_path, safe_load=True)
        upscale_model = model_loading.load_state_dict(sd).eval()

        # Model upscale
        device = comfy.model_management.get_torch_device()
        upscale_model.to(device)
        in_img = image.movedim(-1, -3).to(device)

        tile = 128 + 64
        overlap = 8
        steps = in_img.shape[0] * comfy.utils.get_tiled_scale_steps(in_img.shape[3], in_img.shape[2], tile_x=tile,
                                                                    tile_y=tile, overlap=overlap)
        pbar = comfy.utils.ProgressBar(steps)
        s = comfy.utils.tiled_scale(in_img, lambda a: upscale_model(a), tile_x=tile, tile_y=tile, overlap=overlap,
                                    upscale_amount=upscale_model.scale, pbar=pbar)
        upscale_model.cpu()
        s = torch.clamp(s.movedim(-3, -1), min=0, max=1.0)

        # Post Model Rescale
        if rescale_after_model == True:
            samples = s.movedim(-1, 1)
            orig_height = samples.shape[2]
            orig_width = samples.shape[3]
            if rescale == "by percentage" and percent != 0:
                height = percent / 100 * orig_height
                width = percent / 100 * orig_width
                if (width > MAX_RESOLUTION):
                    width = MAX_RESOLUTION
                if (height > MAX_RESOLUTION):
                    height = MAX_RESOLUTION

                width = easySampler.enforce_mul_of_64(width)
                height = easySampler.enforce_mul_of_64(height)
            elif rescale == "to longer side - maintain aspect":
                longer_side = easySampler.enforce_mul_of_64(longer_side)
                if orig_width > orig_height:
                    width, height = longer_side, easySampler.enforce_mul_of_64(longer_side * orig_height / orig_width)
                else:
                    width, height = easySampler.enforce_mul_of_64(longer_side * orig_width / orig_height), longer_side

            s = comfy.utils.common_upscale(samples, width, height, rescale_method, crop)
            s = s.movedim(1, -1)

        # vae encode
        pixels = self.vae_encode_crop_pixels(s)
        t = vae.encode(pixels[:, :, :, :3])

        if pipe is not None:
            new_pipe = {
                "model": pipe['model'],
                "positive": pipe['positive'],
                "negative": pipe['negative'],
                "vae": vae,
                "clip": pipe['clip'],

                "samples": {"samples": t},
                "images": s,
                "seed": pipe['seed'],

                "loader_settings": {
                    **pipe["loader_settings"],
                }
            }
            del pipe
        else:
            new_pipe = {}

        results = easySave(s, save_prefix, image_output, prompt, extra_pnginfo)

        if image_output in ("Sender", "Sender&Save"):
            PromptServer.instance.send_sync("img-send", {"link_id": link_id, "images": results})

        if image_output in ("Hide", "Hide&Save"):
            return (new_pipe, s, {"samples": t},)

        return {"ui": {"images": results},
                "result": (new_pipe, s, {"samples": t},)}

```
