# Documentation
- Class name: LayeredDiffusionJoint
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/huchenlei/ComfyUI-layerdiffuse.git

LayeredDiffusionJoint节点旨在执行单批次推理，生成前景、背景和混合图像。它能够通过应用分层扩散技术处理复杂的图像生成任务，允许创建具有复杂细节和分层效果的图像。该节点特别适用于需要同时生成多个图像组件的应用程序，简化了流程并提高了图像合成工作流程的整体效率。

# Input types
## Required
- model
    - 模型参数对节点的操作至关重要，因为它定义了将用于扩散过程的底层模型。这是一个关键组件，直接影响节点的执行和生成图像的质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- config
    - 配置字符串是一个必需的参数，它指定了分层扩散过程的设置。它在确定节点如何应用扩散技术以生成所需图像方面起着关键作用。
    - Comfy dtype: str
    - Python dtype: str
- fg_cond
    - 前景条件参数是可选的，用于为生成图像的前景部分提供特定的指导。它允许微调扩散过程，以满足图像前景的特定要求。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.Tensor]]]
- bg_cond
    - 背景条件参数是可选的，用于指导图像背景的生成。它使节点能够创建与所需视觉效果一致的背景。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.Tensor]]]
- blended_cond
    - 混合条件参数是可选的，用于定义生成图像的混合特性。它有助于在图像内实现前景和背景元素的和谐混合。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.Tensor]]]

# Output types
- model
    - 输出模型代表了输入模型的补丁版本，现在具备了分层扩散能力。这个模型准备好了生成具有分层效果的图像，为图像合成过程提供了更高程度的控制和定制化。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class LayeredDiffusionJoint:
    """Generate FG + BG + Blended in one inference batch. Batch size = 3N."""

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'config': ([c.config_string for c in s.MODELS],)}, 'optional': {'fg_cond': ('CONDITIONING',), 'bg_cond': ('CONDITIONING',), 'blended_cond': ('CONDITIONING',)}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'apply_layered_diffusion'
    CATEGORY = 'layer_diffuse'
    MODELS = (LayeredDiffusionBase(model_file_name='layer_sd15_joint.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_joint.safetensors', sd_version=StableDiffusionVersion.SD1x, attn_sharing=True, frames=3),)

    def apply_layered_diffusion(self, model: ModelPatcher, config: str, fg_cond: Optional[List[List[torch.TensorType]]]=None, bg_cond: Optional[List[List[torch.TensorType]]]=None, blended_cond: Optional[List[List[torch.TensorType]]]=None):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        assert ld_model.attn_sharing
        work_model = ld_model.apply_layered_diffusion_attn_sharing(model)[0]
        work_model.model_options.setdefault('transformer_options', {})
        work_model.model_options['transformer_options']['cond_overwrite'] = [cond[0][0] if cond is not None else None for cond in (fg_cond, bg_cond, blended_cond)]
        return (work_model,)
```