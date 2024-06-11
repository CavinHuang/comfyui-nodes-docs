# Register LoRA Hook (Model Only) 🎭🅐🅓
## Documentation
- Class name: ADE_RegisterLoraHookModelOnly
- Category: Animate Diff 🎭🅐🅓/conditioning/register lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在将模型注册为LoRA（低秩适应）挂钩，专注于模型而不涉及任何CLIP模型。它通过LoRA技术实现模型行为的修改和增强，为将LoRA挂钩集成到模型中提供了一种简化的方法，以实现高级定制和性能调优。

## Input types
### Required
- model
    - 要注册LoRA挂钩的模型。它是LoRA适应的主要目标，决定了应用修改的范围和影响。
    - Comfy dtype: MODEL
    - Python dtype: Union[ModelPatcher, ModelPatcherAndInjector]
- lora_name
    - 要应用的LoRA配置的名称。指定要使用的特定LoRA适应设置和参数，指导定制过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength_model
    - 一个浮点值，表示LoRA适应对模型的强度。此参数控制应用的LoRA修改的强度，允许对模型行为进行精细调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- model
    - Comfy dtype: MODEL
    - 注册了LoRA挂钩后的模型。此输出反映了模型的修改状态，展示了LoRA适应的效果。
    - Python dtype: ModelPatcher
- lora_hook
    - Comfy dtype: LORA_HOOK
    - 已与模型注册的LoRA挂钩。此输出表示应用的LoRA适应机制，便于进一步定制和性能调优。
    - Python dtype: LoraHook

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class MaskableLoraLoaderModelOnly(MaskableLoraLoader):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "lora_name": (folder_paths.get_filename_list("loras"), ),
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL", "LORA_HOOK")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/register lora hooks"
    FUNCTION = "load_lora_model_only"

    def load_lora_model_only(self, model: ModelPatcher, lora_name: str, strength_model: float):
        model_lora, clip_lora, lora_hook = self.load_lora(mod