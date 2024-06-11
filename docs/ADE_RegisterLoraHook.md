# Register LoRA Hook 🎭🅐🅓
## Documentation
- Class name: ADE_RegisterLoraHook
- Category: Animate Diff 🎭🅐🅓/conditioning/register lora hooks
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-AnimateDiff-Evolved.git

此节点旨在AnimateDiff框架内注册LoRA挂钩，从而实现模型行为的动态修改，以增强动画和图像处理能力。

## Input types
### Required
- model
    - 要应用LoRA挂钩的模型，作为动态行为修改的基础。
    - Comfy dtype: MODEL
    - Python dtype: ModelPatcher or ModelPatcherAndInjector
- clip
    - 可能与主模型一起可选修改的CLIP模型，允许同步调整。
    - Comfy dtype: CLIP
    - Python dtype: CLIP
- lora_name
    - 要应用的特定LoRA挂钩的标识符，决定行为修改的性质。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength_model
    - 定义LoRA挂钩对模型影响的强度，允许对行为修改进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - 指定LoRA挂钩对CLIP模型影响的强度，使其行为精确调整。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- model
    - Comfy dtype: MODEL
    - 应用LoRA挂钩后的模型，准备进行增强的动画和图像处理任务。
    - Python dtype: ModelPatcher or ModelPatcherAndInjector
- clip
    - Comfy dtype: CLIP
    - 可选修改后的CLIP模型，与主模型同步调整以实现增强。
    - Python dtype: CLIP
- lora_hook
    - Comfy dtype: LORA_HOOK
    - 已注册的LoRA挂钩，封装了指定的修改，准备应用于模型。
    - Python dtype: LoraHookGroup

## Usage tips
- Infra type: CPU
- Common nodes: unknown

## Source code
```python
class MaskableLoraLoader:
    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "lora_name": (folder_paths.get_filename_list("loras"), ),
                "strength_model": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
                "strength_clip": ("FLOAT", {"default": 1.0, "min": -20.0, "max": 20.0, "step": 0.01}),
            }
        }
    
    RETURN_TYPES = ("MODEL", "CLIP", "LORA_HOOK")
    CATEGORY = "Animate Diff 🎭🅐🅓/conditioning/register lora hooks"
    FUNCTION = "load_lora"

    def load_lora(self, model: Union[ModelPatcher, ModelPatcherAndInjector], clip: CLIP, lora_name: str, strength_model: float, strength_clip: float):
        if strength_model == 0 and strength_clip == 0:
            return (model, clip)
        
        lora_path = folder_paths.get_full_path("loras", lora_name)
        lora = None
        if self.loaded_lora is not None:
            if self.loaded_lora[0] == lora_path:
                lora = self.loaded_lora[1]
            else:
                temp = self.loaded_lora
                self.loaded_lora = None
                del temp
        
        if lora is None:
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            self.loaded_lora = (lora_path, lora)

        lora_hook = LoraHook(lora_name=lora_name)
        lora_hook_group = LoraHookGroup()
        lora_hook_group.add(lora_hook)
        model_lora, clip_lora = load_hooked_lora_for_models(model=model, clip=clip, lora=lora, lora_hook=lora_hook,
                                                            strength_model=strength_model, strength_clip=strength_clip)
        return (model_lora, clip_lora, lora_hook_group)