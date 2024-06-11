# Register Model as LoRA Hook 🎭🅐🅓
## Documentation
- Class name: ADE_RegisterModelAsLoraHook
- Category: Animate Diff 🎭🅐🅓/conditioning/register lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在将模型注册为AnimateDiff框架中的LoRA挂钩，从而在生成过程中实现模型行为的动态修改和控制。它通过LoRA（低秩适应）技术与模型集成，允许根据特定条件或输入对模型输出进行增强定制和微调。

## Input types
### Required
- model
    - 表示LoRA挂钩将应用到的目标模型参数。它对于定义LoRA适应的范围和上下文至关重要，影响模型行为在生成过程中的修改方式。
    - Comfy dtype: MODEL
    - Python dtype: Union[ModelPatcher, ModelPatcherAndInjector]
- clip
    - 指定过程中涉及的CLIP模型（如果有），提供LoRA适应可能与主模型一起应用的上下文。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
- ckpt_name
    - 指示加载模型状态的检查点名称，对于使用特定预训练权重或配置初始化模型至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength_model
    - 控制应用于模型的LoRA修改的强度参数。它允许对LoRA对模型行为的影响进行微调，从而实现生成过程的精确调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - 类似于strength_model，此参数调整LoRA修改的强度，但特别针对过程中涉及的CLIP模型。它允许分别控制不同生成框架组件的适应强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- model
    - Comfy dtype: MODEL
    - 应用LoRA挂钩后的模型，反映通过输入参数指定的动态适应。
    - Python dtype: ModelPatcher
- clip
    - Comfy dtype: CLIP
    - 如果过程中涉及CLIP模型，则应用LoRA挂钩的CLIP模型。它指示LoRA修改应用于CLIP组件。
    - Python dtype: CLIP
- lora_hook
    - Comfy dtype: LORA_HOOK
    - 已注册并应用于模型和/或CLIP的LoRA挂钩，封装了所做的具体适应。
    - Python dtype: LoraHook

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class MaskableSDModelLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
                "strength_clip": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
            }
        }
    
    RETURN_TYPES = ("MODEL", "CLIP", "LORA_HOOK")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/register lora hooks"
    FUNCTION = "load_model_as_lora"

    def load_model_as_lora(self, model: ModelPatcher, clip: CLIP, ckpt_name: str, strength_model: float, strength_clip: float):
        ckpt_path = folder_paths.get_full_path("checkpoints", ckpt_name)
        out = comfy.sd.load_checkpoint_guess_config(ckpt_path, output_vae=True, output_clip=True, embedding_directory=folder_paths.get_folder_paths("embeddings"))
        model_loaded = out[0]
        clip_loaded = out[1]

        lora_hook = LoraHook(lora_name=ckpt_name)
        lora_hook_group = LoraHookGroup()
        lora_hook_group.add(lora_hook)
        model_lora, clip_lora = load_model_as_hooked_lora_for_models(model=model, clip=clip,
                                                                     model_loaded=model_loaded, clip_loaded=clip_loaded,
                                                                     lora_hook=lora_hook,
                                                                     strength_model=strength_model, strength_clip=strength_clip)
        return (model_lora, clip_lora, lora_hook_group)