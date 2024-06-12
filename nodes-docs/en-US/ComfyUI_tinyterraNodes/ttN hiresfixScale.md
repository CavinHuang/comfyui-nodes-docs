---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# hiresfixScale
## Documentation
- Class name: `ttN hiresfixScale`
- Category: `ttN/image`
- Output node: `True`

The ttN hiresfixScale node specializes in upscaling images through a specific model, enhancing their resolution while optionally adjusting their scale based on various criteria such as percentage increase, maintaining aspect ratio, or targeting a longer side dimension. It integrates advanced rescaling techniques and can output either the upscaled images or their latent representations, depending on the configuration.
## Input types
### Required
- **`model_name`**
    - Specifies the model used for upscaling the images, determining the method and quality of the upscale.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image`**
    - The input images to be upscaled, serving as the base for the enhancement process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`rescale_after_model`**
    - Indicates if the images should be rescaled after being processed by the model.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`rescale_method`**
    - Defines the method used for rescaling the images after upscaling, such as by percentage or to a specific dimension while maintaining aspect ratio.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rescale`**
    - Specifies the rescaling approach, either by a fixed percentage or to a specific longer side dimension while preserving aspect ratio.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`percent`**
    - The percentage to scale the image by when 'rescale' is set to 'by percentage'.
    - Comfy dtype: `INT`
    - Python dtype: `float`
- **`width`**
    - The target width for the image after rescaling, applicable when 'rescale' is set to specific dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The target height for the image after rescaling, applicable when 'rescale' is set to specific dimensions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`longer_side`**
    - Specifies the length of the longer side of the image after rescaling, used when 'rescale' is set to 'to longer side - maintain aspect'.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop`**
    - Determines if and how the image should be cropped after rescaling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image_output`**
    - Defines the format of the output, whether as an upscaled image or its latent representation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`save_prefix`**
    - A prefix for saving the processed images, indicating how the output files are named.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`output_latent`**
    - Indicates whether the output should be in the form of latent representations of the upscaled images.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`vae`**
    - The variational autoencoder used for generating latent representations, if 'output_latent' is true.
    - Comfy dtype: `VAE`
    - Python dtype: `object`
## Output types
- **`latent`**
    - Comfy dtype: `LATENT`
    - The latent representation of the upscaled image, if the configuration is set to output in latent format.
    - Python dtype: `Dict[str, torch.Tensor]`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The upscaled and optionally rescaled image, following the specified method and criteria.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ttN_modelScale:
    version = '1.0.3'
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "lanczos", "bislerp"]
    crop_methods = ["disabled", "center"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model_name": (folder_paths.get_filename_list("upscale_models"),),
                              "image": ("IMAGE",),
                              "rescale_after_model": ([False, True],{"default": True}),
                              "rescale_method": (s.upscale_methods,),
                              "rescale": (["by percentage", "to Width/Height", 'to longer side - maintain aspect'],),
                              "percent": ("INT", {"default": 50, "min": 0, "max": 1000, "step": 1}),
                              "width": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                              "height": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                              "longer_side": ("INT", {"default": 1024, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                              "crop": (s.crop_methods,),
                              "image_output": (["Hide", "Preview", "Save", "Hide/Save"],),
                              "save_prefix": ("STRING", {"default": "ComfyUI"}),
                              "output_latent": ([False, True],{"default": True}),
                              "vae": ("VAE",),},
                "hidden": {   "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",
                               "ttNnodeVersion": ttN_modelScale.version},
        }
        
    RETURN_TYPES = ("LATENT", "IMAGE",)
    RETURN_NAMES = ("latent", 'image',)

    FUNCTION = "upscale"
    CATEGORY = "ttN/image"
    OUTPUT_NODE = True

    def vae_encode_crop_pixels(self, pixels):
        x = (pixels.shape[1] // 8) * 8
        y = (pixels.shape[2] // 8) * 8
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = (pixels.shape[1] % 8) // 2
            y_offset = (pixels.shape[2] % 8) // 2
            pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]
        return pixels

    def upscale(self, model_name, image, rescale_after_model, rescale_method, rescale, percent, width, height, longer_side, crop, image_output, save_prefix, output_latent, vae, prompt=None, extra_pnginfo=None, my_unique_id=None):
        # Load Model
        model_path = folder_paths.get_full_path("upscale_models", model_name)
        sd = comfy.utils.load_torch_file(model_path, safe_load=True)
        upscale_model = model_loading.load_state_dict(sd).eval()

        # Model upscale
        device = comfy.model_management.get_torch_device()
        upscale_model.to(device)
        in_img = image.movedim(-1,-3).to(device)

        tile = 128 + 64
        overlap = 8
        steps = in_img.shape[0] * comfy.utils.get_tiled_scale_steps(in_img.shape[3], in_img.shape[2], tile_x=tile, tile_y=tile, overlap=overlap)
        pbar = comfy.utils.ProgressBar(steps)
        s = comfy.utils.tiled_scale(in_img, lambda a: upscale_model(a), tile_x=tile, tile_y=tile, overlap=overlap, upscale_amount=upscale_model.scale, pbar=pbar)
        upscale_model.cpu()
        s = torch.clamp(s.movedim(-3,-1), min=0, max=1.0)

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

                width = ttNsampler.enforce_mul_of_64(width)
                height = ttNsampler.enforce_mul_of_64(height)
            elif rescale == "to longer side - maintain aspect":
                longer_side = ttNsampler.enforce_mul_of_64(longer_side)
                if orig_width > orig_height:
                    width, height = longer_side, ttNsampler.enforce_mul_of_64(longer_side * orig_height / orig_width)
                else:
                    width, height = ttNsampler.enforce_mul_of_64(longer_side * orig_width / orig_height), longer_side
                    

            s = comfy.utils.common_upscale(samples, width, height, rescale_method, crop)
            s = s.movedim(1,-1)

        # vae encode
        if output_latent == True:
            pixels = self.vae_encode_crop_pixels(s)
            t = vae.encode(pixels[:,:,:,:3])
            if image_output == "return latent":
                return ({"samples":t})
        else:
            t = None

        ttN_save = ttNsave(my_unique_id, prompt, extra_pnginfo)
        results = ttN_save.images(s, save_prefix, image_output)
        
        if image_output in ("Hide", "Hide/Save"):
            return ({"samples":t}, s,)

        return {"ui": {"images": results}, 
                "result": ({"samples":t}, s,)}

```
