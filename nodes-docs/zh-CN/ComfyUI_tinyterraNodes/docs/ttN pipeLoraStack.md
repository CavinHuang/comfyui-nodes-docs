
# Documentation
- Class name: ttN pipeLoraStack
- Category: ttN/pipe
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ttN pipeLoraStack节点旨在通过堆叠LoRA调整来动态增强和修改模型和剪辑的功能，这些调整基于指定的配置。它允许用户通过应用学习到的仿射变换来自定义模型和剪辑的行为，使用户能够精确地微调他们的生成过程。

# Input types
## Required
- toggle
    - 决定是否应用LoRA堆栈，作为启用或禁用堆叠过程的开关。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool
- mode
    - 指定LoRA调整的操作模式，区分简单和高级配置，用于应用模型和剪辑强度修改。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- num_loras
    - 表示要应用的LoRA调整数量，允许堆叠多层修改。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- optional_pipe
    - 一个可选的管道配置，如果提供，可以用LoRA调整来增强；否则，将生成一个新的配置。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict or None
- model_override
    - 允许在可选管道中覆盖模型组件，便于自定义模型调整。
    - Comfy dtype: MODEL
    - Python dtype: object or None
- clip_override
    - 允许在可选管道中覆盖剪辑组件，便于自定义剪辑调整。
    - Comfy dtype: CLIP
    - Python dtype: object or None
- optional_lora_stack
    - 一个预定义的LoRA调整列表，可以选择性地包含用于堆叠，提供了导入现有配置或添加到现有配置的方法。
    - Comfy dtype: LORA_STACK
    - Python dtype: list of tuples or None
- lora_i_name
    - 指定要应用的第i个LoRA调整的名称，使能够识别和应用特定的LoRA变换。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- lora_i_strength
    - 在简单模式下定义第i个LoRA调整对模型和剪辑的强度，允许统一的修改强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_i_model_strength
    - 在高级模式下指定应用于模型的第i个LoRA调整的强度，使模型变换能够有差异化的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- lora_i_clip_strength
    - 在高级模式下指定应用于剪辑的第i个LoRA调整的强度，使剪辑变换能够有差异化的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- optional_pipe
    - 返回应用LoRA堆栈后增强或新创建的管道配置。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- lora_stack
    - 提供应用的LoRA调整列表，详细说明对模型和剪辑所做的修改。
    - Comfy dtype: LORA_STACK
    - Python dtype: list of tuples or None


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeLoraStack:
    version = '1.1.1'
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        inputs = {
            "required": {
                "toggle": ([True, False],),
                "mode": (["simple", "advanced"],),
                "num_loras": ("INT", {"default": 1, "min": 0, "max": 20}),
            },
            "optional": {
                "optional_pipe": ("PIPE_LINE", {"default": None}),
                "model_override": ("MODEL",),
                "clip_override": ("CLIP",),
                "optional_lora_stack": ("LORA_STACK",),
            }, 
            "hidden": {
                "ttNnodeVersion": (ttN_pipeLoraStack.version),
            },
        }

        for i in range(1, 21):
            inputs["optional"][f"lora_{i}_name"] = (["None"] + folder_paths.get_filename_list("loras"),{"default": "None"})
            inputs["optional"][f"lora_{i}_strength"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}) 
            inputs["optional"][f"lora_{i}_model_strength"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})
            inputs["optional"][f"lora_{i}_clip_strength"] = ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})
        
        return inputs
    
    
    RETURN_TYPES = ("PIPE_LINE", "LORA_STACK",)
    RETURN_NAMES = ("optional_pipe","lora_stack",)
    FUNCTION = "stack"

    CATEGORY = "ttN/pipe"

    def stack(self, toggle, mode, num_loras, optional_pipe=None, lora_stack=None, model_override=None, clip_override=None, **kwargs):
        if (toggle in [False, None, "False"]) or not kwargs:
            return optional_pipe, None
        
        loras = []

        # Import Stack values
        if lora_stack is not None:
            loras.extend([l for l in lora_stack if l[0] != "None"])

        # Import Lora values
        for i in range(1, num_loras + 1):
            lora_name = kwargs.get(f"lora_{i}_name")

            if not lora_name or lora_name == "None":
                continue

            if mode == "simple":
                lora_strength = float(kwargs.get(f"lora_{i}_strength"))
                loras.append((lora_name, lora_strength, lora_strength))
            elif mode == "advanced":
                model_strength = float(kwargs.get(f"lora_{i}_model_strength"))
                clip_strength = float(kwargs.get(f"lora_{i}_clip_strength"))
                loras.append((lora_name, model_strength, clip_strength))
        
        if not loras:
            return optional_pipe, None
        
        if loras and not optional_pipe:
            return optional_pipe, loras
        
        # Load Loras
        model = model_override or optional_pipe.get("model")
        clip = clip_override or optional_pipe.get("clip")

        if not model or not clip:
            return optional_pipe, loras
        
        for lora in loras:
            model, clip = loader.load_lora(lora[0], model, clip, lora[1], lora[2])

        new_pipe = {
            "model": model,
            "positive": optional_pipe["positive"],
            "negative": optional_pipe["negative"],
            "vae": optional_pipe["vae"],
            "clip": clip,

            "samples": optional_pipe["samples"],
            "images": optional_pipe["images"],
            "seed": optional_pipe["seed"],

            "loader_settings": optional_pipe["loader_settings"],
        }

        del optional_pipe

        return new_pipe, loras

```
