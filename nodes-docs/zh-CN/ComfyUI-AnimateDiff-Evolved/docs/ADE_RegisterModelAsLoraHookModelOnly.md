# Register Model as LoRA Hook (MO) 🎭🅐🅓
## Documentation
- Class name: ADE_RegisterModelAsLoraHookModelOnly
- Category: Animate Diff 🎭🅐🅓/conditioning/register lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点专门用于将模型注册为LoRA挂钩，重点是仅对模型进行修改。它允许将LoRA（低秩适应）技术集成到特定模型中，增强其适应性和性能，以便执行特定任务，而不影响其他组件。

## Input types
### Required
- model
    - 要使用LoRA技术进行适应的模型。它作为应用低秩适应的主要目标，旨在增强其性能或适应性，以执行特定任务。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher
- ckpt_name
    - 要从中应用LoRA配置的检查点名称。此参数指定要使用的LoRA适应集，指导模型行为的定制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength_model
    - 一个浮点值，决定LoRA适应对模型的强度。它调节LoRA参数对模型行为的影响程度。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- model
    - Comfy dtype: MODEL
    - 应用指定LoRA适应后的模型。此输出反映了通过LoRA技术定制后的增强版模型。
    - Python dtype: ModelPatcher
- lora_hook
    - Comfy dtype: LORA_HOOK
    - 已集成到模型中的LoRA挂钩的引用。此输出提供了对应用的LoRA适应的访问，便于进一步操作或分析。
    - Python dtype: LoraHook

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class MaskableSDModelLoaderModelOnly(MaskableSDModelLoader):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
            }
        }
    
    RETURN_TYPES = ("MODEL", "LORA_HOOK")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/register lora hooks"
    FUNCTION = "load_model_as_lora_model_only"

    def load_model_as_lora_model_only(self, model: ModelPatcher, ckpt_name: str, strength_model: float):
        model_lora, clip_lora, lora_hook = self.load_model_as_lora(model=model, clip=None, ckpt_name=ckpt_name,
                                                                   strength_model=strength_model, strength_clip=0)
        return (model_lora, lora_hook)