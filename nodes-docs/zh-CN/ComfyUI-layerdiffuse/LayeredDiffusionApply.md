# Documentation
- Class name: LayeredDiffusionFG
- Category: layer_diffuse
- Output node: False
- Repo Ref: https://github.com/huchenlei/ComfyUI-layerdiffuse.git

LayeredDiffusionFG 类旨在通过应用分层扩散过程来增强图像生成任务，有效地生成带有透明背景的前景。该节点与各种模型集成，以实现所需效果，专注于层的无缝集成，以产生高质量的视觉输出。

# Input types
## Required
- model
    - 模型参数对于 LayeredDiffusionFG 节点至关重要，因为它定义了用于扩散过程的底层架构和参数。它决定了生成图像的质量和特性。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_base.BaseModel
- config
    - 配置参数对于指定所选模型对应的配置字符串至关重要。它确保在扩散过程中应用正确的设置，影响最终输出。
    - Comfy dtype: STRING
    - Python dtype: str
- weight
    - 权重参数影响生成图像上扩散效果的强度。它是控制前景细节与背景透明度之间权衡的关键因素。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- output
    - LayeredDiffusionFG 节点的输出是一个已经被扩散层打补丁的修改后的模型。这个模型准备好生成具有所需前景和透明背景特性的图像。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_base.BaseModel

# Usage tips
- Infra type: GPU

# Source code
```
class LayeredDiffusionFG:
    """Generate foreground with transparent background."""

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'config': ([c.config_string for c in s.MODELS],), 'weight': ('FLOAT', {'default': 1.0, 'min': -1, 'max': 3, 'step': 0.05})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'apply_layered_diffusion'
    CATEGORY = 'layer_diffuse'
    MODELS = (LayeredDiffusionBase(model_file_name='layer_xl_transparent_attn.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_transparent_attn.safetensors', sd_version=StableDiffusionVersion.SDXL, injection_method=LayerMethod.ATTN), LayeredDiffusionBase(model_file_name='layer_xl_transparent_conv.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_transparent_conv.safetensors', sd_version=StableDiffusionVersion.SDXL, injection_method=LayerMethod.CONV), LayeredDiffusionBase(model_file_name='layer_sd15_transparent_attn.safetensors', model_url='https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_transparent_attn.safetensors', sd_version=StableDiffusionVersion.SD1x, injection_method=LayerMethod.ATTN, attn_sharing=True))

    def apply_layered_diffusion(self, model: ModelPatcher, config: str, weight: float):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        if ld_model.attn_sharing:
            return ld_model.apply_layered_diffusion_attn_sharing(model)
        else:
            return ld_model.apply_layered_diffusion(model, weight)
```