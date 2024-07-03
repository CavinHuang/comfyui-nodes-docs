
# Documentation
- Class name: Lora Loader (JPS)
- Category: JPS Nodes/IO
- Output node: False

Lora Loader (JPS)节点旨在动态加载并应用LoRA（低秩适应）调整到模型和/或CLIP组件，基于指定的参数。它能够在不改变原始模型架构的情况下实现模型行为的定制，从而对模型输出进行精细控制。

# Input types
## Required
- model
    - model参数代表将要应用LoRA调整的基础模型。它对于定义适应过程的起点至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - clip参数表示可能也会进行LoRA调整的CLIP模型组件，允许在涉及文本和图像处理的任务中增强或修改功能。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- switch
    - 此参数控制是否应用LoRA调整，提供了一种简单的机制来启用或禁用适应过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_name
    - 指定要加载和应用的LoRA文件的名称，作为检索适当适应参数的关键标识符。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength_model
    - 决定应用于模型的LoRA调整的强度，使得能够精确控制适应的影响。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - 设置CLIP组件的LoRA调整强度，允许对其行为进行定制修改。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 应用了LoRA调整的修改后模型，反映了由输入参数指定的行为或性能变化。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 应用了LoRA调整的CLIP组件（如果适用），展示了该节点适应各种模型组件的能力。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class IO_Lora_Loader:
    def __init__(self):
        self.loaded_lora = None

    @classmethod
    def INPUT_TYPES(s):
        file_list = folder_paths.get_filename_list("loras")
        file_list.insert(0, "None")
        return {"required": { "model": ("MODEL",),
                              "clip": ("CLIP", ),
                              "switch": ([
                                "Off",
                                "On"],),
                              "lora_name": (file_list, ),
                              "strength_model": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.1}),
                              "strength_clip": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.1}),
                              }}
    RETURN_TYPES = ("MODEL", "CLIP")
    FUNCTION = "load_lora"

    CATEGORY = "JPS Nodes/IO"

    def load_lora(self, model, clip, switch, lora_name, strength_model, strength_clip):
        if strength_model == 0 and strength_clip == 0:
            return (model, clip)

        if switch == "Off" or  lora_name == "None":
            return (model, clip)

        lora_path = folder_paths.get_full_path("loras", lora_name)
        lora = None
        if self.loaded_lora is not None:
            if self.loaded_lora[0] == lora_path:
                lora = self.loaded_lora[1]
            else:
                del self.loaded_lora

        if lora is None:
            lora = comfy.utils.load_torch_file(lora_path, safe_load=True)
            self.loaded_lora = (lora_path, lora)

        model_lora, clip_lora = comfy.sd.load_lora_for_models(model, clip, lora, strength_model, strength_clip)
        return (model_lora, clip_lora)

```
