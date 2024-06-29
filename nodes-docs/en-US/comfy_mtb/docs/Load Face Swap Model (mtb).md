---
tags:
- Face
---

# Load Face Swap Model (mtb)
## Documentation
- Class name: `Load Face Swap Model (mtb)`
- Category: `mtb/facetools`
- Output node: `False`

This node is responsible for loading a faceswap model from a specified path, ensuring the model is available for face swapping operations. It dynamically lists available models based on the files present in a designated directory, offering flexibility in model selection.
## Input types
### Required
- **`faceswap_model`**
    - Specifies the name of the faceswap model to load. The selection is dynamically generated based on the available model files in the insightface directory, allowing for a flexible and up-to-date choice of models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`faceswap_model`**
    - Comfy dtype: `FACESWAP_MODEL`
    - Returns an instance of the faceswap model, ready for use in face swapping operations. This enables the application of the model to input images for generating swapped face images.
    - Python dtype: `INSwapper`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_LoadFaceSwapModel:
    """Loads a faceswap model"""

    @staticmethod
    def get_models() -> list[Path]:
        models_path = get_model_path("insightface")
        if models_path.exists():
            models = models_path.iterdir()
            return [x for x in models if x.suffix in [".onnx", ".pth"]]
        return []

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "faceswap_model": (
                    [x.name for x in cls.get_models()],
                    {"default": "None"},
                ),
            },
        }

    RETURN_TYPES = ("FACESWAP_MODEL",)
    FUNCTION = "load_model"
    CATEGORY = "mtb/facetools"

    def load_model(self, faceswap_model: str):
        model_path = get_model_path("insightface", faceswap_model)
        if not model_path or not model_path.exists():
            raise ModelNotFound(f"{faceswap_model} ({model_path})")

        log.info(f"Loading model {model_path}")
        return (
            INSwapper(
                model_path,
                onnxruntime.InferenceSession(
                    path_or_bytes=model_path,
                    providers=onnxruntime.get_available_providers(),
                ),
            ),
        )

```
