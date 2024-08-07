
# Documentation
- Class name: Load Film Model (mtb)
- Category: mtb/frame iterpolation
- Output node: False

MTB_LoadFilmModel节点旨在加载用于帧插值任务的FILM模型。它支持多种模型格式，并确保模型被正确加载以供进一步处理。

# Input types
## Required
- film_model
    - 指定要加载的FILM模型，影响具体哪个模型文件被访问和用于帧插值任务。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- film_model
    - 返回加载好的FILM模型实例，可直接用于帧插值操作。
    - Comfy dtype: FILM_MODEL
    - Python dtype: Tuple[interpolator.Interpolator]


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
