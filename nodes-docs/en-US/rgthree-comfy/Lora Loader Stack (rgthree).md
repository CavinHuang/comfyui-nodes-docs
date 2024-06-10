---
tags:
- LoRA
---

# Lora Loader Stack (rgthree)
## Documentation
- Class name: `Lora Loader Stack (rgthree)`
- Category: `rgthree`
- Output node: `False`

The Lora Loader Stack (rgthree) node is designed to dynamically load multiple LoRA (Low-Rank Adaptation) modifications into a given model and clip, enhancing or altering their capabilities based on specified LoRA files and their associated strengths. It allows for the sequential application of up to four LoRA modifications, providing a flexible mechanism for model customization.
## Input types
### Required
- **`model`**
    - The model parameter represents the neural network model to which LoRA modifications will be applied. It is crucial for defining the base architecture that will be enhanced or altered by the LoRA layers.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The clip parameter signifies the CLIP model that will be adjusted using LoRA modifications. It plays a key role in specifying the target for LoRA enhancements alongside the primary model.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`lora_i`**
    - Specifies a LoRA file to be applied to the model and clip. The choice of LoRA file directly influences the nature of the modification, allowing for targeted adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_i`**
    - Determines the intensity of the LoRA modification's impact on the model and clip, enabling fine-tuned control over the adaptation's effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The modified neural network model, now enhanced with up to four LoRA modifications as specified.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The adjusted CLIP model, reflecting the cumulative effects of the applied LoRA modifications.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [Text to Conditioning](../../was-node-suite-comfyui/Nodes/Text to Conditioning.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - Reroute
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [BNK_CLIPTextEncodeAdvanced](../../ComfyUI_ADV_CLIP_emb/Nodes/BNK_CLIPTextEncodeAdvanced.md)
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [CLIPSetLastLayer](../../Comfy/Nodes/CLIPSetLastLayer.md)
    - [ADE_AnimateDiffLoaderWithContext](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_AnimateDiffLoaderWithContext.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)



## Source code
```python
class RgthreeLoraLoaderStack:

    NAME = get_name('Lora Loader Stack')
    CATEGORY = get_category()

    @classmethod
    def INPUT_TYPES(cls):  # pylint: disable = invalid-name, missing-function-docstring
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP", ),

                "lora_01": (['None'] + folder_paths.get_filename_list("loras"), ),
                "strength_01":("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                "lora_02": (['None'] + folder_paths.get_filename_list("loras"), ),
                "strength_02":("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                "lora_03": (['None'] + folder_paths.get_filename_list("loras"), ),
                "strength_03":("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),

                "lora_04": (['None'] + folder_paths.get_filename_list("loras"), ),
                "strength_04":("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("MODEL", "CLIP")
    FUNCTION = "load_lora"

    def load_lora(self, model, clip, lora_01, strength_01, lora_02, strength_02, lora_03, strength_03, lora_04, strength_04):
        if lora_01 != "None" and strength_01 != 0:
            model, clip = LoraLoader().load_lora(model, clip, lora_01, strength_01, strength_01)
        if lora_02 != "None" and strength_02 != 0:
            model, clip = LoraLoader().load_lora(model, clip, lora_02, strength_02, strength_02)
        if lora_03 != "None" and strength_03 != 0:
            model, clip = LoraLoader().load_lora(model, clip, lora_03, strength_03, strength_03)
        if lora_04 != "None" and strength_04 != 0:
            model, clip = LoraLoader().load_lora(model, clip, lora_04, strength_04, strength_04)

        return (model, clip)

```
