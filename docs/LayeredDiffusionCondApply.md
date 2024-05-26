# Documentation
- Class name: LayeredDiffusionCond
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/huchenlei/ComfyUI-layerdiffuse.git

LayeredDiffusionCond节点旨在从前景或背景输入成混合图像。它利用扩散模型的力量在提供的条件下创建无缝混合，增强输出的视觉一致性和细节。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了用于生成混合图像的基础扩散模型。它直接影响节点的性能和输出图像的质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- cond
    - cond参数代表引导扩散过程朝向特定结果的条件输入。适当选择它对于实现所需的图像特征至关重要。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- uncond
    - uncond参数作为额外的条件输入，可用于影响扩散过程，允许对最终图像进行更精细的控制。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- latent
    - latent参数保存图像的潜在表示，这是扩散模型的输入。它在确定生成过程的初始状态中起着关键作用。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- config
    - config参数指定扩散模型的配置设置。对于使模型的行为与所需的生成特征保持一致非常重要。
    - Comfy dtype: STR
    - Python dtype: str
- weight
    - weight参数调整应用于模型的补丁的影响。它提供了一种微调原始和修改后图像特征之间平衡的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- blended_model
    - blended_model输出代表已通过分层扩散过程增强的修改后的扩散模型。它很重要，因为它包含了输入条件的联合效应。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- blended_cond
    - blended_cond输出是应用分层扩散后的条件信息的结果。它反映了图像生成过程的更新状态。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]
- blended_uncond
    - blended_uncond输出对应于通过扩散模型处理的额外条件信息。它有助于最终图像的细微特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class LayeredDiffusionCond:
    """Generate foreground + background given background / foreground.
    - FG => Blended
    - BG => Blended
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'cond': ('CONDITIONING',), 'uncond': ('CONDITIONING',), 'latent': ('LATENT',), 'config': ([c.config_string for c in s.MODELS],), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05})}}
    RETURN_TYPES = ('MODEL', 'CONDITIONING', 'CONDITIONING')
    FUNCTION = 'apply_layered_diffusion'
    CATEGORY = 'layer_diffuse'
    MODELS = (LayeredDiffusionBase(model_file_name='layer_xl_fg2ble.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_fg2ble.safetensors', sd_version=StableDiffusionVersion.SDXL, cond_type=LayerType.FG), LayeredDiffusionBase(model_file_name='layer_xl_bg2ble.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_bg2ble.safetensors', sd_version=StableDiffusionVersion.SDXL, cond_type=LayerType.BG))

    def apply_layered_diffusion(self, model: ModelPatcher, cond, uncond, latent, config: str, weight: float):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        c_concat = model.model.latent_format.process_in(latent['samples'])
        return ld_model.apply_layered_diffusion(model, weight) + ld_model.apply_c_concat(cond, uncond, c_concat)
```