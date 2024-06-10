# Documentation
- Class name: ApplyFooocusInpaint
- Category: inpaint
- Output node: False
- Repo Ref: https://github.com/Acly/comfyui-inpaint-nodes

该节点通过向给定模型应用补丁来促进图像修复过程，专注于填充数据中缺失或损坏的部分。它利用潜在表示和补丁技术，增强模型在目标区域生成连贯且上下文合适内容的能力。

# Input types
## Required
- model
    - 模型参数对于图像修复过程至关重要。它是应用补丁和集成修复特性的基础。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_patcher.ModelPatcher
- patch
    - 补丁参数对于图像修复过程至关重要，因为它包含了生成将应用于模型的补丁所需的特定修复头和设置。
    - Comfy dtype: INPAINT_PATCH
    - Python dtype: Tuple[InpaintHead, dict[str, Tensor]]
- latent
    - 潜在参数对于图像修复过程非常关键，因为它包含了用于生成缺失区域内容的编码信息。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, Any]

# Output types
- MODEL
    - 输出是经过补丁处理的模型，现在包含了修复的内容，有效地用上下文合适的数据填充了之前缺失或损坏的部分。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_patcher.ModelPatcher

# Usage tips
- Infra type: GPU

# Source code
```
class ApplyFooocusInpaint:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'patch': ('INPAINT_PATCH',), 'latent': ('LATENT',)}}
    RETURN_TYPES = ('MODEL',)
    CATEGORY = 'inpaint'
    FUNCTION = 'patch'

    def patch(self, model: ModelPatcher, patch: tuple[InpaintHead, dict[str, Tensor]], latent: dict[str, Any]):
        base_model: BaseModel = model.model
        latent_pixels = base_model.process_latent_in(latent['samples'])
        noise_mask = latent['noise_mask'].round()
        latent_mask = F.max_pool2d(noise_mask, (8, 8)).round().to(latent_pixels)
        (inpaint_head_model, inpaint_lora) = patch
        feed = torch.cat([latent_mask, latent_pixels], dim=1)
        inpaint_head_model.to(device=feed.device, dtype=feed.dtype)
        inpaint_head_feature = inpaint_head_model(feed)

        def input_block_patch(h, transformer_options):
            if transformer_options['block'][1] == 0:
                h = h + inpaint_head_feature.to(h)
            return h
        lora_keys = comfy.lora.model_lora_keys_unet(model.model, {})
        lora_keys.update({x: x for x in base_model.state_dict().keys()})
        loaded_lora = load_fooocus_patch(inpaint_lora, lora_keys)
        m = model.clone()
        m.set_model_input_block_patch(input_block_patch)
        patched = m.add_patches(loaded_lora, 1.0)
        not_patched_count = sum((1 for x in loaded_lora if x not in patched))
        if not_patched_count > 0:
            print(f'[ApplyFooocusInpaint] Failed to patch {not_patched_count} keys')
        inject_patched_calculate_weight()
        return (m,)
```