# Documentation
- Class name: samplerSimpleInpainting
- Category: EasyUse/Sampler
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

该节点通过使用VAE模型来填充图像中缺失或指定的区域，从而促进图像修复过程。它与各种条件选项集成，根据用户规范细化修复效果。

# Input types
## Required
- pipe
    - pipe对象是必需的，因为它包含了进行图像修复过程所需的模型和图像。它作为节点的主要输入，指导整个操作。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- grow_mask_by
    - 这个参数影响用于修复的遮罩的增长，决定了将受到影响的区域。它对于定义修复过程的范围至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- image_output
    - image_output参数决定了图像修复过程后结果图像的处理方式。它指定是预览、保存还是结合这些操作，影响输出展示。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- additional
    - 这个参数为修复过程提供了额外的条件选项，如微分扩散或模型条件。它增强了修复结果的灵活性和定制化。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- pipe
    - 更新后的pipe对象包含修复后的图像以及过程中所做的修改。它作为主要输出，封装了图像修复操作的结果。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image
    - 图像输出代表修复后的结果，根据image_output参数，可能是预览、保存或两者兼有。它是图像修复过程的具体成果。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class samplerSimpleInpainting:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'grow_mask_by': ('INT', {'default': 6, 'min': 0, 'max': 64, 'step': 1}), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'], {'default': 'Preview'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'}), 'additional': (['None', 'Differential Diffusion', 'Only InpaintModelConditioning'], {'default': 'None'})}, 'optional': {'model': ('MODEL',), 'mask': ('MASK',), 'patch': ('INPAINT_PATCH',)}, 'hidden': {'tile_size': 'INT', 'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID', 'embeddingsList': (folder_paths.get_filename_list('embeddings'),)}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE', 'VAE')
    RETURN_NAMES = ('pipe', 'image', 'vae')
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Sampler'

    def run(self, pipe, grow_mask_by, image_output, link_id, save_prefix, additional, model=None, mask=None, patch=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        fooocus_model = None
        model = model if model is not None else pipe['model']
        latent = pipe['samples'] if 'samples' in pipe else None
        positive = pipe['positive']
        negative = pipe['negative']
        pixels = pipe['images'] if pipe and 'images' in pipe else None
        vae = pipe['vae'] if pipe and 'vae' in pipe else None
        if 'noise_mask' in latent and mask is None:
            mask = latent['noise_mask']
        else:
            if pixels is None:
                raise Exception('No Images found')
            if vae is None:
                raise Exception('No VAE found')
            (latent,) = VAEEncodeForInpaint().encode(vae, pixels, mask, grow_mask_by)
            mask = latent['noise_mask']
        if mask is not None:
            if additional != 'None':
                (positive, negative, latent) = InpaintModelConditioning().encode(positive, negative, pixels, vae, mask)
                if additional == 'Differential Diffusion':
                    cls = ALL_NODE_CLASS_MAPPINGS['DifferentialDiffusion']
                    if cls is not None:
                        (model,) = cls().apply(model)
                    else:
                        raise Exception('Differential Diffusion not found,please update comfyui')
            if patch is not None:
                worker = InpaintWorker(node_name='easy kSamplerInpainting')
                (fooocus_model,) = worker.patch(model, latent, patch)
            new_pipe = {**pipe, 'model': fooocus_model if fooocus_model is not None else model, 'positive': positive, 'negative': negative, 'vae': vae, 'samples': latent, 'loader_settings': pipe['loader_settings']}
        else:
            new_pipe = pipe
        del pipe
        return samplerFull().run(new_pipe, None, None, None, None, None, image_output, link_id, save_prefix, None, None, None, None, None, None, None, None, tile_size, prompt, extra_pnginfo, my_unique_id, force_full_denoise, disable_noise)
```