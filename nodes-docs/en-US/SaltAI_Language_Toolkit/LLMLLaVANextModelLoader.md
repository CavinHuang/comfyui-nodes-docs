---
tags:
- LoRA
---

# ∞ LLaVA-Next v1 Model Loader
## Documentation
- Class name: `LLMLLaVANextModelLoader`
- Category: `SALT/Language Toolkit/Loaders`
- Output node: `False`

This node is designed to load and initialize the LLAVA Next V1 model with optional quantization and flash attention features for optimized performance.
## Input types
### Required
- **`model`**
    - Specifies the model identifier for the LLAVA Next V1 model to be loaded. This allows for flexibility in choosing different model versions or configurations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`device`**
    - Determines the computing device ('cuda' or 'cpu') on which the model will be loaded, enabling hardware-specific optimizations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`use_bitsandbytes_quantize`**
    - Enables or disables quantization using the bitsandbytes library for the model, potentially improving performance with a slight trade-off in accuracy.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`lnv1_model`**
    - Comfy dtype: `LLAVA_NEXT_V1_MODEL`
    - Returns the loaded LLAVA Next V1 model, ready for evaluation or further processing.
    - Python dtype: `LlavaNextV1`
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
