# Checkpoint Loader 🐍
## Documentation
- Class name: CheckpointLoader|pysssss
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

此节点是CheckpointLoaderSimple的一个专门版本，增强了对图像的处理能力以及检查点名称的处理。它有助于加载模型检查点，重点是图像相关配置，使其适用于视觉内容为主要关注点的场景。

## Input types
### Required
- ckpt_name
    - 指定要加载的检查点名称。此参数至关重要，因为它决定节点将尝试加载哪个特定检查点，从而影响模型的配置及其后续性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Output types
- model
    - Comfy dtype: MODEL
    - 加载的模型对象，这是检查点加载过程的主要输出。它代表模型的整体，准备进一步使用或分析。
    - Python dtype: torch.nn.Module
- clip
    - Comfy dtype: CLIP
    - 与加载的检查点相关的CLIP模型（如果适用）。这对于涉及文本和图像理解或生成的任务相关。
    - Python dtype: torch.nn.Module
- vae
    - Comfy dtype: VAE
    - 从检查点加载的VAE（变分自编码器）组件。这对于涉及图像生成或操作的任务至关重要。
    - Python dtype: torch.nn.Module

## Usage tips
- Infra type: CPU
<!-- - Common nodes:
    - [LoraLoader|pysssss](../../ComfyUI-Custom-Scripts/Nodes/LoraLoader|pysssss.md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [VAEEncodeForInpaint](../../Comfy/Nodes/VAEEncodeForInpaint.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [Anything Everywhere3](../../cg-use-everywhere/Nodes/Anything Everywhere3.md)
    - [ImpactWildcardEncode](../../ComfyUI-Impact-Pack/Nodes/ImpactWildcardEncode.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - Reroute
    - Junction -->

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