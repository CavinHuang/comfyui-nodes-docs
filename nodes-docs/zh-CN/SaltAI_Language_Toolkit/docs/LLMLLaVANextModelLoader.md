
# Documentation
- Class name: LLMLLaVANextModelLoader
- Category: SALT/Language Toolkit/Loaders
- Output node: False

此节点旨在加载并初始化LLAVA Next V1模型，可选择开启量化和闪存注意力功能以优化性能。

# Input types
## Required
- model
    - 指定要加载的LLAVA Next V1模型的标识符。这为选择不同的模型版本或配置提供了灵活性。
    - Comfy dtype: STRING
    - Python dtype: str
- device
    - 确定模型将在哪种计算设备（'cuda'或'cpu'）上加载，从而启用特定硬件的优化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- use_bitsandbytes_quantize
    - 启用或禁用使用bitsandbytes库对模型进行量化，可能会以轻微的精度损失为代价提高性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- lnv1_model
    - 返回已加载的LLAVA Next V1模型，可用于评估或进一步处理。
    - Comfy dtype: LLAVA_NEXT_V1_MODEL
    - Python dtype: LlavaNextV1


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMLLaVANextModelLoader:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": ("STRING", {"default": "llava-hf/llava-v1.6-mistral-7b-hf"}),
                "device": (["cuda", "cpu"],),
                "use_bitsandbytes_quantize": ("BOOLEAN", {"default": True}),
                #"use_flash_attention": ("BOOLEAN", {"default": False}),
            }
        }
    
    RETURN_TYPES = ("LLAVA_NEXT_V1_MODEL",)
    RETURN_NAMES = ("lnv1_model",)

    FUNCTION = "load"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Loaders"

    def load(self, model: str, device: str = "cuda", use_bitsandbytes_quantize: bool = True, use_flash_attention: bool = False):
        evaluator = LlavaNextV1(
            model_name="llava-hf/llava-v1.6-mistral-7b-hf", 
            quantize=use_bitsandbytes_quantize, 
            use_flash_attention=use_flash_attention
        )
        return (evaluator, )

```
