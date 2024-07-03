
# Documentation
- Class name: ttN hiresfixScale
- Category: ttN/image
- Output node: True

ttN hiresfixScale节点专门用于通过特定模型对图像进行放大，在提高分辨率的同时，可以根据各种标准(如百分比增加、保持纵横比或针对较长边的尺寸)调整图像比例。它集成了先进的重新缩放技术，可以根据配置输出放大后的图像或其潜在表示。

# Input types
## Required
- model_name
    - 指定用于放大图像的模型，决定了放大的方法和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- image
    - 需要放大的输入图像，作为增强过程的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- rescale_after_model
    - 指示图像在经过模型处理后是否应该重新缩放。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
- rescale_method
    - 定义放大后用于重新缩放图像的方法，如按百分比或保持纵横比的情况下缩放到特定尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- rescale
    - 指定重新缩放的方法，可以是固定百分比或保持纵横比的情况下缩放到特定的较长边尺寸。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- percent
    - 当'rescale'设置为'by percentage'时，用于指定图像缩放的百分比。
    - Comfy dtype: INT
    - Python dtype: float
- width
    - 重新缩放后图像的目标宽度，适用于'rescale'设置为特定尺寸时。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 重新缩放后图像的目标高度，适用于'rescale'设置为特定尺寸时。
    - Comfy dtype: INT
    - Python dtype: int
- longer_side
    - 指定重新缩放后图像较长边的长度，在'rescale'设置为'to longer side - maintain aspect'时使用。
    - Comfy dtype: INT
    - Python dtype: int
- crop
    - 决定重新缩放后是否以及如何裁剪图像。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- image_output
    - 定义输出的格式，可以是放大后的图像或其潜在表示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- save_prefix
    - 用于保存处理后图像的前缀，指示输出文件的命名方式。
    - Comfy dtype: STRING
    - Python dtype: str
- output_latent
    - 指示输出是否应该以放大图像的潜在表示形式呈现。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
- vae
    - 用于生成潜在表示的变分自动编码器，仅在'output_latent'为真时使用。
    - Comfy dtype: VAE
    - Python dtype: object

# Output types
- latent
    - Comfy dtype: LATENT
    - 放大图像的潜在表示，仅在配置设置为输出潜在格式时生成。
    - Python dtype: Dict[str, torch.Tensor]
- image
    - Comfy dtype: IMAGE
    - 按照指定方法和标准放大并可选择重新缩放后的图像。
    - Python dtype: torch.Tensor


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
