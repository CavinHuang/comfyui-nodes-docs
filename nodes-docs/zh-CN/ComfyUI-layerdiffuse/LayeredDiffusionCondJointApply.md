# Documentation
- Class name: LayeredDiffusionCondJoint
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/huchenlei/ComfyUI-layerdiffuse.git

LayeredDiffusionCondJoint节点旨在将前景和背景元素无缝集成到混合图像中。它通过应用分层扩散技术实现这一点，这允许生成保持前景和背景组件不同特征的复合图像。该节点特别适用于视觉连贯性和不同图像元素现实混合至关重要的应用中。

# Input types
## Required
- model
    - 模型参数对节点的操作至关重要，因为它定义了用于生成混合图像的基础模型。模型的选择直接影响生成图像的质量和风格。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- image
    - 图像输入是必不可少的，因为它提供了将由节点处理并与其他元素混合的视觉内容。输入图像的质量和分辨率显著影响最终输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- config
    - 配置字符串参数很重要，因为它指定了将指导扩散过程的设置和选项。它决定了节点将如何混合前景和背景元素。
    - Comfy dtype: str
    - Python dtype: str
- cond
    - 条件输入在提供时，允许对扩散过程进行额外控制，使节点能够生成更符合特定条件或风格的图像。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[List[torch.Tensor]]
- blended_cond
    - 混合条件输入用于进一步完善混合过程，确保最终图像满足所需的美学和主题要求。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[List[torch.Tensor]]

# Output types
- model
    - 输出模型是扩散过程的结果，代表了根据输入参数指定的结合前景和背景元素的混合图像。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class LayeredDiffusionCondJoint:
    """Generate fg/bg + blended given fg/bg.
    - FG => Blended + BG
    - BG => Blended + FG
    """

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'image': ('IMAGE',), 'config': ([c.config_string for c in s.MODELS],)}, 'optional': {'cond': ('CONDITIONING',), 'blended_cond': ('CONDITIONING',)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'apply_layered_diffusion'
    CATEGORY = 'layer_diffuse'
    MODELS = (LayeredDiffusionBase(model_file_name='layer_sd15_fg2bg.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_fg2bg.safetensors', sd_version=StableDiffusionVersion.SD1x, attn_sharing=True, frames=2, cond_type=LayerType.FG), LayeredDiffusionBase(model_file_name='layer_sd15_bg2fg.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_bg2fg.safetensors', sd_version=StableDiffusionVersion.SD1x, attn_sharing=True, frames=2, cond_type=LayerType.BG))

    def apply_layered_diffusion(self, model: ModelPatcher, image, config: str, cond: Optional[List[List[torch.TensorType]]]=None, blended_cond: Optional[List[List[torch.TensorType]]]=None):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        assert ld_model.attn_sharing
        work_model = ld_model.apply_layered_diffusion_attn_sharing(model, control_img=image.movedim(-1, 1))[0]
        work_model.model_options.setdefault('transformer_options', {})
        work_model.model_options['transformer_options']['cond_overwrite'] = [cond[0][0] if cond is not None else None for cond in (cond, blended_cond)]
        return (work_model,)
```