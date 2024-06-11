# Lora Loader 🐍
## Documentation
- Class name: LoraLoader|pysssss
- Category: loaders
- Output node: False
- Repo Ref: https://github.com/pythongosssss/ComfyUI-Custom-Scripts

此节点专门用于加载和应用LoRA（低秩适应）调整到模型和CLIP，增强其功能或根据指定的LoRA配置改变其行为。它扩展了基础加载器的功能，还处理图像特定的LoRA配置，使其在各种多媒体应用中具有多功能性。

## Input types
### Required
- model
    - 将应用LoRA调整的模型。它对于定义将通过LoRA增强或修改的基础架构至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 将应用LoRA调整的CLIP模型，允许增强或改变多模态理解和表示。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- lora_name
    - 指定要应用的LoRA配置的名称，决定模型和CLIP的具体调整和增强。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- strength_model
    - 定义应用于模型的LoRA调整的强度，允许对修改进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- strength_clip
    - 定义应用于CLIP模型的LoRA调整的强度，能够精确控制增强。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- model
    - Comfy dtype: MODEL
    - 应用LoRA调整的模型，反映增强或改变的功能。
    - Python dtype: torch.nn.Module
- clip
    - Comfy dtype: CLIP
    - 应用LoRA调整的CLIP模型，展示增强或改变的多模态理解和表示。
    - Python dtype: torch.nn.Module

## Usage tips
- Infra type: GPU
<!-- - Common nodes:
    - [LoraLoader|pysssss](../../ComfyUI-Custom-Scripts/Nodes/LoraLoader|pysssss.md)
    - [ModelSamplingDiscrete](../../Comfy/Nodes/ModelSamplingDiscrete.md)
    - Reroute
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - IPAdapterApply
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md) -->

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