---
tags:
- BackgroundRemoval
- Image
---

# 🔧 RemBG Session
## Documentation
- Class name: `RemBGSession+`
- Category: `essentials`
- Output node: `False`

The RemBGSession+ node is designed to create a new session for background removal tasks, supporting a variety of models and execution providers. It abstracts the complexity of initializing a session with specific models and providers, facilitating the removal of backgrounds from images with flexibility and efficiency.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for background removal, offering a selection from general-purpose to specialized models for human segmentation and cloth parsing, among others. This choice directly influences the accuracy and performance of the background removal process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`providers`**
    - Determines the execution provider for the background removal task, allowing for selection among various hardware acceleration options like CPU, CUDA, and more. This choice affects the performance and compatibility of the background removal operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`rembg_session`**
    - Comfy dtype: `REMBG_SESSION`
    - Represents a session initialized for background removal tasks, ready to be used with images for removing backgrounds.
    - Python dtype: `rembg.Session`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RemBGSession:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": (["u2net: general purpose", "u2netp: lightweight general purpose", "u2net_human_seg: human segmentation", "u2net_cloth_seg: cloths Parsing", "silueta: very small u2net", "isnet-general-use: general purpose", "isnet-anime: anime illustrations", "sam: general purpose"],),
                "providers": (['CPU', 'CUDA', 'ROCM', 'DirectML', 'OpenVINO', 'CoreML', 'Tensorrt', 'Azure'],),
            },
        }

    RETURN_TYPES = ("REMBG_SESSION",)
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, model, providers):
        from rembg import new_session as rembg_new_session

        model = model.split(":")[0]
        return (rembg_new_session(model, providers=[providers+"ExecutionProvider"]),)

```
