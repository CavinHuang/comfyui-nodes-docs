
# Documentation
- Class name: Inference_Core_LayeredDiffusionCondApply
- Category: layer_diffuse
- Output node: False

本节点专门用于对输入数据应用条件化分层扩散过程,利用特定的配置和权重来调节扩散效果。它集成了条件化输入来引导扩散过程,从而以细致的控制增强数据的生成或转换。

# Input types
## Required
- model
    - 将应用分层扩散过程的模型,作为扩散修改的基础。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- cond
    - 前景的条件化输入,用于引导扩散过程以实现特定的视觉效果或特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.TensorType]]]
- uncond
    - 背景的无条件输入,为扩散过程提供基准并影响整体输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Optional[List[List[torch.TensorType]]]
- latent
    - 扩散过程中使用的潜在表示,有助于输出的生成或转换。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- config
    - 指定扩散模型和设置的配置字符串,对确定扩散过程的行为至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- weight
    - 影响应用于模型的扩散效果的强度和特征的权重因子。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出经过条件化分层扩散处理的修改后模型,反映了应用的条件和调整。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- conditioning
    - 扩散过程中使用的条件化信息,表明条件化输入如何影响输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LayeredDiffusionCond:
    """Generate foreground + background given background / foreground.
    - FG => Blended
    - BG => Blended
    """

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "cond": ("CONDITIONING",),
                "uncond": ("CONDITIONING",),
                "latent": ("LATENT",),
                "config": ([c.config_string for c in s.MODELS],),
                "weight": (
                    "FLOAT",
                    {"default": 1.0, "min": -1, "max": 3, "step": 0.05},
                ),
            },
        }

    RETURN_TYPES = ("MODEL", "CONDITIONING", "CONDITIONING")
    FUNCTION = "apply_layered_diffusion"
    CATEGORY = "layer_diffuse"
    MODELS = (
        LayeredDiffusionBase(
            model_file_name="layer_xl_fg2ble.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_fg2ble.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            cond_type=LayerType.FG,
        ),
        LayeredDiffusionBase(
            model_file_name="layer_xl_bg2ble.safetensors",
            model_url="https://huggingface.co/LayerDiffusion/layerdiffusion-v1/resolve/main/layer_xl_bg2ble.safetensors",
            sd_version=StableDiffusionVersion.SDXL,
            cond_type=LayerType.BG,
        ),
    )

    def apply_layered_diffusion(
        self,
        model: ModelPatcher,
        cond,
        uncond,
        latent,
        config: str,
        weight: float,
    ):
        ld_model = [m for m in self.MODELS if m.config_string == config][0]
        assert get_model_sd_version(model) == ld_model.sd_version
        c_concat = model.model.latent_format.process_in(latent["samples"])
        return ld_model.apply_layered_diffusion(
            model, weight
        ) + ld_model.apply_c_concat(cond, uncond, c_concat)

```
