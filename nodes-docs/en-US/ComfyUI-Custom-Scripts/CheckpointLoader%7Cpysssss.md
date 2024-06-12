---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Checkpoint Loader 🐍
## Documentation
- Class name: `CheckpointLoader|pysssss`
- Category: `loaders`
- Output node: `False`

This node is a specialized version of the CheckpointLoaderSimple, enhanced to handle images alongside checkpoint names. It facilitates the loading of model checkpoints with an emphasis on image-related configurations, making it suitable for scenarios where visual content is a primary concern.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the name of the checkpoint to be loaded. This parameter is crucial as it determines which specific checkpoint the node will attempt to load, impacting the model's configuration and its subsequent performance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The loaded model object, which is the primary output of the checkpoint loading process. It represents the model in its entirety, ready for further use or analysis.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model associated with the loaded checkpoint, if applicable. This is relevant for tasks involving text and image understanding or generation.
    - Python dtype: `torch.nn.Module`
- **`vae`**
    - Comfy dtype: `VAE`
    - The VAE (Variational Autoencoder) component loaded from the checkpoint. This is crucial for tasks involving image generation or manipulation.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [LoraLoader|pysssss](../../ComfyUI-Custom-Scripts/Nodes/LoraLoader|pysssss.md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [Anything Everywhere3](../../cg-use-everywhere/Nodes/Anything Everywhere3.md)
    - [ImpactWildcardEncode](../../ComfyUI-Impact-Pack/Nodes/ImpactWildcardEncode.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - Reroute
    - Junction



## Source code
```python
class CheckpointLoaderSimpleWithImages(CheckpointLoaderSimple):
    @classmethod
    def INPUT_TYPES(s):
        types = super().INPUT_TYPES()
        names = types["required"]["ckpt_name"][0]
        populate_items(names, "checkpoints")
        return types

    def load_checkpoint(self, **kwargs):
        kwargs["ckpt_name"] = kwargs["ckpt_name"]["content"]
        return super().load_checkpoint(**kwargs)

```
