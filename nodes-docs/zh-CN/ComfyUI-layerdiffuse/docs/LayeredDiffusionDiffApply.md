# Documentation
- Class name: LayeredDiffusionDiff
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/huchenlei/ComfyUI-layerdiffuse.git

LayeredDiffusionDiff节点旨在从混合图像中分离前景和背景元素。它通过应用扩散过程实现这一点，该过程允许模型根据提供的条件区分和提取前景或背景。此节点对于需要在不影响其他视觉元素的情况下操作或隔离特定图像组件的任务至关重要。

# Input types
## Required
- model
    - 模型参数对节点的操作至关重要，因为它定义了将用于应用扩散过程的底层模型。正是通过这个模型，节点与图像数据交互以分离前景和背景。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- cond
    - cond参数作为指导扩散过程提取所需图像组件的条件输入。它在确定分离过程的结果中起着关键作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, torch.Tensor]}}
- uncond
    - uncond参数提供无条件输入，补充扩散过程，确保模型能够在没有特定先决条件的情况下生成所需的图像组件。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, torch.Tensor]}}
- blended_latent
    - blended_latent参数代表混合图像的潜在表示，节点将尝试从中提取前景或背景。这是扩散过程的一个关键输入。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- latent
    - latent参数保存图像的潜在表示，将与混合潜在表示一起使用，以指导扩散过程。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- config
    - config参数指定扩散模型的配置设置，确保节点根据预定义的模型规格进行操作。
    - Comfy dtype: STRING
    - Python dtype: str
- weight
    - weight参数允许微调扩散过程对图像分离的影响。它提供了一种调整应用扩散强度的手段。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 模型输出代表应用扩散过程后的输入模型的修改版本。根据扩散配置，它包含分离的前景或背景。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- cond
    - cond输出提供在扩散过程中所做的更改的更新条件信息。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, torch.Tensor]}}
- uncond
    - uncond输出反映了通过扩散机制处理的更新后的无条件输入。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, torch.Tensor]}}

# Usage tips
- Infra type: GPU

# Source code
```
class LayeredDiffusionDiff:
    """Extract FG/BG from blended image.
    - Blended + FG => BG
    - Blended + BG => FG
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'cond': ('CONDITIONING',), 'uncond': ('CONDITIONING',), 'blended_latent': ('LATENT',), 'latent': ('LATENT',), 'config': ([c.config_string for c in s.MODELS],), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05})}}
    RETURN_TYPES = ('MODEL', 'CONDITIONING', 'CONDITIONING')
    FUNCTION = 'apply_layered_diffusion'
    CATEGORY = 'layer_diffuse'
    MODELS = (LayeredDiffusionBase(model_file_name='layer_xl_fgble2bg.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_fgble2bg.safetensors', sd_version=StableDiffusionVersion.SDXL, cond_type=LayerType.FG), LayeredDiffusionBase(model_file_name='layer_xl_bgble2fg.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_bgble2fg.safetensors', sd_version=StableDiffusionVersion.SDXL, cond_type=LayerType.BG))

    def apply_layered_diffusion(self, model: ModelPatcher, cond, uncond, blended_latent, latent, config: str, weight: float):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        c_concat = model.model.latent_format.process_in(torch.cat([latent['samples'], blended_latent['samples']], dim=1))
        return ld_model.apply_layered_diffusion(model, weight) + ld_model.apply_c_concat(cond, uncond, c_concat)
```