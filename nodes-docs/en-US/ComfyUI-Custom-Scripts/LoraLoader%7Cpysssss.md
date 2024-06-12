---
tags:
- LoRA
---

# Lora Loader 🐍
## Documentation
- Class name: `LoraLoader|pysssss`
- Category: `loaders`
- Output node: `False`

This node specializes in loading and applying LoRA (Low-Rank Adaptation) adjustments to models and clips, enhancing their capabilities or altering their behavior based on specified LoRA configurations. It extends the functionality of a base loader to also handle image-specific LoRA configurations, making it versatile for various multimedia applications.
## Input types
### Required
- **`model`**
    - The model to which the LoRA adjustments will be applied. It's crucial for defining the base architecture that will be enhanced or modified through LoRA.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - The CLIP model to which the LoRA adjustments will be applied, allowing for enhanced or altered multimodal understanding and representation.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`lora_name`**
    - Specifies the name of the LoRA configuration to be applied, determining the specific adjustments and enhancements to the model and clip.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength_model`**
    - Defines the intensity of the LoRA adjustments applied to the model, allowing for fine-tuned control over the modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`strength_clip`**
    - Defines the intensity of the LoRA adjustments applied to the CLIP model, enabling precise control over the enhancements.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model with applied LoRA adjustments, reflecting enhanced or altered capabilities.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model with applied LoRA adjustments, showcasing enhanced or altered multimodal understanding and representation.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [LoraLoader|pysssss](../../ComfyUI-Custom-Scripts/Nodes/LoraLoader|pysssss.md)
    - [ModelSamplingDiscrete](../../Comfy/Nodes/ModelSamplingDiscrete.md)
    - Reroute
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - IPAdapterApply
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)



## Source code
```python
class LoraLoaderWithImages(LoraLoader):
    @classmethod
    def INPUT_TYPES(s):
        types = super().INPUT_TYPES()
        names = types["required"]["lora_name"][0]
        populate_items(names, "loras")
        return types

    def load_lora(self, **kwargs):
        kwargs["lora_name"] = kwargs["lora_name"]["content"]
        return super().load_lora(**kwargs)

```
