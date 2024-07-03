
# Documentation
- Class name: CCSR_Upscale
- Category: CCSR
- Output node: False

CCSR_Upscale节点旨在通过先进的放大技术来提高图像或潜在表示的分辨率。它利用自定义算法和模型来放大图像，以提高质量和细节，目标是与传统放大方法相比获得更高保真度的输出。

# Input types
## Required
- ccsr_model
    - 指定用于放大过程的模型，是决定放大技术及其有效性的核心。
    - Comfy dtype: CCSRMODEL
    - Python dtype: str
- image
    - 待放大的图像，作为放大过程的主要输入。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- resize_method
    - 定义用于调整图像大小的方法，影响放大质量和特性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scale_by
    - 确定放大过程的缩放因子，影响输出的最终大小。
    - Comfy dtype: FLOAT
    - Python dtype: float
- steps
    - 指定放大过程中要执行的步骤数，影响放大图像的细节和质量。
    - Comfy dtype: INT
    - Python dtype: int
- t_max
    - 采样的最高温度，影响放大图像中的随机性和细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- t_min
    - 采样的最低温度，为放大图像中的随机性和细节设置下限。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampling_method
    - 确定放大过程中使用的采样策略，影响输出的纹理和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- tile_size
    - 放大过程中使用的瓦片大小，影响处理效率和细节捕捉。
    - Comfy dtype: INT
    - Python dtype: int
- tile_stride
    - 放大过程中瓦片的步幅，影响瓦片之间的重叠和细节连续性。
    - Comfy dtype: INT
    - Python dtype: int
- vae_tile_size_encode
    - VAE编码步骤的瓦片大小，影响编码过程中的细节保留。
    - Comfy dtype: INT
    - Python dtype: int
- vae_tile_size_decode
    - VAE解码步骤的瓦片大小，影响解码过程中的细节重建。
    - Comfy dtype: INT
    - Python dtype: int
- color_fix_type
    - 指定用于颜色校正的方法，对维持放大图像的颜色准确性至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- keep_model_loaded
    - 指示放大模型是否应在多次调用之间保持加载状态，影响处理速度和资源使用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - 放大过程的随机种子，确保结果的可复现性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- upscaled_image
    - 放大过程的输出，提供分辨率更高、质量和细节更佳的增强图像。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CCSR_Upscale:
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "lanczos"]
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "ccsr_model": ("CCSRMODEL", ),
            "image": ("IMAGE", ),
            "resize_method": (s.upscale_methods, {"default": "lanczos"}),
            "scale_by": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 20.0, "step": 0.01}),
            "steps": ("INT", {"default": 45, "min": 3, "max": 4096, "step": 1}),
            "t_max": ("FLOAT", {"default": 0.6667,"min": 0, "max": 1, "step": 0.01}),
            "t_min": ("FLOAT", {"default": 0.3333,"min": 0, "max": 1, "step": 0.01}),
            "sampling_method": (
            [   
                'ccsr',
                'ccsr_tiled_mixdiff',
                'ccsr_tiled_vae_gaussian_weights',
            ], {
               "default": 'ccsr_tiled_mixdiff'
            }),
            "tile_size": ("INT", {"default": 512, "min": 1, "max": 4096, "step": 1}),
            "tile_stride": ("INT", {"default": 256, "min": 1, "max": 4096, "step": 1}),
            "vae_tile_size_encode": ("INT", {"default": 1024, "min": 2, "max": 4096, "step": 8}),
            "vae_tile_size_decode": ("INT", {"default": 1024, "min": 2, "max": 4096, "step": 8}),
            "color_fix_type": (
            [   
                'none',
                'adain',
                'wavelet',
            ], {
               "default": 'adain'
            }),
            "keep_model_loaded": ("BOOLEAN", {"default": False}),
            "seed": ("INT", {"default": 123,"min": 0, "max": 0xffffffffffffffff, "step": 1}),
            },
            
            
            }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES =("upscaled_image",)
    FUNCTION = "process"

    CATEGORY = "CCSR"

    @torch.no_grad()
    def process(self, ccsr_model, image, resize_method, scale_by, steps, t_max, t_min, tile_size, tile_stride, color_fix_type, keep_model_loaded, vae_tile_size_encode, vae_tile_size_decode, sampling_method, seed):
        torch.manual_seed(seed)
        torch.cuda.manual_seed_all(seed)
        comfy.model_management.unload_all_models()
        device = comfy.model_management.get_torch_device()
        config_path = os.path.join(script_directory, "configs/model/ccsr_stage2.yaml")
        empty_text_embed = torch.load(os.path.join(script_directory, "empty_text_embed.pt"), map_location=device)
        dtype = torch.float16 if comfy.model_management.should_use_fp16() and not comfy.model_management.is_device_mps(device) else torch.float32
        if not hasattr(self, "model") or self.model is None:
            config = OmegaConf.load(config_path)
            self.model = instantiate_from_config(config)
            
            load_state_dict(self.model, torch.load(ccsr_model, map_location="cpu"), strict=True)
            # reload preprocess model if specified

            self.model.freeze()
            self.model.to(device, dtype=dtype)
        sampler = SpacedSampler(self.model, var_type="fixed_small")

        batch_size = image.shape[0]
        image, = ImageScaleBy.upscale(self, image, resize_method, scale_by)
        
        # Assuming 'image' is a PyTorch tensor with shape [B, H, W, C] and you want to resize it.
        B, H, W, C = image.shape

        # Calculate the new height and width, rounding down to the nearest multiple of 64.
        new_height = H // 64 * 64
        new_width = W // 64 * 64

        # Reorder to [B, C, H, W] before using interpolate.
        image = image.permute(0, 3, 1, 2).contiguous()

        # Resize the image tensor.
        resized_image = F.interpolate(image, size=(new_height, new_width), mode='bicubic', align_corners=False)
        
        # Move the tensor to the GPU.
        #resized_image = resized_image.to(device)
        strength = 1.0
        self.model.control_scales = [strength] * 13
        
        height, width = resized_image.size(-2), resized_image.size(-1)
        shape = (1, 4, height // 8, width // 8)
        x_T = torch.randn(shape, device=self.model.device, dtype=torch.float32)
        autocast_condition = dtype == torch.float16 and not comfy.model_management.is_device_mps(device)
        out = []    

        pbar = comfy.utils.ProgressBar(batch_size)

        with torch.autocast(comfy.model_management.get_autocast_device(device), dtype=dtype) if autocast_condition else nullcontext():
            for i in range(batch_size):
                img = resized_image[i].unsqueeze(0).to(device)
                if sampling_method == 'ccsr_tiled_mixdiff':
                    self.model.reset_encoder_decoder()
                    print("Using tiled mixdiff")
                    samples = sampler.sample_with_mixdiff_ccsr(
                        empty_text_embed, tile_size=tile_size, tile_stride=tile_stride,
                        steps=steps, t_max=t_max, t_min=t_min, shape=shape, cond_img=img,
                        positive_prompt="", negative_prompt="", x_T=x_T,
                        cfg_scale=1.0, 
                        color_fix_type=color_fix_type
                    )
                elif sampling_method == 'ccsr_tiled_vae_gaussian_weights':
                    self.model._init_tiled_vae(encoder_tile_size=vae_tile_size_encode // 8, decoder_tile_size=vae_tile_size_decode // 8)
                    print("Using gaussian weights")
                    samples = sampler.sample_with_tile_ccsr(
                        empty_text_embed, tile_size=tile_size, tile_stride=tile_stride,
                        steps=steps, t_max=t_max, t_min=t_min, shape=shape, cond_img=img,
                        positive_prompt="", negative_prompt="", x_T=x_T,
                        cfg_scale=1.0, 
                        color_fix_type=color_fix_type
                    )
                else:
                    self.model.reset_encoder_decoder()
                    print("no tiling")
                    samples = sampler.sample_ccsr(
                        empty_text_embed, steps=steps, t_max=t_max, t_min=t_min, shape=shape, cond_img=img,
                        positive_prompt="", negative_prompt="", x_T=x_T,
                        cfg_scale=1.0,
                        color_fix_type=color_fix_type
                    )
                out.append(samples.squeeze(0).cpu())
                comfy.model_management.throw_exception_if_processing_interrupted()
                pbar.update(1)
                print("Sampled image ", i, " out of ", batch_size)
       
        original_height, original_width = H, W  
        processed_height = samples.size(2)
        target_width = int(processed_height * (original_width / original_height))
        out_stacked = torch.stack(out, dim=0).cpu().to(torch.float32).permute(0, 2, 3, 1)
        resized_back_image, = ImageScale.upscale(self, out_stacked, "lanczos", target_width, processed_height, crop="disabled")
        
        if not keep_model_loaded:
            self.model = None            
            comfy.model_management.soft_empty_cache()
        return(resized_back_image,)

```
