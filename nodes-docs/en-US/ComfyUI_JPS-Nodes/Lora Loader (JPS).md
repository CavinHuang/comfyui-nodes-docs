---
tags:
- LoRA
---

# Lora Loader (JPS)
## Documentation
- Class name: `Lora Loader (JPS)`
- Category: `JPS Nodes/IO`
- Output node: `False`

The Lora Loader (JPS) node is designed to dynamically load and apply LoRA (Low-Rank Adaptation) adjustments to models and/or CLIP components based on specified parameters. It facilitates the customization of model behavior and performance without altering the original model architecture, enabling fine-tuned control over model outputs.
## Input types
### Required
- **`model`**
    - The model parameter represents the base model to which the LoRA adjustments will be applied. It is crucial for defining the starting point of the adaptation process.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The clip parameter signifies the CLIP model component that may also undergo LoRA adjustments, allowing for enhanced or modified functionality in tasks involving text and image processing.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`switch`**
    - This parameter controls whether LoRA adjustments are applied or not, offering a straightforward mechanism to enable or disable the adaptation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_name`**
    - Specifies the name of the LoRA file to be loaded and applied, serving as a key identifier for retrieving the appropriate adaptation parameters.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - Determines the intensity of the LoRA adjustments applied to the model, enabling precise control over the adaptation's impact.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - Sets the intensity of the LoRA adjustments for the CLIP component, allowing for tailored modifications to its behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified model with LoRA adjustments applied, reflecting changes in behavior or performance as specified by the input parameters.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP component with LoRA adjustments applied, if applicable, showcasing the adaptability of the node to various model components.
    - Python dtype: `torch.nn.Module`
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
