---
tags:
- AnimationScheduling
- FrameInterpolation
- VisualEffects
---

# Load Film Model (mtb)
## Documentation
- Class name: `Load Film Model (mtb)`
- Category: `mtb/frame iterpolation`
- Output node: `False`

The MTB_LoadFilmModel node is designed to load FILM models for frame interpolation tasks, supporting a variety of model formats and ensuring the model is correctly loaded for further processing.
## Input types
### Required
- **`film_model`**
    - Specifies the FILM model to be loaded, affecting which specific model file is accessed and utilized in frame interpolation tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`film_model`**
    - Comfy dtype: `FILM_MODEL`
    - Returns an instance of the loaded FILM model, ready for frame interpolation operations.
    - Python dtype: `Tuple[interpolator.Interpolator]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_LoadFilmModel:
    """Loads a FILM model"""

    @staticmethod
    def get_models() -> List[Path]:
        models_paths = get_model_path("FILM").iterdir()

        return [x for x in models_paths if x.suffix in [".onnx", ".pth"]]

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "film_model": (
                    ["L1", "Style", "VGG"],
                    {"default": "Style"},
                ),
            },
        }

    RETURN_TYPES = ("FILM_MODEL",)
    FUNCTION = "load_model"
    CATEGORY = "mtb/frame iterpolation"

    def load_model(self, film_model: str):
        model_path = get_model_path("FILM", film_model)
        if not model_path or not model_path.exists():
            raise ModelNotFound(f"FILM ({model_path})")

        if not (model_path / "saved_model.pb").exists():
            model_path = model_path / "saved_model"

        if not model_path.exists():
            log.error(f"Model {model_path} does not exist")
            raise ValueError(f"Model {model_path} does not exist")

        log.info(f"Loading model {model_path}")

        return (interpolator.Interpolator(model_path.as_posix(), None),)

```
