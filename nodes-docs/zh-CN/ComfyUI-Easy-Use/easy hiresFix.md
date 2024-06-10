# Documentation
- Class name: hiresFix
- Category: EasyUse/Fix
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

hiresFix节点旨在提高图像的分辨率，同时保持或提高其视觉质量。它通过采用各种上采样技术实现这一点，并允许进行调整以适应特定要求。该节点的主要目标是为用户提提供一个易于使用的图像增强界面，抽象了底层模型和算法的复杂性。

# Input types
## Required
- model_name
    - 模型名称参数对于选择适当的上采样模型至关重要。它决定了用于图像增强过程的特定算法，显著影响输出质量和性能。
    - Comfy dtype: COMBO
    - Python dtype: List[str]
- rescale_after_model
    - rescale_after_model参数决定是否在上采样后调整图像大小。这影响处理后图像的最终尺寸，对于适应特定的显示或打印要求可能至关重要。
    - Comfy dtype: BOOL
    - Python dtype: bool
- rescale_method
    - rescale_method参数定义了上采样后调整图像尺寸所用的技术。它在保持图像的宽高比和整体视觉连贯性方面起着关键作用。
    - Comfy dtype: COMBO
    - Python dtype: str
- percent
    - 百分比参数指定在使用'按百分比'调整大小时图像应放大的百分比。它直接影响图像的最终大小，更高的值会导致尺寸的显著增加。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pipe
    - pipe输出提供了处理流水线的结构化表示，包括使用的模型和参数。它对于保持图像增强工作流的一致性和可重复性至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image
    - 图像输出包含输入图像的增强版，即高分辨率版本。它是节点操作的主要结果，对于上采样过程的视觉验证至关重要。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- latent
    - 潜在输出表示图像的编码版本，可用于进一步的处理或分析。它作为一个中间表示，捕捉图像的基本特征。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: CPU

# Source code
```
class hiresFix:
    upscale_methods = ['nearest-exact', 'bilinear', 'area', 'bicubic', 'lanczos', 'bislerp']
    crop_methods = ['disabled', 'center']

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model_name': (folder_paths.get_filename_list('upscale_models'),), 'rescale_after_model': ([False, True], {'default': True}), 'rescale_method': (s.upscale_methods,), 'rescale': (['by percentage', 'to Width/Height', 'to longer side - maintain aspect'],), 'percent': ('INT', {'default': 50, 'min': 0, 'max': 1000, 'step': 1}), 'width': ('INT', {'default': 1024, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 1024, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'longer_side': ('INT', {'default': 1024, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'crop': (s.crop_methods,), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'], {'default': 'Preview'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'optional': {'pipe': ('PIPE_LINE',), 'image': ('IMAGE',), 'vae': ('VAE',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE', 'LATENT')
    RETURN_NAMES = ('pipe', 'image', 'latent')
    FUNCTION = 'upscale'
    CATEGORY = 'EasyUse/Fix'
    OUTPUT_NODE = True

    def vae_encode_crop_pixels(self, pixels):
        x = pixels.shape[1] // 8 * 8
        y = pixels.shape[2] // 8 * 8
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = pixels.shape[1] % 8 // 2
            y_offset = pixels.shape[2] % 8 // 2
            pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]
        return pixels

    def upscale(self, model_name, rescale_after_model, rescale_method, rescale, percent, width, height, longer_side, crop, image_output, link_id, save_prefix, pipe=None, image=None, vae=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        new_pipe = {}
        if pipe is not None:
            image = image if image is not None else pipe['images']
            vae = vae if vae is not None else pipe.get('vae')
        elif image is None or vae is None:
            raise ValueError('pipe or image or vae missing.')
        model_path = folder_paths.get_full_path('upscale_models', model_name)
        sd = comfy.utils.load_torch_file(model_path, safe_load=True)
        upscale_model = model_loading.load_state_dict(sd).eval()
        device = comfy.model_management.get_torch_device()
        upscale_model.to(device)
        in_img = image.movedim(-1, -3).to(device)
        tile = 128 + 64
        overlap = 8
        steps = in_img.shape[0] * comfy.utils.get_tiled_scale_steps(in_img.shape[3], in_img.shape[2], tile_x=tile, tile_y=tile, overlap=overlap)
        pbar = comfy.utils.ProgressBar(steps)
        s = comfy.utils.tiled_scale(in_img, lambda a: upscale_model(a), tile_x=tile, tile_y=tile, overlap=overlap, upscale_amount=upscale_model.scale, pbar=pbar)
        upscale_model.cpu()
        s = torch.clamp(s.movedim(-3, -1), min=0, max=1.0)
        if rescale_after_model == True:
            samples = s.movedim(-1, 1)
            orig_height = samples.shape[2]
            orig_width = samples.shape[3]
            if rescale == 'by percentage' and percent != 0:
                height = percent / 100 * orig_height
                width = percent / 100 * orig_width
                if width > MAX_RESOLUTION:
                    width = MAX_RESOLUTION
                if height > MAX_RESOLUTION:
                    height = MAX_RESOLUTION
                width = easySampler.enforce_mul_of_64(width)
                height = easySampler.enforce_mul_of_64(height)
            elif rescale == 'to longer side - maintain aspect':
                longer_side = easySampler.enforce_mul_of_64(longer_side)
                if orig_width > orig_height:
                    (width, height) = (longer_side, easySampler.enforce_mul_of_64(longer_side * orig_height / orig_width))
                else:
                    (width, height) = (easySampler.enforce_mul_of_64(longer_side * orig_width / orig_height), longer_side)
            s = comfy.utils.common_upscale(samples, width, height, rescale_method, crop)
            s = s.movedim(1, -1)
        pixels = self.vae_encode_crop_pixels(s)
        t = vae.encode(pixels[:, :, :, :3])
        if pipe is not None:
            new_pipe = {'model': pipe['model'], 'positive': pipe['positive'], 'negative': pipe['negative'], 'vae': vae, 'clip': pipe['clip'], 'samples': {'samples': t}, 'images': s, 'seed': pipe['seed'], 'loader_settings': {**pipe['loader_settings']}}
            del pipe
        else:
            new_pipe = {}
        results = easySave(s, save_prefix, image_output, prompt, extra_pnginfo)
        if image_output in ('Sender', 'Sender/Save'):
            PromptServer.instance.send_sync('img-send', {'link_id': link_id, 'images': results})
        if image_output in ('Hide', 'Hide/Save'):
            return (new_pipe, s, {'samples': t})
        return {'ui': {'images': results}, 'result': (new_pipe, s, {'samples': t})}
```