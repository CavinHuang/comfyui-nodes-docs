---
tags:
- LoRA
---

# pipeLoraStack
## Documentation
- Class name: `ttN pipeLoraStack`
- Category: `ttN/pipe`
- Output node: `False`

The `ttN pipeLoraStack` node is designed to dynamically enhance and modify the capabilities of models and clips by stacking LoRA adjustments based on specified configurations. It allows for the customization of model and clip behavior through the application of learned affine transformations, enabling users to fine-tune their generative processes with precision.
## Input types
### Required
- **`toggle`**
    - Determines whether the LoRA stack should be applied or not, acting as a switch to enable or disable the stacking process.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`mode`**
    - Specifies the mode of operation for LoRA adjustments, distinguishing between simple and advanced configurations for applying model and clip strength modifications.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`num_loras`**
    - Indicates the number of LoRA adjustments to be applied, allowing for multiple layers of modifications to be stacked.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`optional_pipe`**
    - An optional pipeline configuration that can be enhanced with LoRA adjustments if provided; otherwise, a new configuration is generated.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `dict or None`
- **`model_override`**
    - Allows for the overriding of the model component within the optional pipeline, facilitating custom model adjustments.
    - Comfy dtype: `MODEL`
    - Python dtype: `object or None`
- **`clip_override`**
    - Allows for the overriding of the clip component within the optional pipeline, facilitating custom clip adjustments.
    - Comfy dtype: `CLIP`
    - Python dtype: `object or None`
- **`optional_lora_stack`**
    - A pre-defined list of LoRA adjustments that can be optionally included for stacking, offering a way to import existing configurations or add to them.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `list of tuples or None`
- **`lora_i_name`**
    - Specifies the name of the i-th LoRA adjustment to be applied, enabling the identification and application of specific LoRA transformations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_i_strength`**
    - Defines the strength of the i-th LoRA adjustment for both model and clip in simple mode, allowing for uniform modification intensity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_i_model_strength`**
    - Specifies the strength of the i-th LoRA adjustment applied to the model in advanced mode, enabling differentiated intensity for model transformations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_i_clip_strength`**
    - Specifies the strength of the i-th LoRA adjustment applied to the clip in advanced mode, enabling differentiated intensity for clip transformations.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`optional_pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns the enhanced or newly created pipeline configuration after applying the LoRA stack.
    - Python dtype: `dict`
- **`lora_stack`**
    - Comfy dtype: `LORA_STACK`
    - Provides the list of LoRA adjustments that were applied, detailing the modifications made to the model and clip.
    - Python dtype: `list of tuples or None`
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
