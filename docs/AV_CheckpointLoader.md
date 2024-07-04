
# Documentation
- Class name: `AV_CheckpointLoader`
- Category: `Art Venture/Loaders`
- Output node: `False`

AV_CheckpointLoader节点设计用于加载模型检查点，并可选择性地覆盖特定组件，如检查点本身、VAE或LoRA模型。它扩展了标准检查点加载器的功能，允许用户为模型组件指定替代源，从而提高了模型配置和实验的灵活性。

# Input types
## Required
- **`ckpt_name`**
    - 指定要加载的检查点名称。此参数可以被覆盖以加载不同的检查点，为模型实验提供灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- **`vae_name`**
    - 指定要加载的VAE模型名称。此参数可以被覆盖以加载不同的VAE模型，允许对不同的VAE配置进行实验。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- **`clip_skip`**
    - 指示是否跳过加载CLIP模型。此参数允许根据需求选择性地加载模型组件。
    - Comfy dtype: INT
    - Python dtype: bool
- **`lora_name`**
    - 指定要加载的LoRA模型名称。此参数可以被覆盖以加载不同的LoRA模型，实现LoRA组件的自定义。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- **`lora_model_strength`**
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- **`lora_clip_strength`**
    - 未知
    - Comfy dtype: FLOAT
    - Python dtype: unknown
- **`positive`**
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- **`negative`**
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- **`token_normalization`**
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- **`weight_interpretation`**
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- **`empty_latent_width`**
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- **`empty_latent_height`**
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- **`batch_size`**
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
## Optional
- **`lora_stack`**
    - 未知
    - Comfy dtype: LORA_STACK
    - Python dtype: unknown
- **`cnet_stack`**
    - 未知
    - Comfy dtype: CONTROL_NET_STACK
    - Python dtype: unknown
- **`ckpt_override`**
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- **`vae_override`**
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- **`lora_override`**
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown

# Output types
- **`MODEL`**
    - Comfy dtype: MODEL
    - 加载的模型实例。
    - Python dtype: torch.nn.Module
- **`CONDITIONING+`**
    - Comfy dtype: CONDITIONING
    - 在检查点加载过程中加载或配置的正面调节组件。
    - Python dtype: Dict[str, torch.Tensor]
- **`CONDITIONING-`**
    - Comfy dtype: CONDITIONING
    - 在检查点加载过程中加载或配置的负面调节组件。
    - Python dtype: Dict[str, torch.Tensor]
- **`LATENT`**
    - Comfy dtype: LATENT
    - 从检查点加载或派生的潜在表示或配置。
    - Python dtype: torch.Tensor
- **`VAE`**
    - Comfy dtype: VAE
    - 作为检查点一部分加载的VAE模型（如果适用）。
    - Python dtype: torch.nn.Module
- **`CLIP`**
    - Comfy dtype: CLIP
    - 作为检查点一部分加载的CLIP模型（如果适用）。
    - Python dtype: torch.nn.Module
- **`DEPENDENCIES`**
    - Comfy dtype: DEPENDENCIES
    - 与主要模型组件一起加载的任何额外依赖项或组件。
    - Python dtype: List[torch.nn.Module]


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImpactWildcardEncode](../../ComfyUI-Impact-Pack/Nodes/ImpactWildcardEncode.md)



## Source code
```python
    class AVCheckpointLoader(TSC_EfficientLoader):
        @classmethod
        def INPUT_TYPES(cls):
            inputs = TSC_EfficientLoader.INPUT_TYPES()
            inputs["optional"]["ckpt_override"] = ("STRING", {"default": "None"})
            inputs["optional"]["vae_override"] = ("STRING", {"default": "None"})
            inputs["optional"]["lora_override"] = ("STRING", {"default": "None"})
            return inputs

        CATEGORY = "Art Venture/Loaders"

        def efficientloader(
            self,
            ckpt_name,
            vae_name,
            clip_skip,
            lora_name,
            *args,
            ckpt_override="None",
            vae_override="None",
            lora_override="None",
            **kwargs
        ):
            if ckpt_override != "None":
                ckpt_name = ckpt_override
            if vae_override != "None":
                vae_name = vae_override
            if lora_override != "None":
                lora_name = lora_override

            return super().efficientloader(
                ckpt_name, vae_name, clip_skip, lora_name, *args, **kwargs
            )

```
