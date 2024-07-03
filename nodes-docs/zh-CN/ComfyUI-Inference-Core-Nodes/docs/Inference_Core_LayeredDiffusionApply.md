
# Documentation
- Class name: Inference_Core_LayeredDiffusionApply
- Category: layer_diffuse
- Output node: False

此节点旨在对输入模型应用分层扩散过程，利用特定配置和条件来修改模型的行为，以增强图像生成或转换效果。它将复杂的扩散和条件逻辑抽象为更易于用户使用的接口，旨在促进创建细腻高质量的视觉内容。

# Input types
## Required
- model
    - 代表将应用分层扩散过程的模型，在决定扩散过程的结果方面起着至关重要的作用，通过影响模型的行为和生成图像的质量。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- config
    - 指定分层扩散过程特定设置或参数的配置字符串，直接影响模型在图像生成过程中的修改和行为方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- weight
    - 一个浮点值，影响应用扩散过程的强度或程度，通过调整模型参数的修改方式来影响最终的视觉输出。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 应用分层扩散过程后的修改模型，展示了扩散和条件处理对模型生成或转换图像能力的影响。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionFG:
    """Generate foreground with transparent background."""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "config": ([c.config_string for c in s.MODELS],),
                "weight": (
                    "FLOAT",
                    {"default": 1.0, "min": -1, "max": 3, "step": 0.05},
                ),
            },
        }

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply_layered_diffusion"
    CATEGORY = "layer_diffuse"
    MODELS = (
        LayeredDiffusionBase(
            model_file_name="layer_xl_transparent_attn.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_transparent_attn.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            injection_method=LayerMethod.ATTN,
        ),
        LayeredDiffusionBase(
            model_file_name="layer_xl_transparent_conv.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_transparent_conv.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            injection_method=LayerMethod.CONV,
        ),
        LayeredDiffusionBase(
            model_file_name="layer_sd15_transparent_attn.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_sd15_transparent_attn.safetensors",
            sd_version=StableDiffusionVersion.SD1x,
            injection_method=LayerMethod.ATTN,
            attn_sharing=True,
        ),
    )

    def apply_layered_diffusion(
        self,
        model: ModelPatcher,
        config: str,
        weight: float,
    ):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        if ld_model.attn_sharing:
            return ld_model.apply_layered_diffusion_attn_sharing(model)
        else:
            return ld_model.apply_layered_diffusion(model, weight)

```
