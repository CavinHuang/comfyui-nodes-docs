---
tags:
- IPAdapter
- IPAdapterLoader
---

# IPAdapter Unified Loader FaceID
## Documentation
- Class name: `IPAdapterUnifiedLoaderFaceID`
- Category: `ipadapter/faceid`
- Output node: `False`

This node is designed to unify the loading process for FaceID models, accommodating various presets and configurations to ensure compatibility and optimal performance across different model types and computational environments.
## Input types
### Required
- **`model`**
    - Specifies the model to be loaded, serving as a key identifier for selecting the appropriate FaceID model configuration.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`preset`**
    - Defines the specific FaceID preset to be used, allowing for customization and optimization based on the model's intended use case.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`lora_strength`**
    - Adjusts the strength of the LoRA (Low-Rank Adaptation) adjustments, providing fine-tuning capabilities for the model's performance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`provider`**
    - Determines the computational backend for model execution, supporting a range of environments from CPU to various GPU architectures.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
### Optional
- **`ipadapter`**
    - Optionally specifies an IPAdapter model to be used in conjunction with the FaceID model, enhancing its capabilities.
    - Comfy dtype: `IPADAPTER`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The loaded model, ready for use with the specified configurations and enhancements.
    - Python dtype: `torch.nn.Module`
- **`ipadapter`**
    - Comfy dtype: `IPADAPTER`
    - The optionally specified IPAdapter model, loaded and configured for use.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterUnifiedLoaderFaceID(IPAdapterUnifiedLoader):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model": ("MODEL", ),
            "preset": (['FACEID', 'FACEID PLUS - SD1.5 only', 'FACEID PLUS V2', 'FACEID PORTRAIT (style transfer)', 'FACEID PORTRAIT UNNORM - SDXL only (strong)'], ),
            "lora_strength": ("FLOAT", { "default": 0.6, "min": 0, "max": 1, "step": 0.01 }),
            "provider": (["CPU", "CUDA", "ROCM", "DirectML", "OpenVINO", "CoreML"], ),
        },
        "optional": {
            "ipadapter": ("IPADAPTER", ),
        }}

    RETURN_NAMES = ("MODEL", "ipadapter", )
    CATEGORY = "ipadapter/faceid"

```
