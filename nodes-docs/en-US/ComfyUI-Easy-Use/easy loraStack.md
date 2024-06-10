---
tags:
- LoRA
---

# EasyLoraStack
## Documentation
- Class name: `easy loraStack`
- Category: `EasyUse/Loaders`
- Output node: `False`

The `loraStackLoader` node is designed to dynamically load and manage LoRA (Low-Rank Adaptation) models for enhancing or modifying the behavior of neural networks. It allows for the flexible integration of multiple LoRA models, adjusting their strengths and applying them to specific components of a network, thereby enabling customized and efficient model adaptation.
## Input types
### Required
- **`toggle`**
    - Determines whether the LoRA stack loading functionality is enabled or disabled, affecting whether any LoRA models are loaded and applied.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`mode`**
    - Specifies the operational mode of the node, which can influence how LoRA models are selected and utilized within the system.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`num_loras`**
    - Defines the number of LoRA models to be loaded and managed by the node, allowing for the customization of the model adaptation process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`optional_lora_stack`**
    - An optional parameter that allows for the inclusion of an existing stack of LoRA models to be considered in the loading process.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `List[Dict[str, Any]]`
- **`lora_i_name`**
    - Specifies the name of the i-th LoRA model to be loaded, enabling the selection of specific models for application.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_i_strength`**
    - Defines the overall strength of the i-th LoRA model to be applied, affecting the intensity of its impact on the neural network.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_i_model_strength`**
    - Specifies the strength of the i-th LoRA model's effect on the model component of the neural network.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_i_clip_strength`**
    - Specifies the strength of the i-th LoRA model's effect on the CLIP component of the neural network.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`lora_stack`**
    - Comfy dtype: `LORA_STACK`
    - Outputs a collection of LoRA models that have been loaded and configured based on the input parameters, ready for integration into the target neural network.
    - Python dtype: `List[Dict[str, Any]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class loraStackLoader:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        max_lora_num = 10
        inputs = {
            "required": {
                "toggle": ([True, False],),
                "mode": (["simple", "advanced"],),
                "num_loras": ("INT", {"default": 1, "min": 0, "max": max_lora_num}),
            },
            "optional": {
                "optional_lora_stack": ("LORA_STACK",),
            },
        }

        for i in range(1, max_lora_num+1):
            inputs["optional"][f"lora_{i}_name"] = (
            ["None"] + folder_paths.get_filename_list("loras"), {"default": "None"})
            inputs["optional"][f"lora_{i}_strength"] = (
            "FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})
            inputs["optional"][f"lora_{i}_model_strength"] = (
            "FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})
            inputs["optional"][f"lora_{i}_clip_strength"] = (
            "FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01})

        return inputs

    RETURN_TYPES = ("LORA_STACK",)
    RETURN_NAMES = ("lora_stack",)
    FUNCTION = "stack"

    CATEGORY = "EasyUse/Loaders"

    def stack(self, toggle, mode, num_loras, lora_stack=None, **kwargs):
        if (toggle in [False, None, "False"]) or not kwargs:
            return (None,)

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
        return (loras,)

```
